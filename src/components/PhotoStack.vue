<template>
  <Scrollama 
    @step-enter="stepEnter"
    :offset="1"
  >
    <div
      v-for="(photo, key) in photos"
      :key="key"
      class="photo-step"
    />
    <div slot="graphic">
      <div class="photo-stack">
        <img 
          v-for="(photo, key) in photos" 
          :key="key" 
          :src="photo"
          v-show="key <= index"
          :style="{
            transform: `translate(${shifts[key].x}%, ${shifts[key].y}%)`
          }"
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
      shifts: []
    }
  },
  
  created () {
    this.shifts = [...Array(this.photos.length).keys()].map(index => {
      if (index === 0) {
        return { x: 0, y: 0 }
      }
      return {
        x: Math.random() * 120 - 60,
        y: Math.random() * 10 - 5
      }
    })
  },

  methods: {
    stepEnter ({element, index, direction}) {
      this.index = index
    }
  },
}
</script>

<style scoped>
.photo-stack {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
.photo-step {
  height: 40vh; /* espacio vacio */
  pointer-events: none;
}
.photo-step:first-child {
  height: 0;
}
.photo {
  position: absolute; 
  max-height: 90vh;
}
</style>