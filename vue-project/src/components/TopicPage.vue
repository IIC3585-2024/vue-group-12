<template>
    <div class="topics-container">
      <div class="topics-description">
        <div class="horizontal-line"></div>
        <div class="topics-title">
          <h1>Explora nuestro contenido</h1>
          <p>Estos son los principales temas de interés</p>
        </div>
        <div class="horizontal-line"></div>
      </div>
      <div class="grid">
        <div v-for="(image, i) in images" :key="i" class="grid-item">
          <a href="/cities">
            <div
              role="button"
              tabindex="0"
              class="relative rounded overflow-hidden shadow-lg"
              :class="{'opacity: 0': isHovered[i], 'opacity: 1': !isHovered[i]}"
              @mouseenter="hoverIn(i)"
              @focus="hoverIn(i)"
              @mouseleave="hoverOut(i)"
              @blur="hoverOut(i)"
            >
              <img style="max-width: fit-content; max-height: 200px;" :src="image.src" >
            <p style="color: black; text-align: center;">{{ image.category }}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const images = ref([
        { src: 'https://picsum.photos/200/300', category: 'Foro' },
        { src: 'https://picsum.photos/200/301', category: 'Ciudades' },
        { src: 'https://picsum.photos/200/302', category: 'Your title here' },
        { src: 'https://picsum.photos/200/303', category: 'Your title here' },
        { src: 'https://picsum.photos/200/304', category: 'Your title here' },
        { src: 'https://picsum.photos/200/305', category: 'Your title here' }
      ]);
  
      const isHovered = ref(Array(images.value.length).fill(false));
  
      const hoverIn = (index) => {
        console.log('hoverIn', index);
        isHovered.value[index] = true;
      };
  
      const hoverOut = (index) => {
        isHovered.value[index] = false;
      };
  
      return {
        images,
        isHovered,
        hoverIn,
        hoverOut
      };
    }
  };
  </script>
  
  <style scoped>
  .topics-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }
  
  .topics-description {
    display: flex;
    align-items: center;
    padding: 30px 0;
    width: 60%;
    color: #000;
  }
  
  .topics-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    padding: 20px;
    width: 100%;
    color: #000;
  }
  
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 40px;
    padding: 40px;
    margin-bottom: 5%;
    width: 800px;
    max-height: 800px;
  }
  
  /* .grid-item {
    max-width: 12em;
    max-height: 13em;
  } */
  
  .relative {
    width: 100%;
    height: 100%;
  }
  
  .relative img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.5s;
  }
  
  .absolute {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s;
    opacity: 0;
  }
  
  .relative:hover .absolute,
  .relative:focus .absolute {
    opacity: 1;
  }
  </style>
  