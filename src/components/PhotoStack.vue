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
        <g-image 
          v-for="(photo, key) in photos" 
          :key="key" 
          :src="photo.src"
          v-show="key <= index"
          :style="styles[key]"
          class="photo"
        />
      </div>
    </div>
  </Scrollama>
</template>

<script>
import 'intersection-observer' // for cross-browser support
import Scrollama from 'vue-scrollama'

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
    }
  }
}
</script>

<style scoped>
.photo-stack {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  overflow-x: none;
}
.photo-step {
  height: 20vh; /* espacio vacio */
}
.photo-step:first-child {
  height: 0;
}
img {
  position: absolute; 
  height: 100%;
  max-height: 100vh;
  object-fit: cover;
}
</style>