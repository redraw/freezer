<template>
  <Layout>
    <h1 class="titulo-zarpado">
      <div class="container">
        {{ $page.nota.title }}
      </div>
    </h1>
    <div class="container">
      <div class="content">
        <small>{{ $page.nota.date }}</small>
        <div class="nota" v-html="$page.nota.content"/>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query ($path: String!) {
  nota (path: $path) {
    title
    content
    listado
    date (format: "YYYY-MM-DD")
    thumbnail
  }
}
</page-query>

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
          name: "twitter:card",
          content: "summary_large_image"
        },
        {
          name: "robots",
          content: this.$page.nota.listado ? "all" : "noindex"
        }
      ],
    };
  }
};
</script>

<style>
  .nota img {
    width: 100%;
  }

  .nota p {
    margin: 1.5em 0;
  }
</style>
