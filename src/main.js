import DefaultLayout from "~/layouts/Default.vue";
import settings from "../data/theme.json";

import "@/assets/code-highlight.css"
import "@/assets/fonts/stylesheet.css"

export default function(Vue, { head }) {
  Vue.prototype.$settings = settings
  Vue.component("Layout", DefaultLayout);
  head.bodyAttrs = {
    class: settings.dark_mode ? "dark" : ""
  };
}
