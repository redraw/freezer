<template>
  <Layout>
    <div class="container content">
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. At vero ipsa, iure quaerat laboriosam exercitationem quam minus laudantium dicta, praesentium amet harum sint! Ducimus consequatur sint eos voluptatum sed eligendi.</p>
      <div class="proyectos">
        <g-link 
          v-for="proyecto in $page.proyectos.edges" 
          :href="proyecto.node.path" 
          :key="proyecto.node.id"
          class="proyecto"
        >
          <g-image :src="`${$settings.cloudinary_url}/c_scale,w_400/${proyecto.node.thumbnail}`"/>
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