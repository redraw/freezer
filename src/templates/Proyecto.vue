<template>
  <Layout>
    <div class="proyecto">
      <div class="container">
        <h2 class="titulo">
          <small>proyectos / </small>{{ $page.proyecto.title }} 
        </h2>
        <div v-html="$page.proyecto.content" class="content" />
      </div>
      <div class="galeria">
        <div v-if="$page.proyecto.galeria.stack && !isMobile">
          <client-only>
            <photo-stack :data="$page.proyecto.galeria"/>
          </client-only>
        </div>
        <div class="container" v-else>
          <div v-for="(autor, key) in $page.proyecto.galeria.autores" :key="key">
            <div class="content">
              <h3 class="autor">{{ autor.nombre }}</h3>
            </div>
            <img
              v-for="(path, key) in autor.imagenes"
              v-lazy="getImageUrl(path)"
              :key="key"
            />
          </div>
        </div>
      </div>
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
    galeria {
      stack
      autores {
        nombre
        url
        imagenes
      }
    }
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

  computed: {
    isMobile () {
      return 'ontouchstart' in document
    }
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

<style>
.autor {
  margin-top: 2.5em;
}
</style>