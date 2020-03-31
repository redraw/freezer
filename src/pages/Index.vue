<template>
  <div class="layout">
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
          <img :src="getImageUrl(curso.node.thumbnail, 'c_scale,w_600')" 
               :class="{'finalizado': curso.node.finalizado}"
               class="thumbnail" 
          />
        </g-link>
      </div>
    </div>
  </div>
</template>

<page-query>
query Posts {
  cursos: allCurso (sort: [{by: "finalizado", order: ASC}, {by: "inicio", order: ASC}]) {
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
}
</page-query>

<style scoped>
.logo {
  margin: 10vw;
  height: 100%;
}

.logo img {
  max-width: 40vw;
}

.layout, .cursos {
  display: flex;
  flex-flow: column;
  align-items: center;
}

.finalizado {
  opacity: 0.4;
}

@media screen and (min-width: 720px) {
  .logo {
    position: sticky;
    top: 10vw;
  }
  .layout {
    flex-flow: row;
    align-items: inherit;
    justify-content: center;
  }
  .cursos {
    justify-content: center;
  }
  .thumbnail {
    height: 100vh;
  }
}
.flicker-in-1{-webkit-animation:flicker-in-1 2s linear both;animation:flicker-in-1 2s linear both}
@-webkit-keyframes flicker-in-1{0%{opacity:0}10%{opacity:0}10.1%{opacity:1}10.2%{opacity:0}20%{opacity:0}20.1%{opacity:1}20.6%{opacity:0}30%{opacity:0}30.1%{opacity:1}30.5%{opacity:1}30.6%{opacity:0}45%{opacity:0}45.1%{opacity:1}50%{opacity:1}55%{opacity:1}55.1%{opacity:0}57%{opacity:0}57.1%{opacity:1}60%{opacity:1}60.1%{opacity:0}65%{opacity:0}65.1%{opacity:1}75%{opacity:1}75.1%{opacity:0}77%{opacity:0}77.1%{opacity:1}85%{opacity:1}85.1%{opacity:0}86%{opacity:0}86.1%{opacity:1}100%{opacity:1}}@keyframes flicker-in-1{0%{opacity:0}10%{opacity:0}10.1%{opacity:1}10.2%{opacity:0}20%{opacity:0}20.1%{opacity:1}20.6%{opacity:0}30%{opacity:0}30.1%{opacity:1}30.5%{opacity:1}30.6%{opacity:0}45%{opacity:0}45.1%{opacity:1}50%{opacity:1}55%{opacity:1}55.1%{opacity:0}57%{opacity:0}57.1%{opacity:1}60%{opacity:1}60.1%{opacity:0}65%{opacity:0}65.1%{opacity:1}75%{opacity:1}75.1%{opacity:0}77%{opacity:0}77.1%{opacity:1}85%{opacity:1}85.1%{opacity:0}86%{opacity:0}86.1%{opacity:1}100%{opacity:1}}
</style>
