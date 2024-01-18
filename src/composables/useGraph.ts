import { Ref, ref } from "vue";
import { ECBasicOption } from "echarts/types/dist/shared";
import * as echarts from "echarts/core";
import { TitleComponent, TooltipComponent, LegendComponent } from "echarts/components";
import { GraphChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

import graphApiExemple from "../assets/example/example_api.json";
import { Graph, NodeType } from "../types/Graph";
import { Node } from "../types/Node";
import { Edge } from "../types/Edge";

interface node {
    id: number;
    name: string;
    symbolSize: number;
    label?: {
        show: boolean;
    };
    x: number;
    y: number;
    value: number;
    categorie: number;
}
interface link {
    source: number;
    target: number;
}
interface category {
    name: string;
}

const graph = ref(Graph.instance);
const firstLoad = ref(true);
const graphSource = ref(graphApiExemple);
const graphDisplay: Ref<echarts.ECharts | null> = ref(null);
const option: Ref<ECBasicOption | null> = ref(null);
const dataToDisplay: Ref<Node | Edge | undefined> = ref(undefined);

const charOpts: Ref<{ nodes: node[]; links: link[]; categories: category[] }> = ref({
    nodes: [],
    links: [],
    categories: [],
});

export default function useGraph() {
    echarts.use([TitleComponent, TooltipComponent, LegendComponent, GraphChart, CanvasRenderer]);

    graph.value.parseFromSource(graphSource.value);

    function getGraphData() {
        const nodes: node[] = [];
        const links: link[] = [];
        const categories: category[] = [];

        graph.value.nodes.forEach((node) => {
            if (!categories.find((cat) => cat.name === NodeType[node.type]))
                categories.push({
                    name: NodeType[node.type],
                });
        });

        graph.value.nodes.forEach((node) => {
            nodes.push({
                id: node.id,
                name: node.name,
                symbolSize: 50,
                x: 0,
                y: 0,
                value: node.edges.length,
                categorie: categories.findIndex((cat) => cat.name === NodeType[node.type]),
            });
        });

        graph.value.edges.forEach((edge) => {
            links.push({
                source: edge.node1.id,
                target: edge.node2.id,
            });
        });
        console.log({ nodes, links, categories });
        return { nodes, links, categories };
    }

    function refreshGraph() {
        graphDisplay.value!.showLoading();

        charOpts.value = getGraphData();

        charOpts.value.nodes.forEach((node) => {
            node.label = {
                show: node.symbolSize > 30,
            };
        });

        option.value = {
            title: {
                text: "Assassin's Creed",
                // subtext: "Default layout",
                top: "top",
                left: "left",
            },
            tooltip: {},
            legend: [
                {
                    // selectedMode: 'single',
                    data: charOpts.value.categories.map((a) => {
                        return a.name;
                    }),
                },
            ],
            animationDuration: 1500,
            animationEasingUpdate: "quinticInOut",
            series: [
                {
                    name: "Assassin's Creed",
                    type: "graph",
                    layout: "force",
                    data: charOpts.value.nodes,
                    links: charOpts.value.links,
                    categories: charOpts.value.categories,
                    roam: true,
                    label: {
                        position: "right",
                        formatter: "{b}",
                    },
                    lineStyle: {
                        color: "source",
                        curveness: 0.1,
                    },
                    // edgeSymbol: ["circle", "arrow"],
                    // edgeSymbolSize: [4, 10],
                    // edgeLabel: {
                    //     fontSize: 20,
                    // },
                    emphasis: {
                        focus: "adjacency",
                        lineStyle: {
                            width: 10,
                        },
                    },
                    force: {
                        repulsion: 50,
                    },
                    draggable: true,
                },
            ],
        };
        graphDisplay.value!.setOption(option.value);
        graphDisplay.value!.hideLoading();
    }

    function initGraph(chartDom: Ref<HTMLElement | null>, drawer_toggle: Ref<HTMLInputElement | null>) {
        if (firstLoad.value) {
            graphDisplay.value = echarts.init(chartDom.value);
            option.value && graphDisplay.value!.setOption(option.value);
            graphDisplay.value!.on("click", (event) => {
                console.log(event);
                if (event.dataType === "node") {
                    dataToDisplay.value = graph.value.getNodeById(event.data.id);
                    if (dataToDisplay.value) drawer_toggle.value!.checked = true;
                }
            });
            firstLoad.value = false;
        }
    }

    function parseGraph() {
        /** // TODO : parse graph
         * Create nodes and edges from the graph
         */
    }

    return {
        graph,
        graphDisplay,
        dataToDisplay,
        parseGraph,
        refreshGraph,
        initGraph,
    };
}
