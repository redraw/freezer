import DefaultLayout from "~/layouts/Default.vue";
import settings from "../data/theme.json";

import "@/assets/code-highlight.css"
import "@/assets/fonts/stylesheet.css"
import "vue-scrollama/dist/vue-scrollama.css"

export default function(Vue, { head }) {
  Vue.prototype.$settings = settings

  // Vue-scrollama issue (https://github.com/vgshenoy/vue-scrollama/issues/9)
  if (process.isServer) {
    global.window = {}
    global.document = {}
  }

  Vue.component("Layout", DefaultLayout);
  head.bodyAttrs = {
    class: settings.dark_mode ? "dark" : ""
  };
}
