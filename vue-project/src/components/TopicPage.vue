<template>
    <div class="topics-container">
      <div class="topics-description">
        <div class="horizontal-line" v-if="showLine"></div>
        <div class="topics-title" v-if="showTitle">
          <h1>Explora nuestro contenido</h1>
          <p>estos son los principales temas de interés</p>
        </div>
        <div class="horizontal-line" v-if="showLine"></div>
      </div>
      <div class="grid">
        <a v-for="(image, i) in images" :key="i" href="/cities">
          <div
            role="button"
            tabindex="0"
            class="relative rounded overflow-hidden shadow-lg"
            :class="[{ 'opacity-50': isHovered[i] }, { 'opacity-100': !isHovered[i] }]"
            @mouseenter="setHovered(i, true)"
            @focus="setHovered(i, true)"
            @mouseleave="setHovered(i, false)"
            @blur="setHovered(i, false)"
            style="max-width: 12em; max-height: 13em"
          >
            <img class="w-full h-full transition-all duration-500" :src="image.src" :alt="image.alt">
            <div
              class="absolute inset-0 flex items-center justify-center transition-all duration-500"
              :class="{ 'opacity-100': isHovered[i], 'opacity-0': !isHovered[i] }"
            >
              <p class="text-white text-sm bg-black p-4">{{ image.category }}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  
  export default {
    name: 'TopicPage',
    setup() {
      const images = ref([
        { src: 'https://picsum.photos/200/300', alt: 'Sunset in the mountains', category: 'Foro' },
        { src: 'https://picsum.photos/200/301', alt: 'Sunset in the mountains', category: 'Ciudades' },
        { src: 'https://picsum.photos/200/302', alt: 'Sunset in the mountains', category: 'Your title here' },
        { src: 'https://picsum.photos/200/303', alt: 'Sunset in the mountains', category: 'Your title here' },
        { src: 'https://picsum.photos/200/304', alt: 'Sunset in the mountains', category: 'Your title here' },
        { src: 'https://picsum.photos/200/305', alt: 'Sunset in the mountains', category: 'Your title here' }
      ]);
  
      const isHovered = ref(Array(images.value.length).fill(false));
      const setHovered = (index, value) => {
        isHovered.value[index] = value;
      };
  
      const showLine = ref(false);
      const showTitle = ref(false);
  
      onMounted(() => {
        setTimeout(() => {
          showLine.value = true;
          showTitle.value = true;
        }, 1000);
      });
  
      return {
        images,
        isHovered,
        setHovered,
        showLine,
        showTitle
      };
    }
  };
  </script>
  
  <style scoped>
  .topics-description {
    display: flex;
    align-items: center;
    padding: 30px 0;
    width: 100%;
  }
  .topics-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    padding: 20px;
    width: 100%;
    color: gray;
  }
  .topics-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap:40px;
    padding: 80px;
    margin-bottom: 5%;
  }
  </style>
  