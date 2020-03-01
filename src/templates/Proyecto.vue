<template>
  <Layout>
    <div class="proyecto">
      <div class="container">
        <h1 class="proyecto-title" v-html="$page.proyecto.title" />
        <div v-html="$page.proyecto.content" class="content" />
        <br>
        <photo-stack :photos="photos"/>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem placeat obcaecati temporibus asperiores culpa eveniet aut velit, delectus hic similique earum sunt expedita laborum cum veritatis blanditiis repellat alias saepe!</p>
        <p>Aliquid vitae eveniet rerum temporibus corrupti exercitationem quaerat debitis similique officiis, ullam excepturi repudiandae fugiat. Illo nam, cumque, sint error iste non sequi quia molestiae necessitatibus dicta repellendus excepturi eum?</p>
        <photo-stack :photos="photos"/>
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
    bg_color
    fg_color
  }
}
</page-query>

<script>
import PhotoStack from "~/components/PhotoStack.vue"

export default {
  components: {
    PhotoStack
  },

  data () {
    return {
      photos: [
        "/tmp/lrnz_fullnight_foto luciana demichelis-2378.jpg",
        "/tmp/lrnz_fullnight_foto luciana demichelis-2333.jpg",
        "/tmp/lrnz_fullnight_foto luciana demichelis-2343.jpg",
        "/tmp/lrnz_fullnight_foto luciana demichelis-2340.jpg",
        "/tmp/lrnz_fullnight_foto luciana demichelis-2349.jpg",
        "/tmp/lrnz_fullnight_foto luciana demichelis-2384.jpg",
      ]
    }
  },

  metaInfo() {
    return {
      title: this.$page.proyecto.title,
      bodyAttrs: {
        style: `background-color: ${
          this.$page.proyecto.bg_color
            ? this.$page.proyecto.bg_color
            : "var(--color-base)"
        }; color: ${
          this.$page.proyecto.fg_color
            ? this.$page.proyecto.fg_color
            : "var(--color-contrast)"
        }`
      }
    };
  }
}
</script>

<style scoped>
/* .proyecto-title {
  position: sticky;
  top: 0;
  padding-top: 0.5em;
} */
</style>