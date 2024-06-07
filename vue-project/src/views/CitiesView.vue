<template>
    <div class="main-div">
      <video :class="{ dim: isFocused }" id="video" autoplay muted loop>
        <source src="https://videos.pexels.com/video-files/8820216/8820216-hd_1280_720_25fps.mp4" type="video/mp4" />
      </video>
      <div id="search-bar">
        <form class="flex text-gray-600" @submit.prevent="handleSubmit">
          <input 
            v-model="searchValue"
            type="search"
            name="search"
            placeholder="Busca una ciudad..."
            class="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
            @focus="isFocused = true"
            @blur="isFocused = false"
          >
          <button type="submit" class="ml-3 p-2 bg-blue-500 text-white rounded">
            Buscar
          </button>
        </form>
        <ul class="list-group">
          <li v-for="option in filteredOptions" :key="option.id">
            <button class="list-group-item" @click="selectOption(option.name)">{{ option.name }}</button>
          </li>
        </ul>
        <div class="add-city">
          <input 
            v-model="newCity"
            type="text"
            placeholder="Agregar nueva ciudad"
            class="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
          >
          <button class="ml-3 p-3 bg-green-800 rounded-full text-white" @click="addCity">
            Agregar
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'CitySearch',
    setup() {
      const isFocused = ref(false);
      const searchValue = ref('');
      const newCity = ref('');
      const options = ref([]);
      const router = useRouter();
  
      const fetchCities = async () => {
        try {
          const response = await fetch('http://52.2.71.125:8000/cities/');
          if (!response.ok) {
            throw new Error('Failed to fetch city data');
          }
          const cityData = await response.json();
          if (Array.isArray(cityData)) {
            options.value = cityData;
          } else {
            throw new Error('City data is not an array');
          }
        } catch (error) {
          console.error(error);
        }
      };
  
      onMounted(async () => {
        await fetchCities();
      });
  
      const handleSubmit = () => {
        const city = options.value.find(city => city.name.toLowerCase() === searchValue.value.toLowerCase());
        if (city) {
          router.push(`/cities/${city.id}`);
        }
      };
  
      const matchesSearchValue = (option) => {
        const regex = new RegExp(searchValue.value, 'ig');
        return regex.test(option.name);
      };
  
      const filteredOptions = computed(() =>
        options.value.filter(option => matchesSearchValue(option) && searchValue.value !== option.name && searchValue.value !== '')
      );
  
      const selectOption = (name) => {
        searchValue.value = name;
      };
  
      const addCity = async () => {
        if (newCity.value) {
          try {
            const response = await fetch('http://52.2.71.125:8000/cities/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                name: newCity.value,
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Cerro_Renca%2C_Santiago.jpg/275px-Cerro_Renca%2C_Santiago.jpg'
              })
            });
  
            if (!response.ok) {
              throw new Error('Failed to add city');
            }
  
            const addedCity = await response.json();
            options.value.push(addedCity);
            newCity.value = ''; // Limpiar la variable después de agregar la ciudad
          } catch (error) {
            console.error(error);
          }
        }
      };
  
      return {
        isFocused,
        searchValue,
        newCity,
        options,
        handleSubmit,
        filteredOptions,
        selectOption,
        addCity
      };
    }
  };
  </script>
  
  <style scoped>
  .main-div {
    height: 100vh;
    background-color: black;
    z-index: -1;
  }
  #video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
  }
  #search-bar {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
  .list-group {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 10px;
    background-color: rgb(238, 238, 238);
    border-radius: 10px;
    z-index: 2;
  }
  .list-group-item {
    padding: 10px;
    cursor: pointer;
  }
  .dim {
    opacity: 0.5;
  }
  .add-city {
    display: flex;
    margin-top: 20px;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  </style>
  