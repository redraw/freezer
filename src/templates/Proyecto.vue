<template>
  <Layout>
    <div class="project">
      <div class="container">
        <div class="project-header">
          <h1 class="project-title" v-html="$page.proyecto.title" />
          <div class="project-info">
            <div class="categories-container">
              <div class="categories">
                <span class="label">Categories</span>
                <span
                  class="category"
                  v-for="(category, index) in $page.proyecto.categories"
                  :key="index"
                  v-text="category"
                />
              </div>
            </div>

            <div class="year-container">
              <span class="label">Year</span>
              <div v-html="$page.proyecto.date" />
            </div>
          </div>
        </div>

        <div v-html="$page.proyecto.content" class="content" />
      </div>
    </div>
  </Layout>
</template>

<page-query>
query Proyecto ($path: String!) {
  proyecto (path: $path) {
    title
    date (format: "YYYY")
    content
    project_bg_color
    project_fg_color
  }
}
</page-query>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.proyecto.title,
      bodyAttrs: {
        style: `background-color: ${
          this.$page.proyecto.project_bg_color
            ? this.$page.proyecto.project_bg_color
            : "var(--color-base)"
        }; color: ${
          this.$page.proyecto.project_fg_color
            ? this.$page.proyecto.project_fg_color
            : "var(--color-contrast)"
        }`
      }
    };
  }
};
</script>

<style scoped>
.project-header {
  padding: 20vh 0 4rem 0;
}
.project-title {
  font-size: 4rem;
  margin: 0 0 4rem 0;
  padding: 0;
}
.project-info {
  display: flex;
  flex-wrap: wrap;
  font-size: 0.8rem;
}
.project-info > div {
  margin-right: 4rem;
}
.project-info > div:last-of-type {
  margin: 0;
}
.category:after {
  content: ", ";
}
.category:last-of-type:after {
  content: "";
}
</style>
