<template>
  <Layout>
    <div class="page container">
      <div v-if="$page.post.toc" class="toc">
        <ul>
          <li
            v-for="heading in $page.post.headings"
            :key="heading.anchor"
            :style="{ marginLeft: `${(heading.depth - 1) * 15}px` }"
          >
            <strong v-if="heading.depth <= 2">
              <a :href="heading.anchor">{{ heading.value }}</a>
            </strong>
            <a v-else :href="heading.anchor">{{ heading.value }}</a>
          </li>
        </ul>
      </div>

      <div>
        <div v-html="$page.post.content" class="content" />
      </div>
    </div>
  </Layout>
</template>

<page-query>
query SinglePage ($path: String!) {
  post: singlePage (path: $path) {
    title
    toc
    content
    excerpt
    thumbnail
    headings {
      anchor
      value
      depth
    }
  }
}
</page-query>

<style>
.page {
  display: flex;
  flex-flow: column-reverse;
  justify-content: center;
  position: relative;
}

.page p:has(img) {
  width: 100%;
}

.page h2 {
  color: #787878;
}

.toc {
  width: 100%;
  position: relative;
  padding: 1em;
}

.toc summary {
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 10px;
}

.toc ul {
  list-style-type: square;
  padding-left: 0;
  overflow-y: auto;
  max-height: 100vh;
}

.toc li {
  margin: 5px 0;
}

.toc a {
  text-decoration: none;
}

.toc a:hover {
  text-decoration: underline;
}

@media (min-width: 768px) {
  .page {
    flex-flow: row;
    position: relative;
  }
  .toc ul {
    position: sticky;
    width: 300px;
    top: 1em;
    margin-right: 2em;
  }
}

</style>

<script>
export default {
  metaInfo() {
    return {
      title: this.$page.post.title,
      meta: [
        {
          key: "description",
          property: "description",
          content: this.$page.post.excerpt
        },
        this.$page.post.thumbnail && {
          key: "image",
          property: "og:image",
          content: this.$page.post.thumbnail
        }
      ]
    };
  },
};
</script>
