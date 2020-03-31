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
        v-for="(imagen, key) in imagenes" 
        v-show="key <= index"
        :key="key"  
        :href="imagen.autor.url"
        :style="styles[key]"
        class="photo-link"
      >
        <img
          v-lazy="getImageUrl(imagen.path)"
          v-tippy="{
            followCursor: true,
            popperOptions: {
              positionFixed: true
            }
          }"
          :content="imagen.autor.nombre"
          :ref="`img-${key}`"
          class="photo"
        />
      </g-link>
    </div>
    <div
      v-for="(imagen, key) in imagenes"
      :key="key"
      class="photo-step"
    />
  </Scrollama>
</template>

<script>
import "intersection-observer"
import Scrollama from 'vue-scrollama'

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

      if (index < this.imagenes.length) {
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
      this.styles = [...Array(this.imagenes.length).keys()].map(index => {
        if (index > 0) {
          return {
            transform: `
              translateX(${this.random(-20, 20)}vw)
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
  text-align: right;
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
