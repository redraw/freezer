<template>
  <div class="home-layout">
    <div class="home-left">
      <div class="menu">
        <g-link 
          v-for="link in $settings.menu" 
          :key="link.url" 
          :to="link.url"
        >
          {{ link.name }}
        </g-link>
      </div>
      <div class="premiere" v-if="premiere">
        <div class="premiere-header">
          <h4>{{ premiere.title }}</h4>
        </div>
        <g-link :to="premiere.path">
          <g-image v-if="premiereGif" class="premiere-gif" :src="premiereGif"/>
          <g-image :src="getImageUrl(premiere.thumbnail, 'c_fill,w_250,h_250')"/>
        </g-link>
      </div>
    </div>
    <g-link to="/contacto" class="logo flicker-in-1">
      <g-image src="/logo.png" :alt="$settings.site_name"/>
    </g-link>
    <div class="cursos">
      <div
        v-for="curso in $page.cursos.edges"
        :key="curso.node.id"
        class="curso-thumbnail"
      >
        <g-link :to="curso.node.path">
          <g-image :src="getImageUrl(curso.node.thumbnail, 'c_scale,w_600')" 
              :class="{'finalizado': curso.node.finalizado}"
              class="thumbnail" 
          />
        </g-link>
      </div>
    </div>
  </div>
</template>

<page-query>
query Home {
  cursos: allCurso (sort: [{by: "finalizado", order: ASC}, {by: "date"}]) {
    edges {
      node {
        id
        inicio (format: "YYYY")
        title
        thumbnail
        path
        finalizado
      }
    }
  }
  premieres: allProyecto (filter: { premiere: { eq: true } }) {
    edges {
      node {
        path
        title
        thumbnail
        gifs_hashtag
      }
    }
  }
}
</page-query>

<script>
import { fetchGifs } from '~/utils/giphy'

export default {
  data () {
    return {
      premiereGif: ''
    }
  },

  computed: {
    premiere () {
      if (this.$page.premieres && this.$page.premieres.edges.length) {
        return this.$page.premieres.edges[0].node
      }
    }
  },

  async mounted () {
    if (this.premiere && this.premiere.gifs_hashtag) {
      const data = await fetchGifs(this.premiere.gifs_hashtag, 'stickers')
      const gifs = data.map(item => item.images.downsized.url)
      this.premiereGif = gifs[Math.floor(Math.random() * gifs.length)]
    }
  }
}
</script>

<style scoped>
.logo {
  margin: 10vw;
  height: 100%;
}

.logo img {
  max-width: 40vw;
}

.home-layout {
  display: flex;
  flex-flow: column;
  align-items: center;
}

.menu {
  display: flex;
  flex-flow: column;
  padding: 2em;
}

.menu a {
  padding: 0.2em;
}

.cursos {
  display: flex;
  flex-flow: column;
  align-items: center;
}

.finalizado {
  opacity: 0.4;
}

.premiere {
  position: relative;
}

.premiere-header {
  margin: 1em;
}

.premiere-gif {
  position: absolute;
  width: 100%;
}

@media screen and (min-width: 720px) {
  .logo {
    position: sticky;
    top: 10vw;
  }
  .home-layout {
    flex-flow: row;
    align-items: inherit;
    justify-content: space-between;
  }
  .cursos {
    justify-content: center;
  }
  .thumbnail {
    height: 100vh;
  }
  .premiere {
    padding: 2em;
  }
}
.flicker-in-1{-webkit-animation:flicker-in-1 2s linear both;animation:flicker-in-1 2s linear both}
@-webkit-keyframes flicker-in-1{0%{opacity:0}10%{opacity:0}10.1%{opacity:1}10.2%{opacity:0}20%{opacity:0}20.1%{opacity:1}20.6%{opacity:0}30%{opacity:0}30.1%{opacity:1}30.5%{opacity:1}30.6%{opacity:0}45%{opacity:0}45.1%{opacity:1}50%{opacity:1}55%{opacity:1}55.1%{opacity:0}57%{opacity:0}57.1%{opacity:1}60%{opacity:1}60.1%{opacity:0}65%{opacity:0}65.1%{opacity:1}75%{opacity:1}75.1%{opacity:0}77%{opacity:0}77.1%{opacity:1}85%{opacity:1}85.1%{opacity:0}86%{opacity:0}86.1%{opacity:1}100%{opacity:1}}@keyframes flicker-in-1{0%{opacity:0}10%{opacity:0}10.1%{opacity:1}10.2%{opacity:0}20%{opacity:0}20.1%{opacity:1}20.6%{opacity:0}30%{opacity:0}30.1%{opacity:1}30.5%{opacity:1}30.6%{opacity:0}45%{opacity:0}45.1%{opacity:1}50%{opacity:1}55%{opacity:1}55.1%{opacity:0}57%{opacity:0}57.1%{opacity:1}60%{opacity:1}60.1%{opacity:0}65%{opacity:0}65.1%{opacity:1}75%{opacity:1}75.1%{opacity:0}77%{opacity:0}77.1%{opacity:1}85%{opacity:1}85.1%{opacity:0}86%{opacity:0}86.1%{opacity:1}100%{opacity:1}}
</style>
