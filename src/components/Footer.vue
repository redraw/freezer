<template>
  <footer class="footer">
    <div class="container" v-if="$settings.footer">
      {{ $settings.footer }}
    </div>
  </footer>
</template>

<style scoped>
.footer {
  display: none;
}

@media screen and (min-width: 720px) {
  .footer {
    display: block;
    margin-top: 5em;
    padding: 1rem 2rem;
  }
  .footer-grey {
    font-size: 0.8rem;
    color: #aaa;
    background-color: #111;
  }
}
</style>
