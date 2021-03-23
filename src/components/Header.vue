<template>
  <header>
    <div class="header container">
      <div class="menu">
        <g-link v-if="$route.path.startsWith('/bazar')" to="/bazar" class="home-link">
          <img src="../../static/logo-bazar.png" :alt="$settings.site_name" width="65" class="logo" />
        </g-link>
        <g-link v-else :to="{ name: 'home' }" class="home-link">
          <img src="../../static/logo2x.png" :alt="$settings.site_name" width="65" class="logo" />
        </g-link>
        <a class="menu-icon" href="#" @click.prevent="toggleMenu">&#9776;</a>
      </div>
      <nav class="nav right" :class="{'nav-expand': collapse}">
        <g-link
          v-for="link in $settings.menu"
          :key="link.url"
          :to="link.url"
          @click="collapse = false"
        >
          {{ link.name }}
        </g-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  data () {
    return {
      collapse: false
    }
  },

  methods: {
    toggleMenu () {
      this.collapse = !this.collapse
    }
  }
}
</script>

<style scoped>
.menu {
  padding: 1em;
}
.home-link {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  text-decoration: none;
  position: relative;
  top: 0;
}
.home-link h2 {
  color: lightgrey;
  padding: 1rem;
  line-height: 0rem;
}
.site-name {
  display: none;
}
.menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.menu-icon {
  font-weight: bold;
  text-decoration: none;
  padding: 1em;
  font-size: x-large;
}
.nav {
  display: none;
  flex-flow: column;
  background: var(--color-contrast);
  color: var(--color-base);
  text-transform: lowercase;
}
.nav a {
  color: var(--color-contrast);
}
.nav > * {
  padding: 1em;
  text-align: center;
  text-decoration: none;
}
.nav-expand {
  display: flex;
  height: auto;
  margin-bottom: 1px;
}
@media screen and (min-width: 720px) {
  .header {
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;
  }
  .menu-icon {
    display: none;
  }
  .nav {
    display: flex;
    flex-flow: row;
    background: inherit;
    color: inherit;
    max-height: 100%;
  }
  .nav > * {
    padding: 0;
    font-size: 0.9rem;
    font-weight: 600;
    text-decoration: none;
    margin: 1rem;
    padding-bottom: 4px;
    border-bottom: 1px solid;
    border-color: transparent;
    transition: border 0.15s;
  }
  .nav > *:hover {
    border-color: inherit;
  }
  .nav > .active--exact {
    border-color: inherit !important;
  }
  .nav > .active {
    border-color: inherit;
  }
}
</style>
