<template>
  <div class="mt-2">
    <input
      v-model.lazy.trim="brandsSearchTerm"
      type="text"
      class="h-12 w-full rounded border border-solid border-brand-gray-1 p-3 text-base bg-transparent"
      placeholder="Audi, BMW..."
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import { useCarUserStore } from "@/stores/user";

const userStore = useCarUserStore();

const brandsSearchTerm = computed({
  get() {
    return userStore.brandsSearchTerm;
  },
  set(value: string) {
    userStore.UPDATE_BRANDS_SEARCH_TERM(value);
  },
});
</script>
