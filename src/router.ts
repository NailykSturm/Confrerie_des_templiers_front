export default [
    { path: "/:pathMatch(.*)*", redirect: "/graph" },
    { path: "/404", component: () => import("./pages/NotFound.vue") },
    // { path: "", component: () => import("./pages/Home.vue") },
    // { path: "/about", component: () => import("./pages/About.vue") },
    { path: "/graph", component: () => import("./pages/Graph.vue") },
];
