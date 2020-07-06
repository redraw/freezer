<template>
  <Layout>
    <div class="proyecto">
      <div class="container">
        <h2 class="titulo">
          <span class="anio">{{ $page.proyecto.date }}</span> / {{ $page.proyecto.title }}
        </h2>
        <div v-html="$page.proyecto.content" class="content" />
      </div>
      <client-only>
        <div class="galeria">
          <div v-if="$page.proyecto.galeria.stack && !isTouchDevice">
            <photo-stack :data="$page.proyecto.galeria"/>
          </div>
          <div class="container" v-else>
            <div v-for="(autor, key) in $page.proyecto.galeria.autores" :key="key">
              <div class="content">
                <h3 class="autor">{{ autor.nombre }}</h3>
              </div>
              <iframe
                v-if="autor.video"
                :src="autor.video"
                width="700"
                height="400"
                frameborder="0"
                allowfullscreen
              />
              <g-link
                v-for="(path, key) in autor.imagenes"
                :to="autor.url"
                :key="key"
                width="100%"
              >
                <img v-lazy="getImageUrl(path)"/>
              </g-link>
            </div>
          </div>
        </div>
      </client-only>
    </div>
  </Layout>
</template>

<page-query>
query Proyecto ($path: String!) {
  proyecto (path: $path) {
    title
    thumbnail
    date (format: "YYYY")
    content
    bg_color
    fg_color
    galeria {
      stack
      autores {
        nombre
        url
        video
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
    isTouchDevice () {
      return 'ontouchstart' in document
    }
  },

  metaInfo() {
    return {
      title: this.$page.proyecto.title,
      meta: [
        {
          key: "image",
          property: "og:image",
          content: this.getImageUrl(this.$page.proyecto.thumbnail),
        },
        {
          name: "twitter:card",
          content: "summary_large_image"
        }
      ],
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