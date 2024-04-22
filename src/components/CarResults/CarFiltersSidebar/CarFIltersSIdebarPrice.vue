<template>
  <car-filters-sidebar-price-selector
    :unique-values="UNIQUE_PRICE_RANGE"
    :action="userStore.ADD_SELECTED_PRICE"
  />
</template>

<script lang="ts" setup>
import { computed } from "vue";

import CarFiltersSidebarPriceSelector from "@/components/CarResults/CarFiltersSidebar/CarFiltersSidebarPriceSelector.vue";

import { useCarUserStore } from "@/stores/user";

import { useCarsStore } from "@/stores/cars";
const carsStore = useCarsStore();

const UNIQUE_PRICE_RANGE = computed(
  (): number[] => carsStore.UNIQUE_PRICE_RANGE,
);

const userStore = useCarUserStore();
</script>
