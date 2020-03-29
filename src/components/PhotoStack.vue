<template>
  <Scrollama 
    @step-enter="stepEnter"
    @step-progress="stepProgress"
    :offset="1"
  >
    <div 
      slot="graphic" 
      class="photo-stack"
      :style="{
        'background-color': `rgba(0, 0, 0, ${background.opacity})`
      }"
    >
      <g-link
        v-for="(imagen, key) in imagenes" 
        v-show="key <= index"
        :key="key"  
        :href="imagen.autor.url"
        :style="styles[key]"
        class="photo-link"
      >
        <img
          v-lazy="getImageUrl(imagen.path)"
          class="photo"
        />
      </g-link>
    </div>
    <div
      v-for="(imagen, key) in imagenes"
      :key="key"
      class="photo-step"
    >
      <h3>
        <i>{{ imagen.autor.nombre }}</i>
      </h3>
    </div>
  </Scrollama>
</template>

<script>
import Scrollama from 'vue-scrollama'

export default {
  components: {
    Scrollama
  },

  props: ['data'],

  data () {
    return {
      index: 0,
      styles: [],
      background: {
        opacity: 0
      }
    }
  },

  computed: {
    imagenes () {
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
      this.styles = [...Array(this.imagenes.length).keys()].map(index => {
        // const el = this.$refs.stack.children[index]
        // const ratio = el.width / el.height
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

<style>
.scrollama-graphic {
  z-index: 1;
  overflow-x: hidden;
}
</style>

<style scoped>
.photo-step {
  height: 20vh; /* espacio vacio */
  width: auto;
  padding: 1em;
  color: lightgray;
}
/* .photo-step:first-child {
  height: 0;
} */

.photo-stack {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.photo-link {
  z-index: 999;
  height: 100vh;
  position: absolute;
}
.photo {
  height: 100vh;
  object-fit: cover;
}
</style>
