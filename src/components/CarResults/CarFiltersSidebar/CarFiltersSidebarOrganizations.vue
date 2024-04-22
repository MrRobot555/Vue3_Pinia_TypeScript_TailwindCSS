<template>
  <car-filters-sidebar-checkbox-group
    :unique-values="UNIQUE_BRANDS"
    :action="userStore.ADD_SELECTED_BRANDS"
  />
</template>

<script lang="ts" setup>
import { computed } from "vue";

import CarFiltersSidebarCheckboxGroup from "@/components/CarResults/CarFiltersSidebar/CarFiltersSidebarCheckboxGroup.vue";

import { useCarsStore } from "@/stores/cars";
import { useCarUserStore } from "@/stores/user";

const carsStore = useCarsStore();
const UNIQUE_BRANDS = computed(() => carsStore.UNIQUE_BRANDS);

const userStore = useCarUserStore();
</script>
