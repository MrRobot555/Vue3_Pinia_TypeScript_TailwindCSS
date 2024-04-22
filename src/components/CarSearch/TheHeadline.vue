<template>
  <section class="mb-16">
    <h1 class="mb-14 text-8xl font-bold tracking-tighter">
      <span :class="actionClasses">{{ action }}</span>
      <br />
      now!
    </h1>
    <h2 class="text-3xl font-light">Find your dream car at Wheel Deal!</h2>
  </section>
</template>

<script lang="ts" setup>
import { computed, onMounted, onBeforeUnmount, ref } from "vue";

import nextElementInList from "@/utils/nextElementInList";

const action = ref("Purchase");
const interval = ref<ReturnType<typeof setInterval>>();

const actionClasses = computed(() => {
  return {
    [action.value.toLowerCase()]: true,
  };
});

const changeTitle = () => {
  interval.value = setInterval(() => {
    const actions = ["Purchase", "Rent", "Lease", "Enjoy"];
    action.value = nextElementInList(actions, action.value);
  }, 3000);
};
onMounted(changeTitle);
onBeforeUnmount(() => clearInterval(interval.value));
</script>

<style scoped>
.purchase {
  color: #1a73e8;
}

.rent {
  color: #34a853;
}

.lease {
  color: #f9ab00;
}

.enjoy {
  color: #d93025;
}
</style>
