<template>
  <div class="mt-5">
    <fieldset>
      <ul class="flex flex-row flex-wrap">
        <li
          v-for="value in uniqueValues"
          :key="value"
          class="h-8"
          :class="oneColumn ? 'w-full' : 'w-1/2'"
        >
          <input
            :id="value"
            v-model="selectedValues"
            :value="value"
            type="checkbox"
            class="mr-3"
            @change="selectValue"
          />
          <label :for="value">{{ value }}</label>
        </li>
      </ul>
    </fieldset>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import {
  useCarUserStore,
  CLEAR_USER_CAR_FILTER_SELECTIONS,
} from "@/stores/user";

const props = defineProps({
  uniqueValues: {
    type: [Set<string>, Array<string>],
    required: true,
  },
  oneColumn: {
    type: Boolean,
    default: false,
    required: false,
  },
  action: {
    type: Function,
    required: true,
  },
});

const selectedValues = ref<string[]>([]);
const router = useRouter();

const selectValue = () => {
  props.action(selectedValues.value);
  router.push({ name: "CarResults" });
};

const userStore = useCarUserStore();
userStore.$onAction(({ after, name }) => {
  after(() => {
    if (name === CLEAR_USER_CAR_FILTER_SELECTIONS) {
      selectedValues.value = [];
    }
  });
});
</script>
