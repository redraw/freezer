<template>
  <Layout :show-footer="false" :show-header="false">
    <a href="#" class="logo" @click="next">
      <g-image :src="logo"></g-image>
    </a>
    <div class="overlay"></div>
    <div id="tv-player"></div>
  </Layout>
</template>

<script>
export default {
  data () {
    return {
      player: undefined,
      logo: undefined
    }
  },

  metaInfo () {
    return {
      title: "Freezer TV",
      meta: [
        {
          key: "image",
          property: "og:image",
          content: "https://freezer.com.ar/logo-tierradelfuego.png",
        },
        {
          name: "twitter:card",
          content: "summary_large_image"
        },
      ],
      script: [
        { src: "https://www.youtube.com/iframe_api", id: "youtube-api" }
      ],
    }
  },

  created () {
    this.logo = Math.random() > 0.5 ? '/logo-tierradelfuego-glitch.gif' : '/logo-tierradelfuego.gif'
  },

  async mounted () {
    window.addEventListener("load", () => {
      this.player = new YT.Player('tv-player', {
        width: "100%",
        playerVars: {
          controls: 0,
          rel: 0,
          showinfo: 0,
          enablejsapi: 1,
          autoplay: 1,
          modestbranding: 1,
          origin: window.location.host,
        },
        events: {
          'onReady': this.onPlayerReady,
          'onStateChange': this.onPlayerStateChange
        }
      })
    })

  },

  methods: {
    onPlayerReady(event) {
      const player = event.target
      player.cuePlaylist({
        list: this.$settings.tv_playlist,
        listType: "playlist"
      })
    },

    onPlayerStateChange(event) {
      const player = event.target
      if (event.data === YT.PlayerState.CUED) {
        player.setShuffle(true)
        setTimeout(() => {
          player.playVideoAt(0);
        }, 500) // YT bug fix
      }
    },

    next() {
      this.player.nextVideo()
    }
  }
}
</script>

<style>
#tv-player {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  transform: scale(1.25);
}
</style>

<style scoped>
.logo {
  position: fixed;
  top: 2em;
  left: 2em;
  width: 100px;
  max-width: 25vw;
  z-index: 12;
}
.overlay {
  position: fixed;
  z-index: 10;
  background: black;
  opacity: 0;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>