<template>
  <div class="mt-5">
    <fieldset>
      <Slider
        v-model="rangeValue"
        class="mt-7 pl-7 pr-4"
        :min="reactiveRange[0]"
        :max="reactiveRange[1]"
        :format="{ suffix: ' USD', thousand: ',' }"
        :step="10"
      />
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, toRaw } from "vue";
import { useRouter } from "vue-router";
import Slider from "@vueform/slider";

import {
  useCarUserStore,
  CLEAR_USER_CAR_FILTER_SELECTIONS,
} from "@/stores/user";

const router = useRouter();

const props = defineProps({
  uniqueValues: {
    type: Set as PropType<Set<number>>,
    required: true,
  },
  action: {
    type: Function,
    required: true,
  },
});

let rangeValue = ref<number[]>(Array.from(props.uniqueValues));
const reactiveRange = computed((): number[] => Array.from(props.uniqueValues));

const userStore = useCarUserStore();

userStore.$onAction(({ after, name }) => {
  after(() => {
    if (name === CLEAR_USER_CAR_FILTER_SELECTIONS) {
      rangeValue.value = Array.from(props.uniqueValues);
    }
  });
});

watch(rangeValue, (newValue) => {
  props.action(toRaw(newValue));
  router.push({ name: "CarResults" });
});
</script>
<style src="@vueform/slider/themes/default.css"></style>
