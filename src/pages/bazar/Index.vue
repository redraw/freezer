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
        <select required v-model="categoria" name="categoria">
          <option selected value>Categoria</option>
          <option href="#" v-for="categoria in $page.categorias.edges" :key="categoria.node.title" :value="categoria.node.title">
            {{ categoria.node.title }}
          </option>
        </select>
        <ul class="categorias">
          <li v-for="c in $page.categorias.edges" :key="c.node.title" :value="c.node.title">
            <a
              :class="{'active': categoria === c.node.title}"
              @click.prevent="categoria = categoria === c.node.title ? '' : c.node.title"
            >
              + {{ c.node.title }}
            </a>
          </li>
        </ul>
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
          <img class="thumb" v-lazy="getImageUrl(obra.node.thumbnail, 'w_500,h_500,c_fill,g_auto')"/>
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
  metaInfo () {
    return {
      title: "Bazar"
    }
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
        categorias {
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
  categorias: allBazarCategoria {
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
      autor: "",
      categoria: ""
    }
  },
  computed: {
    obras () {
      let obras = this.$page.obras.edges
      if (this.autor) {
        obras = obras.filter(obra => this.autor === obra.node.autor.title)
      }
      if (this.categoria) {
        obras = obras.filter(obra => obra.node.categorias.map(c => c.title).includes(this.categoria))
      }
      return obras
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
  select[name="categoria"] {
    margin: 1em 0;
  }
  ul.categorias {
    display: none;
  }
  ul.categorias {
    list-style: none;
    padding: 0;
  }
  ul.categorias li {
    padding: .2em;
  }
  ul.categorias li a {
    text-decoration: none;
    cursor: pointer;
    line-height: 1em;
  }
  ul.categorias li a.active {
    font-weight: bold;
  }
  @media screen and (min-width: 720px) {
    ul.categorias {
      display: block;
    }
    select[name="categoria"] {
      display: none;
    }
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