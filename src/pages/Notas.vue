<template>
  <Layout>
    <div class="container content">
      <masonry
        class="notas"
        :cols="{default: 2, 1000: 3, 700: 2, 400: 1}"
        :gutter="{default: '30px', 700: '15px'}"
      >
        <g-link
          v-for="nota in $page.notas.edges"
          :to="nota.node.path"
          :key="nota.node.id"
          class="nota"
        >
          <div class="thumb" v-lazy:background-image="getImageUrl(nota.node.thumbnail, 'w_600,h_600,c_fill,g_auto')"/>
          <div class="title">
            <h2>
              {{ nota.node.title }}
            </h2>
          </div>
        </g-link>
      </masonry>
      <Pager :info="$page.notas.pageInfo"/>
    </div>
  </Layout>
</template>

<script>
import { Pager } from 'gridsome'

export default {
  metaInfo: {
    title: "Notas"
  },
  components: {
    Pager
  }
}
</script>

<page-query>
query ($page: Int) {
  notas: allNota (perPage: 6, page: $page, filter: { listado: { eq: true } }) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        path
        title
        thumbnail
      }
    }
  }
}
</page-query>

<style scoped>
  .notas {
    margin-top: 1em;
  }
  .nota {
    display: block;
    position: relative;
    text-decoration: none;
    color: inherit;
    min-height: 400px;
    margin-bottom: 15px;
  }
  .title {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
    width: 100%;
  }
  .title h2 {
    font-size: 2em;
    margin: 0.5em;
  }
  .thumb {
    position: absolute;
    background-size: cover;
    opacity: 0;
    transition: 1s opacity;
    height: 100%;
    width: 100%;
  }
  .nota:hover .thumb {
    opacity: 0.5;
  }
  @media screen and (min-width: 720px) {
    .nota {
      width: 100%;
      margin-bottom: 30px;
    }
  }
</style>