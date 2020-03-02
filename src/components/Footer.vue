<template>
  <footer class="footer">
    <div class="container">
      <span v-html="$settings.footer" />
    </div>
  </footer>
</template>

<style scoped>
.footer {
  font-size: 0.8rem;
  padding: 1rem 2rem;
  margin-top: 5em;
  color: #aaa;
  background-color: #111;
}
</style>
