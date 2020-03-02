<template>
  <header class="header">
    <div class="container">
      <g-link :to="{ name: 'home' }" class="home-link">
        <img src="../../static/logo.png" :alt="$settings.site_name" class="logo" />
        <h2>freezer</h2>
      </g-link>
      <nav class="nav right">
        <g-link 
          v-for="link in $settings.menu" 
          :key="link.url" 
          :to="link.url"
        >
          {{ link.name }}
        </g-link>
      </nav>
    </div>
  </header>
</template>

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
  position: sticky;
  top: 0;
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
@media screen and (min-width: 720px) {
  .container {
    justify-content: space-between;
  }
}
</style>
