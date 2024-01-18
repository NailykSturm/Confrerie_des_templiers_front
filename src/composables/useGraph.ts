import { Ref, ref } from "vue";
import { ECBasicOption } from "echarts/types/dist/shared";
import * as echarts from "echarts/core";
import { TitleComponent, TooltipComponent, LegendComponent } from "echarts/components";
import { GraphChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

import data from "../assets/example/example_echarts.json";
import graphExemple from "../assets/example/example_graph.json";
import { Graph } from "../types/Graph";

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
const graphSource = ref(graphExemple);
const graphDisplay: Ref<echarts.ECharts | null> = ref(null);
const option: Ref<ECBasicOption | null> = ref(null);

const charOpts: Ref<{ nodes: node[]; links: link[]; categories: category[] }> = ref({
    nodes: [],
    links: [],
    categories: [],
});

export default function useGraph() {
    echarts.use([TitleComponent, TooltipComponent, LegendComponent, GraphChart, CanvasRenderer]);

    graph.value.parseFromSource(graphSource.value);

    function refreshGraph(drawer_toggle: Ref<HTMLInputElement | null>) {
        graphDisplay.value!.showLoading();

        charOpts.value = data;
        graphDisplay.value!.hideLoading();
        charOpts.value.nodes.forEach(function (node) {
            node.label = {
                show: node.symbolSize > 30,
            };
        });
        option.value = {
            title: {
                text: "Les Miserables",
                subtext: "Default layout",
                top: "bottom",
                left: "right",
            },
            tooltip: {},
            legend: [
                {
                    // selectedMode: 'single',
                    data: charOpts.value.categories.map(function (a) {
                        // drawer_toggle.value!.checked = true;
                        return a.name;
                    }),
                },
            ],
            animationDuration: 1500,
            animationEasingUpdate: "quinticInOut",
            series: [
                {
                    name: "Les Miserables",
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
                        curveness: 0.3,
                    },
                    emphasis: {
                        focus: "adjacency",
                        lineStyle: {
                            width: 10,
                        },
                    },
                    force: {
                        repulsion: 500,
                    },
                    draggable: true,
                },
            ],
        };
        graphDisplay.value!.setOption(option.value);

        option && graphDisplay.value!.setOption(option.value);
    }

    function initGraph(chartDom: Ref<HTMLElement | null>) {
        if (firstLoad.value) {
            graphDisplay.value = echarts.init(chartDom.value);
            console.log("set teh graph");
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
        parseGraph,
        refreshGraph,
        initGraph,
    };
}
