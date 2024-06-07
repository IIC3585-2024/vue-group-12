import { createRouter, createMemoryHistory } from "vue-router";
import HomeView from './views/HomeView.vue'
import CitiesView from './views/CitiesView.vue'
import AboutView from './views/AboutView.vue'


const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/about",
    name: "about",
    component: AboutView
  },
  {
    path: "/cities",
    name: "cities",
    component: CitiesView
  }
];


const router = createRouter({
  history: createMemoryHistory(),
  routes: routes
})

export default router
