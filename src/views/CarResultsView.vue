<template>
  <div class="flex w-full flex-row flex-nowrap">
    <car-filters-sidebar />
    <car-listings />
  </div>
</template>

<script lang="ts" setup>
import CarFiltersSidebar from "@/components/CarResults/CarFiltersSidebar/CarFiltersSidebar.vue";
import CarListings from "@/components/CarResults/CarListings.vue";
</script>
