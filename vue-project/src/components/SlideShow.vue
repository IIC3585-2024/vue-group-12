<template>
  <div class="slideshow" :style="{ backgroundImage: 'url(' + images[currentImage] + ')' }" @click="redirectToCities">
    <div class="overlay"></div>
  </div>
</template>

<script>
export default {
  name: 'SlideShow',
  data() {
    return {
      images: [
        'src/assets/images/puerto_varas.jpg',
        'src/assets/images/rapanui.jpg',
        'src/assets/images/santiago.jpg',
        'src/assets/images/valparaiso.jpg'
      ],
      currentImage: 0
    }
  },
  mounted() {
    this.startSlideshow();
  },
  methods: {
    startSlideshow() {
      setInterval(() => {
        this.currentImage = (this.currentImage + 1) % this.images.length;
      }, 10000);
    },
    redirectToCities() {
      this.$router.push('/cities');
    }
  }
}
</script>

<style scoped>
.slideshow {
  position: fixed; /* Asegura que ocupe toda la pantalla */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  transition: background-image 1s ease-in-out;
  z-index: -1; /* Asegura que esté detrás de otros elementos */
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Ajusta la opacidad según sea necesario */
}
</style>
