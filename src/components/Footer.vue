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
  padding: 2rem 2rem;
}
</style>
