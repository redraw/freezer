<template>
  <Layout>
    <h1 class="titulo-zarpado">
      <div class="container">
        {{ $page.nota.title }}
      </div>
    </h1>
    <div class="container">
      <div class="content">
        <small class="autores"
          >{{ $page.nota.date }} | Escribe
          <span v-for="(autor, idx) in autores" :id="autor.node.id">
            <a :href="autor.node.url">{{ autor.node.nombre }}</a>
            <span v-if="autores.length > 1 && idx < autores.length -2 ">, </span>
            <span v-if="autores.length > 1 && idx === autores.length -2 "> y </span>
          </span>
        </small>
        <div class="nota" v-html="$page.nota.content" />
      </div>
    </div>
  </Layout>
</template>

<page-query>
query ($path: String!) {
  nota (path: $path) {
    title
    content
    excerpt
    listado
    date (format: "YYYY-MM-DD")
    thumbnail
    autores {
      autor
    }
  }
}
</page-query>

<static-query>
query {
  autores: allAutor {
    edges {
      node {
        id
        nombre
        url
      }
    }
  }
}
</static-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.nota.title,
      meta: [
        {
          key: "image",
          property: "og:image",
          content: this.getImageUrl(this.$page.nota.thumbnail),
        },
        {
          key: "description",
          property: "description",
          content: this.$page.nota.excerpt,
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "robots",
          content: this.$page.nota.listado ? "all" : "noindex",
        },
      ],
    };
  },
  computed: {
    autores() {
      return this.$static.autores?.edges.filter((edge) => {
        return this.$page.nota.autores?.filter((item) => item?.autor === edge?.node?.id).length > 0;
      });
    },
  },
};
</script>

<style>
.autores {
  font-weight: bold;
  color: #bbb
}

.autores a {
  color: #bbb;
  text-decoration: none;
}

.nota p > img {
  text-align: center;
}

.nota p {
  width: 100%;
  margin: 1.5em 0;
}
</style>
