import { createApp } from "vue";
import * as VueRouter from "vue-router";

import "./assets/css/index.css";
import App from "./App.vue";
import routes from "./router.ts";

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);
app.mount("#app");
