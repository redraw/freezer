<template>
  <Layout :show-footer="false" />
</template>

<script>
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
    const data = await this.fetchGifs()
    console.log(data)
    this.gifs = data.map(result => result.images.downsized_large.url)
    this.slideshow()
  },

  methods: {
    async fetchGifs () {
      const base = "https://api.giphy.com/v1/gifs"
      const key = "olRA4Ucoh8g8dpgbx8vjr7nDgXMjuBM9"
      const response = await fetch(`${base}/search?api_key=${key}&q=error+404`)
      const results = await response.json()
      return results.data
    },

    slideshow () {
      this.image = this.gifs[Math.floor(Math.random() * this.gifs.length)]
      setTimeout(this.slideshow, this.interval * 1000)
    }
  }
}
</script>