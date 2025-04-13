import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
/**
 * 使用pinia
 */
import { createPinia } from "pinia";
/**
 * Using element ui
 */
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// createApp(App).use(router).mount("#app");
const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");
