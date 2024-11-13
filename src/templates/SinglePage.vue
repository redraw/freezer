<template>
  <Layout>
    <div class="container">
      <div v-html="$page.post.content" class="page content" />
    </div>
  </Layout>
</template>

<page-query>
query SinglePage ($path: String!) {
  post: singlePage (path: $path) {
    title
    content
  }
}
</page-query>

<style>
.page {
  max-width: 60ch;
  margin: 0 auto;
}
.page p:has(img) {
  width: 100%;
}
</style>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.post.title
    };
  }
};
</script>
