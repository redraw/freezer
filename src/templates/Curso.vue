<template>
  <Layout>
    <div class="container">
      <div class="curso">
        <div class="thumbnail">
          <g-image :src="$page.curso.thumbnail" :alt="$page.curso.title" />
        </div>
        <div class="right">
          <h2 v-html="$page.curso.title" class="titulo"/>
          <div class="meta">
            <div class="docente">
              <span class="label">coordina</span>
              <span class="docente-name" v-text="$page.curso.docente" />
            </div>
            <div class="inicio">
              <span class="label">inicio</span>
              <div v-text="$page.curso.inicio" />
            </div>
            <div class="lugar">
              <span class="label">lugar</span>
              <div v-text="$page.curso.lugar" />
            </div>
          </div>
          <div class="content" v-html="$page.curso.content" />
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query Curso ($path: String!) {
  curso (path: $path) {
    title
    docente
    thumbnail (quality: 90, width: 720)
    inicio (format: "YYYY MM")
    timeToRead
    content
    lugar
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.curso.title
    };
  }
};
</script>

<style scoped>
.curso {
  display: flex;
  flex-flow: row wrap-reverse;
  justify-content: center;
}
.right {
  flex-grow: 1;
}
.thumbnail {
  max-width: 100%;
}
.meta {
  display: flex;
  flex-wrap: wrap;
  font-size: 0.8rem;
  padding: 0 2rem;
}
.meta > div {
  margin: 0 2rem 1rem 0;
}
.content {
  margin-bottom: 4em;
}
@media screen and (min-width: 720px) {
  .content {
    padding: 0 2rem;
  }
  .curso {
    flex-flow: row nowrap;
  }
  .thumbnail {
    width: 300px;
  }
  .right {
    flex-basis: 80%;
  }
}
</style>
