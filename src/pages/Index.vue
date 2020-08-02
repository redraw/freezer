<template>
  <div class="home-layout">
    <div ref="menu" class="menu">
      <g-link
        v-for="link in $settings.menu"
        :key="link.url"
        :to="link.url"
        :title="link.url"
        :style="{
          'font-size': `${Math.floor(100 / $settings.menu.length) * 0.5}vh`,
          'line-height': '1.5'
        }"
      >
        {{ link.name }}
      </g-link>
    </div>
    <div class="logo">
      <g-image
        class="flicker-in-1"
        src="/logo.png"
        :alt="$settings.site_name"
      />
    </div>
  </div>
</template>

<style scoped>
.home-layout {
  display: flex;
  flex-flow: column-reverse;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 100%;
  padding: 5em;
  flex-grow: 1;
  text-align: center;
}

.menu {
  display: flex;
  flex-flow: column;
  height: 100%;
  padding: 1em;
}
.menu a {
  text-decoration: none;
  text-transform: lowercase;
}
.menu a:hover {
  text-decoration: underline;
}
/* .menu a:nth-child(odd) {
  text-align: right;
} */

@media screen and (min-width: 720px) {
  .home-layout {
    display: flex;
    flex-flow: row;
  }
  .menu {
    padding: 5em;
  }
}

.flicker-in-1{-webkit-animation:flicker-in-1 2s linear both;animation:flicker-in-1 2s linear both}
@-webkit-keyframes flicker-in-1{0%{opacity:0}10%{opacity:0}10.1%{opacity:1}10.2%{opacity:0}20%{opacity:0}20.1%{opacity:1}20.6%{opacity:0}30%{opacity:0}30.1%{opacity:1}30.5%{opacity:1}30.6%{opacity:0}45%{opacity:0}45.1%{opacity:1}50%{opacity:1}55%{opacity:1}55.1%{opacity:0}57%{opacity:0}57.1%{opacity:1}60%{opacity:1}60.1%{opacity:0}65%{opacity:0}65.1%{opacity:1}75%{opacity:1}75.1%{opacity:0}77%{opacity:0}77.1%{opacity:1}85%{opacity:1}85.1%{opacity:0}86%{opacity:0}86.1%{opacity:1}100%{opacity:1}}@keyframes flicker-in-1{0%{opacity:0}10%{opacity:0}10.1%{opacity:1}10.2%{opacity:0}20%{opacity:0}20.1%{opacity:1}20.6%{opacity:0}30%{opacity:0}30.1%{opacity:1}30.5%{opacity:1}30.6%{opacity:0}45%{opacity:0}45.1%{opacity:1}50%{opacity:1}55%{opacity:1}55.1%{opacity:0}57%{opacity:0}57.1%{opacity:1}60%{opacity:1}60.1%{opacity:0}65%{opacity:0}65.1%{opacity:1}75%{opacity:1}75.1%{opacity:0}77%{opacity:0}77.1%{opacity:1}85%{opacity:1}85.1%{opacity:0}86%{opacity:0}86.1%{opacity:1}100%{opacity:1}}
</style>
