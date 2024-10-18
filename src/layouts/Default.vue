<template>
  <div class="layout">
    <div class="banner" v-if="$settings.show_banner">
      <client-only>
        <marquee-text
          :repeat="10"
          :paused="bannerPaused"
          :duration="60"
          @mouseenter="bannerPaused = !bannerPaused"
          @mouseleave="bannerPaused = !bannerPaused"
        >
          <span v-if="!!$settings.banner" v-html="bannerText"></span>
          <span
            v-else-if="$static.cursos.edges.length"
            v-html="bannerCursosText"
          ></span>
        </marquee-text>
      </client-only>
    </div>
    <Header v-if="showHeader" />
    <slot />
    <Footer v-if="showFooter" />
  </div>
</template>

<static-query>
query {
  cursos: allCurso (filter: {finalizado: {eq: false}}, sort: [{by: "date"}]) {
    edges {
      node {
        id
        path
        title
        inicio (format: "YYYY MM")
        finalizado
      }
    }
  }
}
</static-query>

<script>
// https://github.com/EvodiaAut/vue-marquee-text-component/issues/44#issuecomment-993102743
import MarqueeText from "vue-marquee-text-component/src/components/MarqueeText.vue";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

function sep(text = "⚡️", color = "yellow") {
  return `<span style='color: ${color}'>&nbsp;&nbsp;${text}&nbsp;&nbsp;</span>`;
}

export default {
  props: {
    showHeader: {
      default: true,
    },
    showFooter: {
      default: false,
    },
  },

  components: {
    Header,
    Footer,
    MarqueeText,
  },

  data() {
    return {
      bannerPaused: false,
    };
  },

  computed: {
    bannerCursosText() {
      const link = (edge) =>
        `<a href="${edge.node.path}">${edge.node.title}</a>`;
      const banner = [
        "",
        `freezer cursos ${new Date().getFullYear()}`,
        ...this.$static.cursos.edges.map(link),
      ];
      return banner.join(
        sep(
          this.$settings.banner_separator,
          this.$settings.banner_separator_color
        )
      );
    },
    bannerText() {
      if (!!this.$settings.banner) {
        return this.$settings.banner
          .split("\n")
          .join(
            sep(
              this.$settings.banner_separator,
              this.$settings.banner_separator_color
            )
          );
      }
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  height: 100%;
}

body {
  --color-base: rgb(255, 255, 255);
  --color-base-1: rgb(223, 223, 223);
  --color-contrast: rgb(0, 0, 0);
  --color-contrast-1: rgb(43, 43, 43);
  --color-link: #2742c9;
  font-family: "Space Grotesk", -apple-system, system-ui, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  margin: 0;
  padding: 0;
  font-size: 16px;
  background: var(--color-base);
  color: var(--color-contrast);
  transition: background 0.5s ease;
  height: 100%;
}

body.dark {
  --color-base: rgb(0, 0, 0);
  --color-base-1: rgb(43, 43, 43);
  --color-contrast: rgb(255, 255, 255);
  --color-contrast-1: rgb(243, 243, 243);
}

h1 {
  letter-spacing: -0.01em;
}

hr {
  border: 0;
  border-top: 2px solid var(--color-base-1);
  margin: 1em 0;
}

a {
  color: var(--color-link);
}

.layout {
  padding: 0;
  width: 100%;
  display: flex;
  position: relative;
  flex-flow: column;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.6),
    transparent 15em
  ) !important;
}

.container {
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
}

.content {
  padding: 0 1rem;
  margin-bottom: 1rem;
  word-break: break-word;
  word-wrap: normal;
}

img {
  max-width: 100%;
  transition: opacity 0.2s;
}

img[lazy="loading"] {
  opacity: 0;
  visibility: hidden;
}

img[lazy="loaded"] {
  opacity: 1;
  visibility: visible;
}

.label {
  display: block;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.titulo,
.titulo-zarpado {
  color: white;
  background: black;
  padding: 2rem;
  margin-top: 0;
}

.banner {
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;
  text-align: center;
  color: white;
  padding: 0.5em;
  /* text-transform: uppercase; */
}
.banner img {
  margin: 0 0.5em;
}
.banner a {
  text-decoration: none;
  color: var(--color-base);
}

select {
  width: 100%;
  font-family: "Space Grotesk";
  font-size: medium;
}

@media screen and (min-width: 720px) {
  .content {
    padding: 0;
  }
  .titulo {
    color: inherit;
    background: inherit;
    line-height: inherit;
    padding: 0;
  }
}

nav[role="navigation"] {
  text-align: center;
  margin-bottom: 2em;
}
nav[role="navigation"] a {
  margin: 0.25em;
  padding: 0.6em;
  text-decoration: none;
  font-weight: bold;
  background: var(--color-base);
  color: var(--color-contrast);
}
nav[role="navigation"] a.active {
  font-size: 1.5em;
}
</style>
