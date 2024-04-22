<template>
  <ul v-if="spotlightCars">
    <li v-for="spotlight in spotlightCars" :key="spotlight">
      <slot
        :img="
          spotlight
            ? spotlight.image ||
              'https://media.istockphoto.com/id/1335247217/vector/loading-icon-vector-illustration.jpg?s=612x612&w=0&k=20&c=jARr4Alv-d5U3bCa8eixuX2593e1rDiiWnvJLgHCkQM='
            : 'https://media.istockphoto.com/id/1335247217/vector/loading-icon-vector-illustration.jpg?s=612x612&w=0&k=20&c=jARr4Alv-d5U3bCa8eixuX2593e1rDiiWnvJLgHCkQM='
        "
        :title="
          spotlight ? `${spotlight.brand} ${spotlight.model}` : 'Loading title'
        "
        :price="spotlight ? spotlight.price : 1000"
        :link="spotlight ? `/cars/results/${spotlight.id}` : `/cars/results/1`"
      ></slot>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { watch, computed } from "vue";
import { useCarsStore } from "@/stores/cars";

const carsStore = useCarsStore();
const isFetched: Boolean = computed(() => carsStore.IS_FETCHED);
const isSpotlightFetched: Boolean = computed(
  () => carsStore.IS_SPOTLIGHT_FETCHED,
);

watch(
  isFetched,
  (newValue) => {
    if (newValue === false) {
      carsStore.FETCH_CARS();
    }
  },
  {
    immediate: true,
  },
);

watch(
  isSpotlightFetched,
  (newValue) => {
    if (newValue === false) {
      carsStore.FETCH_SPOTLIGHTS();
    }
  },
  {
    immediate: true,
  },
);

const SPOTLIGHTS = computed(() => carsStore.SPOTLIGHTS);
const ALL_CARS = computed(() => carsStore.ALL_CARS);

const ALL_CARS_MAP = computed(() =>
  ALL_CARS.value
    ? new Map(ALL_CARS.value.map((car) => [car.id, car]))
    : undefined,
);

const spotlightCars = computed(() =>
  ALL_CARS_MAP.value && SPOTLIGHTS.value
    ? SPOTLIGHTS.value.map((spotlight) => ALL_CARS_MAP.value.get(spotlight.ids))
    : undefined,
);
</script>
