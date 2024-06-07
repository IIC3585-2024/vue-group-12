<template>
  <div class="page-wrapper">
    <main class="content">
      <!-- Main content -->
      <TopicPage />
    </main>
    <footer class="footer">
      <!-- Footer content -->
      This is the footer.
    </footer>
  </div>
</template>

<script>
import TopicPage from './components/TopicPage.vue';

export default {
  components: {
    TopicPage
  }
};
</script>

<style scoped>
html, body {
  height: 100%;
  width: 100%;
  margin: 0;
}

#app {
  height: 100%;
  width: 100%;
}
.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* Ensures page takes up full height of the viewport */

  width: 100%;
  background-color: #f9f9f9;
}

header {
  /* Optional header styling */
}

.content {
  flex: 1 0 auto;
  /* Optional content styling */
}

.footer {
  flex: 1 0 auto;
  background-color: #f1f1f1;
  /* padding: 10px; */
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* Ensures footer content is centered */
}
</style>