<template>
  <car-filters-sidebar-checkbox-group
    :unique-values="UNIQUE_CONDITIONS"
    :action="userStore.ADD_SELECTED_CONDITIONS"
  />
</template>

<script lang="ts" setup>
import { computed } from "vue";

import CarFiltersSidebarCheckboxGroup from "@/components/CarResults/CarFiltersSidebar/CarFiltersSidebarCheckboxGroup.vue";

import { useCarsStore } from "@/stores/cars";
import { useCarUserStore } from "@/stores/user";

const CarsStore = useCarsStore();
const UNIQUE_CONDITIONS = computed(() => CarsStore.UNIQUE_CONDITIONS);

const userStore = useCarUserStore();
</script>
