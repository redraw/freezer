<template>
  <Layout>
    <div class="container">
      <div v-html="$page.post.content" class="content" />
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

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.post.title
    };
  }
};
</script>
