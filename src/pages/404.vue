<template>
  <Layout :show-footer="false" />
</template>

<script>
import { fetchGifs } from '~/utils/giphy'

export default {
  data () {
    return {
      image: "",
      gifs: [],
      interval: 8 //s
    }
  },

  metaInfo () {
    return {
      bodyAttrs: {
        style: `
          background: black url(${this.image}) no-repeat fixed center;
          background-size: cover;
        `
      }
    }
  },

  async mounted () {
    const data = await fetchGifs("error 404")
    this.gifs = data.map(result => result.images.downsized_large.url)
    this.slideshow()
  },

  methods: {
    slideshow () {
      this.image = this.gifs[Math.floor(Math.random() * this.gifs.length)]
      setTimeout(this.slideshow, this.interval * 1000)
    }
  }
}
</script>