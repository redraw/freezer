<template>
  <Scrollama
    @step-enter="stepEnter"
    :offset="1"
  >
    <div
      slot="graphic"
      class="photo-stack"
    >
      <g-link
        v-for="(item, key) in media"
        v-show="key <= index"
        :key="key"
        :href="item.autor.url"
        :style="styles[key]"
        class="photo-link"
      >
        <iframe
          v-if="item.autor.video"
          :src="`https://youtube.com/embed/${getYoutubeID(item.autor.video)}`"
          width="700"
          height="400"
          frameborder="0"
          allowfullscreen
        />
        <img
          v-else
          v-lazy="getImageUrl(item.path)"
          v-tippy="{
            followCursor: true,
            popperOptions: {
              positionFixed: true
            }
          }"
          :content="item.autor.nombre"
          :ref="`img-${key}`"
          class="photo"
        />
      </g-link>
    </div>
    <div
      v-for="(item, key) in media"
      :key="key"
      class="photo-step"
    >
      <a href="#" @click="scrollTop">🡩</a>
    </div>
  </Scrollama>
</template>

<script>
import "intersection-observer"
import Scrollama from 'vue-scrollama'
import { getYoutubeID } from '~/utils/youtube'

export default {
  components: {
    Scrollama
  },

  props: ['data'],

  data () {
    return {
      index: 0,
      styles: []
    }
  },

  computed: {
    media () {
      return this.data.autores.flatMap(autor => {
        return autor.imagenes.map(path => {
          return {path, autor}
        })
      })
    }
  },

  methods: {
    stepEnter ({element, index, direction}) {
      this.index = index

      if (index === 0) {
        this.shift()
      }

      if (index < this.media.length) {
        // Load next image
        // vue-lazyload can't detect next image inside Scrollama's graphic
        const ref = this.$refs[`img-${index+1}`][0]
        ref.src = ref.dataset.src
      }
    },

    random (min = 0, max = 1) {
      return Math.random() * (max - min) + min
    },

    shift () {
      this.styles = [...Array(this.media.length).keys()].map(index => {
        if (index > 0) {
          return {
            transform: `
              translateX(${this.random(-20, 20)}vw)
              scale(${this.random(0.5, 1)})
            `
          }
        }
      })
    },

    scrollTop () {
      window.scrollTo(0, 0)
    },

    getYoutubeID
  }
}
</script>

<style>
.scrollama-graphic {
  z-index: 1;
  overflow: hidden;
}
</style>

<style scoped>
.photo-step {
  height: 30vh; /* espacio vacio */
  width: auto;
}
.photo-step a {
  text-decoration: none;
  position: absolute;
  right: 1em;
  z-index: 10;
  font-size: 2em;
}

.photo-stack {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.photo-link {
  height: 100vh;
  position: absolute;
}
.photo {
  height: 100vh;
  object-fit: contain;
}
</style>
