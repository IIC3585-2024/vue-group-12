<template>
  <div id="app">
    <div>
      <SlideShow />
    </div>
    <FooterHome />
  </div>
</template>

<script>
import FooterHome from './components/FooterHome.vue'
import SlideShow from './components/SlideShow.vue'


export default {
  name: 'App',
  components: {
    FooterHome,
    SlideShow
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

header {
  background-color: #42b983;
  color: white;
  padding: 20px;
}

main {
  margin: 20px;
}

footer {
  background-color: #35495e;
  color: white;
  padding: 10px;
  position: fixed;
  width: 100%;
  bottom: 0;
}
</style>
