<template>
  <div>
    <Car-filters-sidebar-checkbox-group
      :unique-values="UNIQUE_EXTRAS"
      :action="userStore.ADD_SELECTED_EXTRAS"
      :one-column="true"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import CarFiltersSidebarCheckboxGroup from "@/components/CarResults/CarFiltersSidebar/CarFiltersSidebarCheckboxGroup.vue";

import { useCarsStore } from "@/stores/cars";
import { useCarUserStore } from "@/stores/user";

const carsStore = useCarsStore();
const UNIQUE_EXTRAS = computed(() => carsStore.UNIQUE_EXTRAS);

const userStore = useCarUserStore();
</script>
