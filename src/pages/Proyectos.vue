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
          <img v-lazy="getImageUrl(proyecto.node.thumbnail, 'c_fill,w_250,h_250')"/>
          <div class="title">
            <i class="anio">{{ proyecto.node.anio }}</i>
            {{ proyecto.node.title }}
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
    color: white;
    background: black;
  }
  .title {
    padding: 1em;
    font-size: x-large;
  }
  .thumbnail {
    flex-basis: 250px;
  }
</style>