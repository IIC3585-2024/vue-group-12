import { createRouter, createMemoryHistory } from "vue-router";
import HomeView from './views/HomeView.vue';
import CitiesView from './views/CitiesView.vue';
import AboutView from './views/AboutView.vue';
import CityPage from "./components/CityPage.vue";
import EventPage from "./components/EventPage.vue";

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
  },
  {
    path: "/cities/:slug",
    name: "city",
    component: CityPage
  },
  {
    path: "/events/:slug",
    name: "event",
    component: EventPage
  }
];

const router = createRouter({
  history: createMemoryHistory(),
  routes: routes
});

export default router;
