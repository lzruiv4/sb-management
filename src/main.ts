import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
/**
 * 使用pinia
 */
import { createPinia } from "pinia";

// createApp(App).use(router).mount("#app");
const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.mount("#app");
