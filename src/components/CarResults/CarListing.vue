<template>
  <li class="mb-7">
    <router-link
      :to="CarPageLink"
      class="mx-auto block rounded border border-solid border-brand-gray-2 bg-white hover:shadow-gray"
    >
      <div class="pt-8 px-8 flex justify-start items-center">
        <div class="max-w-1/2 overflow-hidden rounded-3xl">
          <!-- This is your image container -->
          <img :src="car.image" class="h-96 object-cover w-full block" />
        </div>
        <div
          class="mx-8 pl-3 border-l border-solid border-brand-gray-3 pb-2 pt-5"
        >
          <h2 class="mb-2 text-2xl">
            {{ car.brand }}
            {{ car.model }}
          </h2>

          <div class="flex flex-row align-middle">
            <div class="mr-5">
              <span>{{
                `${new Intl.NumberFormat("en-US").format(car.price)} ${"USD"}`
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="px-8 py-4">
        <div>
          <ul>
            <li
              v-for="extra in car.extras"
              :key="extra"
              class="mr-2 mb-2 inline-block"
            >
              <span class="bg-gray-400 text-white px-3 py-1 rounded-full">{{
                extra
              }}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="mb-2 mt-3 text-lg">Condition: {{ car.condition }}</h3>
        </div>

        <div>
          <h3 class="mb-2 mt-3 text-lg">Description:</h3>
          <div>
            <ul class="list-disc pl-8 flex-wrap">
              <li
                v-for="description in car.description"
                :key="description"
                class="max-w-96 mt-3"
              >
                {{ description }}
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-2 text-center">
          <router-link :to="CarPageLink" class="text-brand-blue-1"
            >Expand</router-link
          >
        </div>
      </div>
    </router-link>
  </li>
</template>

<script lang="ts" setup>
import { computed, type PropType } from "vue";

import type { Car } from "@/api/types";

const props = defineProps({
  car: {
    type: Object as PropType<Car>,
    required: true,
  },
});

const CarPageLink = computed(() => `/Cars/results/${props.car.id}`);
</script>
