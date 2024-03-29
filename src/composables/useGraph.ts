import { Ref, ShallowRef, ref, shallowRef } from "vue";
import { ECBasicOption } from "echarts/types/dist/shared";
import * as echarts from "echarts/core";
import { TitleComponent, TooltipComponent, LegendComponent } from "echarts/components";
import { GraphChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import axios from "axios";

import { Graph, NodeType } from "../types/Graph";
import { Node } from "../types/Node";
import useLoading from "./useLoading";
import { DEFAULT_COMPONENT, DisplayType } from "../types/DisplayType";

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
    category: number;
    metadata?: any;
}
interface link {
    source: number;
    target: number;
    lineStyle?: {
        color?: string;
        curveness?: number;
        width?: number;
    };
    label?: {
        show: boolean;
        formatter: string;
    };
}
interface category {
    name: string;
}

const graph = ref(Graph.instance);
const firstLoad = ref(true);
const graphSource = ref(null);
const graphDisplay: Ref<echarts.ECharts | null> = ref(null);
const option: Ref<ECBasicOption | null> = ref(null);
const dataToDisplay: Ref<DisplayType | undefined> = ref(undefined);
const componentToDisplay: ShallowRef = shallowRef(DEFAULT_COMPONENT);

const charOpts: Ref<{ nodes: node[]; links: link[]; categories: category[] }> = ref({
    nodes: [],
    links: [],
    categories: [],
});

export default function useGraph() {
    echarts.use([TitleComponent, TooltipComponent, LegendComponent, GraphChart, CanvasRenderer]);

    function getGraphData() {
        const nodes: node[] = [];
        const links: link[] = [];
        const categories: category[] = [];

        graph.value.categories.forEach((cat) => {
            categories.push({
                name: cat,
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
                category: categories.findIndex((cat) => cat.name === NodeType[node.type]),
                metadata: {
                    node_attributes: node.getAttributes(),
                },
            });
        });

        graph.value.edges.forEach((edge) => {
            links.push({
                source: nodes.findIndex((node) => node.id === edge.node1.id),
                target: nodes.findIndex((node) => node.id === edge.node2.id),
                lineStyle: {
                    // color: "#854263",
                    curveness: 0.1,
                    width: edge.weight * 5,
                },
                label: {
                    show: false,
                    formatter: edge.label,
                },
            });
        });
        console.log({ nodes, links, categories });
        return { nodes, links, categories };
    }

    function refreshGraph() {
        graphDisplay.value!.showLoading();
        const { setLoading } = useLoading();
        setLoading(true);

        charOpts.value = getGraphData();

        charOpts.value.nodes.forEach((node) => {
            node.label = {
                show: node.symbolSize > 30,
            };
        });

        option.value = {
            title: {
                text: "Assassin's Creed",
                subtext: "Rien est vrai, tout est permis",
                top: "top",
                left: "left",
            },
            tooltip: {
                formatter: (params: any) => {
                    if (params.dataType === "node") return (<Node>params.data).name;
                    else if (params.dataType === "edge") return params.data.label.formatter;
                    return "";
                },
            },
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
                        position: "inside",
                        formatter: "{b}",
                    },
                    lineStyle: {
                        color: "source",
                        curveness: 0.1,
                    },
                    // labelLayout: {
                    //     hideOverlap: true,
                    // },
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
                        repulsion: 10,
                    },
                    draggable: true,
                },
            ],
        };
        graphDisplay.value!.setOption(option.value);
        graphDisplay.value!.hideLoading();
        setLoading(false);
    }

    function initGraph(chartDom: Ref<HTMLElement | null>, drawer_toggle: Ref<HTMLInputElement | null>) {
        if (firstLoad.value) {
            graphDisplay.value = echarts.init(chartDom.value);
            option.value && graphDisplay.value!.setOption(option.value);
            graphDisplay.value!.on("contextmenu", (event) => {
                event.event?.event.preventDefault();
                if (event.dataType === "node") {
                    fetchGraph((<Node>event.data).name.replace(/ /g, "_"));
                }
            });
            graphDisplay.value!.on("click", (event) => {
                // console.log(event);
                if (event.dataType === "node") {
                    dataToDisplay.value = graph.value.getNodeById((<Node>event.data).id);
                    console.log(event.data);
                    if (dataToDisplay.value) {
                        componentToDisplay.value = dataToDisplay.value.displayComponent;
                        drawer_toggle.value!.checked = true;
                    }
                }
            });
            firstLoad.value = false;
        }
    }

    function fetchGraph(request?: string, refresh: boolean = true) {
        axios
            .get(`${import.meta.env.VITE_API_URL}/graph${request ? `/${request}` : ""}`)
            .then((response) => {
                console.log(response.data);
                graphSource.value = response.data;
                graph.value.parseFromSource(graphSource.value);
                if (refresh) refreshGraph();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    fetchGraph(undefined, false);

    return {
        graph,
        graphDisplay,
        dataToDisplay,
        componentToDisplay,
        fetchGraph,
        refreshGraph,
        initGraph,
    };
}
