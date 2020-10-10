<template>
  <div class="layout">
    <!-- <marquee class="aviso">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae consequatur ea facilis aliquam amet, vero animi est aspernatur et? Nobis, facere aspernatur sunt quisquam temporibus possimus voluptates recusandae accusantium reprehenderit!</marquee> -->
    <Header v-if="showHeader" />
    <slot/>
    <Footer v-if="showFooter" />
  </div>
</template>

<script>
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default {
  props: {
    showHeader: {
      default: true
    },
    showFooter: {
      default: true
    }
  },

  components: {
    Header,
    Footer
  }
}
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
  --color-base-1: rgb(243, 243, 243);
  --color-contrast: rgb(0, 0, 0);
  --color-contrast-1: rgb(43, 43, 43);
  font-family: "Space Grotesk",-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
  margin:0;
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

.layout {
  padding: 0;
  width: 100%;
  display: flex;
  position: relative;
  flex-flow: column;
}

.container {
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
}

.content {
  padding: 0 1rem;
  margin-bottom: 1rem;
}

a {
  color: inherit;
}

img {
  max-width: 100%;
  transition: opacity 0.2s;
}

img[lazy=loading] {
  opacity: 0;
  visibility: hidden;
}

img[lazy=loaded] {
  opacity: 1;
  visibility: visible;
}

.label {
  display: block;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.titulo, .titulo-zarpado {
  color: white;
  background: black;
  padding: 2rem;
  margin-top: 0;
}

.aviso {
  background: black;
  color: white;
  padding: 0.2em;
  font-weight: bold;
  text-transform: uppercase;
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
</style>
