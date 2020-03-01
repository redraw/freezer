<template>
  <header class="header">
    <div class="container">
      <g-link :to="{ name: 'home' }" class="home-link">
        <img src="../../static/logo.png" :alt="$settings.site_name" class="logo" />
      </g-link>
      <nav class="nav right">
        <g-link 
          v-for="link in siteLinks" 
          :key="link.url" 
          :to="link.url"
        >
          {{ link.name }}
        </g-link>
        <a
          :href="link.url"
          v-for="link in externalLinks"
          target="_blank"
          :key="link.url"
        >
          {{ link.name }}
        </a>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    externalLinks() {
      return this.$settings.menu.filter(item => item.url.startsWith("http"));
    },
    siteLinks() {
      return this.$settings.menu.filter(item => !item.url.startsWith("http"));
    }
  }
};
</script>

<style scoped>
.header {
  margin-bottom: 1rem;
}
.container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  z-index: 10;
}
.home-link {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  text-decoration: none;
}
.home-link h2 {
  color: lightgrey;
  padding: 1rem;
  line-height: 0rem;
}
.logo {
  height: 6rem;
}
.site-name {
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-decoration: none;
  text-transform: uppercase;
}
.nav > * {
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
  border-color: inherit;
}
</style>
