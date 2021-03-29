<template>
  <Layout>
    <div class="container content">
      <masonry
        class="cursos"
        :cols="{default: 3, 1000: 3, 700: 2, 400: 1}"
        :gutter="{default: '30px', 700: '15px'}"
      >
        <g-link
          v-for="curso in $page.cursos.edges"
          :to="curso.node.path"
          :key="curso.node.id"
          class="curso"
          :class="{ 'finalizado': curso.node.finalizado }"
        >
          <div class="title">
            <i class="anio">{{ curso.node.anio }}</i>
            / {{ curso.node.title }}
          </div>
          <g-image class="thumb" :src="getImageUrl(curso.node.thumbnail, 'w_500')"/>
        </g-link>
      </masonry>
      <Pager :info="$page.cursos.pageInfo"/>
    </div>
  </Layout>
</template>

<script>
import { Pager } from 'gridsome'

export default {
  metaInfo: {
    title: "Cursos"
  },
  components: {
    Pager
  }
}
</script>

<page-query>
query ($page: Int) {
  cursos: allCurso (perPage: 10, page: $page, sort: [{by: "finalizado", order: ASC}, {by: "date"}]) @paginate {
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        path
        title
        docente
        thumbnail
        inicio (format: "YYYY MM")
        lugar
        finalizado
      }
    }
  }
}
</page-query>

<style scoped>
  .cursos {
    margin-top: 1em;
  }
  .curso {
    display: block;
    position: relative;
    z-index: 1;
    margin-bottom: 15px;
  }
  .title {
    position: absolute;
    padding: 0.5em;
    display: none;
    width: 100%;
  }
  .curso.finalizado {
    opacity: 0.4;
  }
  .curso:hover .thumb {
    filter: none;
  }
  @media screen and (min-width: 720px) {
    .thumb {
      filter: grayscale();
      width: 100%;
    }
    .curso {
      margin-bottom: 30px;
    }
  }
</style>