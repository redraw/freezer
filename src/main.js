import DefaultLayout from "~/layouts/Default.vue";
import settings from "../data/config.json";

import "@/assets/code-highlight.css"
import "@/assets/fonts/stylesheet.css"
import "vue-scrollama/dist/vue-scrollama.css"

import VueLazyload from "vue-lazyload"
import VueTippy from "vue-tippy"
import VueMasonry from 'vue-masonry-css'
import LoadScript from 'vue-plugin-load-script';

export default function(Vue, { head }) {
  Vue.component("Layout", DefaultLayout)

  // settings
  Vue.prototype.$settings = settings

  // imagenes
  Vue.use(VueLazyload, {
    preLoad: 1.5,
    observer: true,
  })

  Vue.prototype.getImageUrl = (path, cloudinaryParams = "c_limit,w_1280,h_920") => {
    return `${settings.cloudinary_url}/${cloudinaryParams + ",q_80,f_auto"}${path}`
  }

  Vue.use(VueTippy, {
    flipDuration: 0
  })

  Vue.use(VueMasonry)
  Vue.use(LoadScript);

  // Vue-scrollama issue (https://github.com/vgshenoy/vue-scrollama/issues/9)
  if (process.isServer) {
    global.window = {}
    global.document = {}
  }

  head.bodyAttrs = {
    class: settings.dark_mode ? "dark" : ""
  }

  head.meta.push({
    key: "image",
    property: "og:image",
    content: "https://freezer.com.ar/logo2x.png"
  })
}
