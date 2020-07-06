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
    </div>
  </Layout>
</template>

<page-query>
query {
  cursos: allCurso (sort: [{by: "finalizado", order: ASC}, {by: "date"}]) {
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