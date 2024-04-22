<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <template v-if="displayedCars.length">
      <ol>
        <car-listing
          v-for="car in displayedCars"
          :key="car.id"
          data-testid="car-listing"
          :car="car"
        />
      </ol>

      <div class="mx-auto mt-8">
        <div class="flex flex-row flex-wrap">
          <p class="flex-grow text-sm">Page {{ currentPage }}</p>

          <div class="flex items-center justify-center">
            <router-link
              v-if="previousPage"
              role="link"
              :to="{ name: 'CarResults', query: { page: previousPage } }"
              class="mx-3 text-sm font-semibold text-brand-blue-1"
            >
              Previous
            </router-link>

            <router-link
              v-if="nextPage"
              role="link"
              :to="{ name: 'CarResults', query: { page: nextPage } }"
              class="mx-3 text-sm font-semibold text-brand-blue-1"
            >
              Next
            </router-link>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="mt-32 flex h-screen items-start justify-center">
        <div class="text-center">
          <font-awesome-icon
            :icon="['fas', 'face-sad-tear']"
            class="text-6xl text-gray-600 mb-4"
          />
          <h1 class="text-xl font-semibold text-gray-800">
            Sorry, we can't offer the car you are looking for
          </h1>
          <p class="text-gray-500">
            Try adjusting your search or visit us again in a later time!
          </p>
        </div>
      </div>
    </template>
  </main>
</template>

<script lang="ts" setup>
import { watch, computed } from "vue";
import { useRoute } from "vue-router";

import CarListing from "@/components/CarResults/CarListing.vue";
import { useCarsStore } from "@/stores/cars";

import usePreviousAndNextPages from "@/composables/usePreviousAndNextPages";

const carsStore = useCarsStore();

const isFetched: Boolean = computed(() => carsStore.IS_FETCHED);
const FILTERED_CARS = computed(() => carsStore.FILTERED_CARS);

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

const route = useRoute();
const currentPage = computed(() =>
  Number.parseInt((route.query.page as string) || "1"),
);
const maxPage = computed(() => Math.ceil(FILTERED_CARS.value.length / 10));

const { previousPage, nextPage } = usePreviousAndNextPages(
  currentPage,
  maxPage,
);

const displayedCars = computed(() => {
  const pageNumber = currentPage.value;
  const firstCarIndex = (pageNumber - 1) * 10;
  const lastCarIndex = pageNumber * 10;
  return FILTERED_CARS.value.slice(firstCarIndex, lastCarIndex);
});
</script>
