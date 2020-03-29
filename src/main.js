import DefaultLayout from "~/layouts/Default.vue";
import settings from "../data/theme.json";

import "@/assets/code-highlight.css"
import "@/assets/fonts/stylesheet.css"
import "vue-scrollama/dist/vue-scrollama.css"

import VueLazyload from "vue-lazyload";


export default function(Vue, { head }) {
  Vue.component("Layout", DefaultLayout)

  // settings
  Vue.prototype.$settings = settings

  // imagenes
  Vue.use(VueLazyload)
  Vue.prototype.getImageUrl = (path, cloudinaryParams = "c_scale,w_auto:800") => {
    return `${settings.cloudinary_url}/${cloudinaryParams}/${path}`
  }

  // Vue-scrollama issue (https://github.com/vgshenoy/vue-scrollama/issues/9)
  if (process.isServer) {
    global.window = {}
    global.document = {}
  }

  head.bodyAttrs = {
    class: settings.dark_mode ? "dark" : ""
  };
}
