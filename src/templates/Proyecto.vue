<template>
  <Layout>
    <div class="proyecto">
      <div class="container">
        <h1 class="titulo">
          <span class="anio">{{ $page.proyecto.date }}</span> / {{ $page.proyecto.title }}
        </h1>
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
                :src="`https://youtube.com/embed/${getYoutubeID(autor.video)}`"
                width="100%"
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
    listado
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
import PhotoStack from "~/components/PhotoStack.vue"
import { getYoutubeID } from "~/utils/youtube"

export default {
  components: {
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
        },
        {
          name: "robots",
          content: this.$page.proyecto.listado ? "all" : "noindex"
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
  },
  methods: {
    getYoutubeID
  }
}
</script>

<style scoped>
.autor {
  margin-top: 2.5em;
}
.galeria {
  margin-top: 2.5em;
}
</style>
