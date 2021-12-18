import { createApp } from "vue";
import App from "./App.vue";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import Router from "./router/index";
// 全局 axios 工具类 fetchData
import fetchData from "./axios/FetchData";

var app = createApp(App);
app.config.globalProperties.fetchData = fetchData;
app.use(Quasar, quasarUserOptions).use(Router).mount("#app");
