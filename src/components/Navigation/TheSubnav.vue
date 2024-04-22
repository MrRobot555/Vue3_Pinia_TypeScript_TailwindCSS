<template>
  <div class="h-16 w-full border-b border-solid border-brand-gray-1 bg-white">
    <div class="flex h-full items-center px-8">
      <div v-if="onCarResultsPage">
        <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
        <span
          ><span class="text-brand-green-1">{{ FILTERED_CARS.length }}</span>
          cars matched</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

import { useCarsStore } from "@/stores/cars";

const route = useRoute();
const onCarResultsPage = computed(() => {
  return route.name === "CarResults";
});

const carsStore = useCarsStore();
const FILTERED_CARS = computed(() => carsStore.FILTERED_CARS);
</script>
