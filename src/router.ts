export default [
    { path: "/:pathMatch(.*)*", redirect: "/graph" },
    { path: "/graph", component: () => import("./pages/Graph.vue") },
];
