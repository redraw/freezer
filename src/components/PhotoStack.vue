<template>
  <Scrollama 
    @step-enter="stepEnter"
    @step-progress="stepProgress"
    :progress="1"
    :offset="1"
  >
    <div
      v-for="(photo, key) in photos"
      :key="key"
      class="photo-step"
    />
    <div slot="graphic">
      <div
        class="photo-stack" 
        ref="stack"
        :style="{
          'background-color': `rgba(0, 0, 0, ${background.opacity})`
        }"
      >
        <a
          v-for="(photo, key) in photos" 
          :key="key"  
          :href="getLink(photo.src)"
          class="photo-link"
        >
          <g-image 
            :src="photo.src"
            v-show="key <= index"
            :style="styles[key]"
            class="photo"
          />
        </a>
      </div>
    </div>
  </Scrollama>
</template>

<script>
import Scrollama from 'vue-scrollama'
const URI = require('urijs')

export default {
  components: {
    Scrollama
  },

  props: {
    photos: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      index: 0,
      styles: [],
      background: {
        opacity: 0
      }
    }
  },

  methods: {
    stepEnter ({element, index, direction}) {
      this.index = index
      if (index === 0) {
        this.shift()
      }
    },

    stepProgress({index, progress}) {
      if (index === 1) {
        this.background.opacity = progress
      }
    },

    random (min = 0, max = 1) {
      return Math.random() * (max - min) + min
    },

    shift () {
      this.styles = [...Array(this.photos.length).keys()].map(index => {
        const el = this.$refs.stack.children[index]
        const ratio = el.width / el.height
        
        if (index > 0) {
          return {
            transform: `
              translateX(${this.random(-25, 25)}vw)
              scale(${this.random(0.5, 1)})
            `
          }
        }
      })
    },

    getLink (src) {
      const filename = URI(src).filename()
      const link = `https://instagram.com/${filename.split('.')[0]}`
      return link
    }
  }
}
</script>

<style scoped>
.photo-stack {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
.photo-step {
  height: 20vh; /* espacio vacio */
}
.photo-step:first-child {
  height: 0;
}
.photo-link {
  height: 100vh;
}
.photo {
  height: 100vh;
  position: absolute;
  object-fit: cover;
}
</style>