<template>
  <Layout>
    <div class="container">
      <div class="obra">
        <div class="thumbnail">
          <img v-lazy="getImageUrl($page.obra.thumbnail, 'w_500,c_fill,g_auto')" :alt="$page.obra.title" />
        </div>
        <div class="right">
          <h1 class="titulo">
            {{ $page.obra.title }}
            <small class="listado" v-if="!$page.obra.listado"><br>🕑 no disponible</small>
          </h1>
          <div class="meta">
            <div class="autor">
              <span class="label">autor</span>
              <span class="autor-name" v-text="$page.obra.autor.title" />
            </div>
            <div class="categorias" v-if="$page.obra.categorias">
              <span class="label">categorias</span>
              <div v-text="$page.obra.categorias.map(c => c.title).join(', ')" />
            </div>
            <div class="precio">
              <span class="label">precio</span>
              <div v-text="$page.obra.precio || 'Consultar'" />
            </div>
          </div>
          <div class="content" v-html="$page.obra.content" />
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query ($path: String!) {
  obra: bazarObra (path: $path) {
    title
    precio
    thumbnail
    content
    listado
    autor {
      title
    }
    categorias {
      title
    }
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    return {
      title: `${this.$page.obra.title} | Bazar`,
      meta: [
        {
          key: "image",
          property: "og:image",
          content: this.getImageUrl(this.$page.obra.thumbnail),
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
.obra {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}
.right {
  flex-grow: 1;
}
.thumbnail {
  width: 100vw;
  line-height: 0;
}
.listado {
  color: red;
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
@media screen and (min-width: 720px) {
  .content {
    padding: 0 2rem;
  }
  .obra {
    position: relative;
    flex-flow: row nowrap;
  }
  .thumbnail {
    width: 500px;
  }
  .thumbnail img {
    position: sticky;
    top: 1em;
  }
  .titulo {
    padding: 0 2rem;
  }
  .right {
    flex-basis: 60%;
  }
}
</style>
