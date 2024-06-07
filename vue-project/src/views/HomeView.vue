<template>
  <div>
    <SlideShow />
    <main>
      <h1>Welcome to Chile</h1>
      <p>Discover the best cities in Chile</p>
      <router-link to="/cities" class="btn btn-primary">View Cities</router-link>
    </main>
    <FooterHome />
  </div>
</template>

<script>
import FooterHome from '../components/FooterHome.vue'
import SlideShow from '../components/SlideShow.vue'

export default {
  name: 'HomeView',
  components: {
    FooterHome,
    SlideShow
  }
}
</script>
