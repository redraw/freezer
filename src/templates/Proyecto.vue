<template>
  <Layout>
    <div class="proyecto">
      <div class="container">
        <h2 class="titulo">
          <small>proyectos / </small>{{ $page.proyecto.title }} 
        </h2>
        <div v-html="$page.proyecto.content" class="content" />
        <br>
      </div>
      <client-only>
        <photo-stack :photos="$page.proyecto.fotos"/>
      </client-only>
    </div>
  </Layout>
</template>

<page-query>
query Proyecto ($path: String!) {
  proyecto (path: $path) {
    title
    date (format: "YYYY")
    content
    bg_color
    fg_color
    fotos
  }
}
</page-query>

<script>
import ClientOnly from 'vue-client-only'
import PhotoStack from "~/components/PhotoStack.vue"

export default {
  components: {
    ClientOnly,
    PhotoStack
  },

  metaInfo() {
    return {
      title: this.$page.proyecto.title,
      bodyAttrs: {
        style: `background-color: ${
          this.$page.proyecto.bg_color
            ? this.$page.proyecto.bg_color
            : "var(--color-base)"
        }; color: ${
          this.$page.proyecto.fg_color
            ? this.$page.proyecto.fg_color
            : "var(--color-contrast)"
        }`
      }
    };
  }
}
</script>