<template>
  <Layout :show-footer="false" :show-header="false">
    <a href="#" class="logo" @click="next">
      <g-image src="/logo-tierradelfuego.gif" />
    </a>
    <div v-show="!isWebview" class="overlay" @click="play"></div>
    <div id="tv-player"></div>
  </Layout>
</template>

<script>
const axios = require("axios")

export default {
  data () {
    return {
      player: undefined,
      playing: false
    }
  },

  metaInfo () {
    return {
      title: "TV",
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
    }
  },

  computed: {
    isWebview() {
      if (process.isClient) {
        const ua = window.navigator.userAgent.toLowerCase()
        return /android|instagram/.test(ua)
      }
    }
  },

  async mounted () {
    this.$loadScript("//www.youtube.com/iframe_api").then((el) => {
      console.log("YT API loaded", el)
      YT.ready(() => {
        this.player = new YT.Player("tv-player", {
          width: "100%",
          playerVars: {
            controls: 0,
            rel: 0,
            showinfo: 0,
            enablejsapi: 1,
            loop: 1,
            modestbranding: 1,
            origin: window.location.host,
            list: this.$settings.tv_playlist,
            listType: "playlist"
          },
          events: {
            'onReady': this.onPlayerReady,
            'onStateChange': this.onPlayerStateChange,
            'onError': this.onPlayerError
          }
        })
      })
    })
  },

  methods: {
    async onPlayerReady(event) {
      this.player.setShuffle(true)
      const twitch = await axios.get("https://en5l2yzjr6558ar.m.pipedream.net")
      console.log("LIVESTREAM:", twitch.data.online)
      if (twitch.data.online) {
        window.location.replace("https://twitch.tv/freezerfoto")
      } else {
        setTimeout(() => {
          this.player.playVideoAt(0)
        }, 1000)
      }
    },

    onPlayerError(event) {
      console.error(event)
    },

    onPlayerStateChange(event) {
      const eventMap = Object.fromEntries(Object.entries(YT.PlayerState).map(a => a.reverse()))
      console.log("YT:", eventMap[event.data])
      this.playing = event.data === YT.PlayerState.PLAYING
    },

    play() {
      if (!this.playing) {
        this.player.playVideo()
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
