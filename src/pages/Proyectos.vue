<template>
  <Layout>
    <div class="container content">
      <masonry
        class="proyectos"
        :cols="{default: 3, 1000: 3, 700: 1}"
        :gutter="{default: '30px', 700: '15px'}"
      >
        <g-link
          v-for="proyecto in $page.proyectos.edges"
          :to="proyecto.node.path"
          :key="proyecto.node.id"
          class="proyecto"
        >
          <div class="title">
            <h2>
              {{ proyecto.node.title }}
            </h2>
          </div>
          <g-image class="thumb" :src="getImageUrl(proyecto.node.thumbnail, 'w_500')"/>
        </g-link>
      </masonry>
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: "Proyectos"
  }
}
</script>

<page-query>
query {
  proyectos: allProyecto (filter: { listado: { eq: true } }) {
    edges {
      node {
        id
        path
        title
        anio
        thumbnail
      }
    }
  }
}
</page-query>

<style scoped>
  .proyectos {
    margin-top: 1em;
  }
  .proyecto {
    display: block;
    position: relative;
    z-index: 1;
    margin-bottom: 15px;
  }
  .proyecto .title {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
    width: 100%;
    color: white;
    padding: 0.5em;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    text-transform: lowercase;
    font-size: 1.2em;
    line-height: 1.2;
  }
  .proyecto:hover .thumb {
    filter: none;
  }
  @media screen and (min-width: 720px) {
    .thumb {
      filter: grayscale();
      width: 100%;
    }
    .proyecto {
      margin-bottom: 30px;
    }
  }
</style>