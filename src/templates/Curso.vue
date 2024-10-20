<template>
  <Layout>
    <div class="container">
      <div class="curso">
        <div class="thumbnail">
          <img v-lazy="getImageUrl($page.curso.thumbnail, 'c_scale,w_800')" :alt="$page.curso.title" />
        </div>
        <div class="right">
          <h1 class="titulo">
            {{ $page.curso.title }}
            <small class="finalizado" v-if="$page.curso.finalizado"><br>🕑 finalizado</small>
          </h1>
          <div class="meta">
            <div v-if="$page.curso.docente.length" class="docente">
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
            <div class="estado" v-if="$page.curso.finalizado">
              <span class="label">estado</span>
              <small class="finalizado">🕑 finalizado</small>
            </div>
          </div>
          <div class="content" v-html="$page.curso.content" />
          <div class="content" v-if="$page.curso.mercadopago_link">
            <g-link :href="$page.curso.mercadopago_link">
              <img :src="`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${$page.curso.mercadopago_link}`">
            </g-link>
          </div>
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
    thumbnail
    inicio (format: "YYYY MM")
    timeToRead
    content
    excerpt
    lugar
    mercadopago_link
    finalizado
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.curso.title,
      meta: [
        {
          key: "image",
          property: "og:image",
          content: this.getImageUrl(this.$page.curso.thumbnail),
        },
        {
          key: "description",
          property: "description",
          content: `${this.$page.curso.title} / ${this.$page.curso.inicio} ~ coordinado por ${this.$page.curso.docente} ~ lugar: ${this.$page.curso.lugar}`
        },
        {
          name: "twitter:card",
          content: "summary_large_image"
        }
      ]
    };
  }
};
</script>

<style scoped>
.curso {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}
.right {
  flex-grow: 1;
}
.thumbnail {
  width: 100vw;
}
.finalizado {
  color: red;
}
.meta {
  display: flex;
  flex-wrap: wrap;
  font-size: 0.8rem;
  padding: 0 2rem;
}
.meta > div {
  margin: 1rem 2rem 1rem 0;
}
.titulo {
  display: none;
}
@media screen and (min-width: 720px) {
  .titulo {
    display: block;
  }
  .content {
    padding: 0 2rem;
  }
  .curso {
    position: relative;
    flex-flow: row nowrap;
  }
  .thumbnail {
    width: 300px;
  }
  .thumbnail img {
    position: sticky;
    top: 1em;
  }
  .titulo {
    padding: 0 2rem;
  }
  .estado {
    display: none;
  }
  .right {
    flex-basis: 60%;
  }
}
</style>
