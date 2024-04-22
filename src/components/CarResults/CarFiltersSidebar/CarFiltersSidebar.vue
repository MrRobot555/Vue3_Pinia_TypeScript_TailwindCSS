<template>
  <div
    class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4"
  >
    <section class="pb-5 w-80">
      <Car-filters-sidebar-prompt />

      <Car-filters-sidebar-skills />

      <collapsible-accordion header="Extras">
        <Car-filters-sidebar-degrees />
      </collapsible-accordion>

      <collapsible-accordion header="Brands">
        <Car-filters-sidebar-organizations />
      </collapsible-accordion>

      <collapsible-accordion header="Condition">
        <Car-filters-sidebar-Car-types />
      </collapsible-accordion>

      <collapsible-accordion header="Price">
        <Car-filters-sidebar-price />
      </collapsible-accordion>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";

import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";
import CarFiltersSidebarDegrees from "@/components/CarResults/CarFiltersSidebar/CarFiltersSidebarDegrees.vue";
import CarFiltersSidebarCarTypes from "@/components/CarResults/CarFiltersSidebar/CarFiltersSidebarCarTypes.vue";
import CarFiltersSidebarPrice from "@/components/CarResults/CarFiltersSidebar/CarFiltersSidebarPrice.vue";
import CarFiltersSidebarOrganizations from "@/components/CarResults/CarFiltersSidebar/CarFiltersSidebarOrganizations.vue";
import CarFiltersSidebarPrompt from "@/components/CarResults/CarFiltersSidebar/CarFiltersSidebarPrompt.vue";
import CarFiltersSidebarSkills from "@/components/CarResults/CarFiltersSidebar/CarFiltersSidebarSkills.vue";

import { useCarUserStore } from "@/stores/user";
const userStore = useCarUserStore();

const route = useRoute();

const parseBrandSearchTerm = () => {
  const brand = (route.query.brand as string) || "";
  userStore.UPDATE_BRANDS_SEARCH_TERM(brand);
};

onMounted(parseBrandSearchTerm);
</script>
