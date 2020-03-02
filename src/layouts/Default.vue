<template>
  <div class="layout">
    <Header />
    <slot/>
  </div>
</template>

<script>
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default {
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
  height: 100%;
  display: flex;
  flex-flow: column;
}

.container {
  max-width: 980px;
  margin: 0 auto;
  flex-grow: 1;
}

.content {
  padding: 0 2rem;
  margin-bottom: 1rem;
}

a {
  color: inherit;
}

img {
  max-width: 100%;
}

.label {
  display: block;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.titulo {
  color: white;
  background: black;
  padding: 1rem 2rem;
}

@media screen and (min-width: 720px) {
  .content {
    padding: 0;
  }
  .titulo {
    color: inherit;
    background: inherit;
    line-height: inherit;
    margin: 0;
    padding-top: 0;
  }
}
</style>
