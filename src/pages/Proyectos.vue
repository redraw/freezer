<template>
  <Layout>
    <div class="container content">
      <div class="proyectos">
        <g-link 
          v-for="proyecto in $page.proyectos.edges" 
          :to="proyecto.node.path" 
          :key="proyecto.node.id"
          class="proyecto"
        >
          <g-image class="thumb" :src="getImageUrl(proyecto.node.thumbnail, 'c_fill,w_500,h_500')"/>
          <div class="title">
            <i class="anio">{{ proyecto.node.anio }}</i>
            / {{ proyecto.node.title }}
          </div>
        </g-link>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query {
  proyectos: allProyecto {
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
  .proyecto {
    display: flex;
    align-items: center;
    text-decoration: none;
    width: 100%;
  }
  .proyecto:hover {
    background: rgb(240, 240, 240);
  }
  .title {
    padding: 1em;
    font-size: x-large;
  }
  .thumb {
    width: 100%;
  }
  .title {
    display: none;
  }
  @media screen and (min-width: 720px) {
    .title {
      display: inherit;
    }
    .thumb {
      width: 150px;
      height: 150px;
    }
  }
</style>