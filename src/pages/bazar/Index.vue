<template>
  <Layout>
    <div class="container content bazar">
      <div class="bazar-menu">
        <select required v-model="autor" name="autor">
          <option selected value>Autorxs</option>
          <option href="#" v-for="autor in $page.autores.edges" :key="autor.node.title" :value="autor.node.title">
            {{ autor.node.title }}
          </option>
        </select>
        <p>Demora: 7 a 10 días.</p>
      </div>
      <masonry
        class="obras"
        :cols="{default: 4, 1000: 4, 700: 3, 400: 2}"
        :gutter="{default: '30px', 700: '15px'}"
      >
        <g-link
          v-for="obra in obras"
          :to="obra.node.path"
          :key="obra.node.id"
          class="obra"
        >
          <g-image class="thumb" :src="getImageUrl(obra.node.thumbnail, 'w_500,h_500,c_fill,g_auto')"/>
          <div class="title">
            <span v-if="obra.node.precio">{{ obra.node.precio }}</span>
            <span v-else>Consultar</span>
          </div>
        </g-link>
      </masonry>
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: "Bazar"
  }
}
</script>

<page-query>
query {
  obras: allBazarObra (filter: { listado: { eq: true } }) {
    edges {
      node {
        id
        path
        title
        precio
        thumbnail
        autor {
          title
        }
      }
    }
  }
  autores: allBazarAutor {
    edges {
      node {
        title
      }
    }
  }
}
</page-query>

<script>
export default {
  data () {
    return {
      autor: ""
    }
  },
  computed: {
    obras () {
      if (!this.autor) return this.$page.obras.edges
      return this.$page.obras.edges.filter(obra => {
        return obra.node.autor.title === this.autor
      })
    }
  }
}
</script>

<style scoped>
  .obras {
    width: 100%;
  }
  .obra {
    display: block;
    position: relative;
    z-index: 1;
    margin-bottom: 15px;
  }
  .title {
    position: absolute;
    padding: 0.5em;
    width: 100%;
    color: white;
    font-weight: bold;
    background: rgba(0, 0, 0, 0.5);
    bottom: 0;
    margin: 0;
  }
  select[name="autor"] {
    width: 100%;
    font-family: 'Space Grotesk';
    font-size: medium;
  }
  @media screen and (min-width: 720px) {
    .bazar {
      display: flex;
      flex-flow: row;
    }
    .bazar-menu {
      width: 200px;
      margin-right: 1em;
    }
    .thumb {
      width: 100%;
    }
    .obra {
      margin-bottom: 30px;
    }
  }
</style>