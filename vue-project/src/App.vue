<template>
  <div class="page-wrapper">
    <main class="content">
      <!-- Main content -->
      <!-- <TopicPage /> -->
       <CityPage />
    </main>
    <footer class="footer">
      <!-- Footer content -->
      This is the footer.
    </footer>
  </div>
</template>

<script>
import TopicPage from './components/TopicPage.vue';
import CityPage from './components/CityPage.vue';

export default {
  components: {
    TopicPage,
    CityPage
  }
};
</script>

<style scoped>
html, body {
  height: 100%;
  width: 100%;
  margin: 0;
}

.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: white;
}

.content {
  flex: 1;
  /* Optional content styling */
}

.footer {
  background-color: #3b3939;
  color: rgb(111, 111, 111);
  padding: 10px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  /* Ensures footer content is centered */
}
</style>
