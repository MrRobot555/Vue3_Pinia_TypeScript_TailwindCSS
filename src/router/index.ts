import { createRouter, createWebHashHistory } from "vue-router";
import { useCarUserStore } from "@/stores/user";

import HomeView from "@/views/HomeView.vue";
import CarResultsView from "@/views/CarResultsView.vue";
import CarView from "@/views/CarView.vue";
import TeamsView from "@/views/CareerView.vue";

import LifeView from "@/views/LifeView.vue";
import FinancingView from "@/views/FinancingView.vue";
import DealersView from "@/views/DealersView.vue";
import NotLoggedIn from "@/views/NotLoggedIn.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/notlogged",
    name: "Not Logged In",
    component: NotLoggedIn,
  },
  {
    path: "/career",
    name: "Career",
    component: TeamsView,
    meta: { requiresAuth: true },
  },
  {
    path: "/life",
    name: "Life at Wheel Deal",
    component: LifeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/financing",
    name: "Financing",
    component: FinancingView,
    meta: { requiresAuth: true },
  },
  {
    path: "/dealers",
    name: "Dealers",
    component: DealersView,
    meta: { requiresAuth: true },
  },
  {
    path: "/cars/results",
    name: "CarResults",
    component: CarResultsView,
  },
  {
    path: "/cars/results/:id",
    name: "CarListing",
    component: CarView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, left: 0, behavior: "smooth" };
  },
});

router.beforeEach((to, from, next) => {
  const carUserStore = useCarUserStore(); // Accessing the Pinia store
  if (
    to.matched.some((record) => record.meta?.requiresAuth) &&
    !carUserStore.isLoggedIn
  ) {
    next({ name: "Not Logged In" });
  } else {
    next();
  }
});

export default router;
