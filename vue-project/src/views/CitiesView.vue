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
          <button type="submit" class="ml-3 p-3 bg-blue-800 rounded-full">
            <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve" width="512px" height="512px">
              <path fill="white" d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
            </svg>
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
          <button class="ml-3 p-3 bg-green-800 rounded-full" @click="addCity">
            Agregar
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
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
  </style>
  