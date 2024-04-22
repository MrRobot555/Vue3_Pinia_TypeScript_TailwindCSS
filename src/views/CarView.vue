<template>
  <div
    class="mx-auto block rounded border border-solid border-brand-gray-2 bg-white hover:shadow-gray"
  >
    <div class="pt-8 px-8 flex justify-start items-center">
      <div class="max-w-1/2 overflow-hidden rounded-3xl">
        <img :src="selectedCar.image" class="h-96 object-cover w-full block" />
      </div>
      <div
        class="mx-8 pl-3 border-l border-solid border-brand-gray-3 pb-2 pt-5"
      >
        <h2 class="mb-2 text-2xl">
          {{ selectedCar.brand }}
          {{ selectedCar.model }}
        </h2>

        <div class="flex flex-row align-middle">
          <div class="mr-5">
            <span>{{
              `${new Intl.NumberFormat("en-US").format(
                selectedCar.price,
              )} ${"USD"}`
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="px-8 py-4">
      <div>
        <ul>
          <li
            v-for="extra in selectedCar.extras"
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
        <h3 class="mb-2 mt-3 text-lg">
          Condition: {{ selectedCar.condition }}
        </h3>
      </div>

      <div>
        <h3 class="mb-2 mt-3 text-lg">Description:</h3>
        <div>
          <ul class="list-disc pl-8 flex-wrap">
            <li
              v-for="description in selectedCar.description"
              :key="description"
              class="max-w-96 mt-3"
            >
              {{ description }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useCarsStore } from "@/stores/cars";
const carsStore = useCarsStore();

const isFetched: Boolean = computed(() => carsStore.IS_FETCHED);

const currentCarId = computed(() => route.params.id);
const route = useRoute();

const ALL_CARS = computed(() => carsStore.ALL_CARS);

const selectedCar = ref({
  image:
    "https://media.istockphoto.com/id/1335247217/vector/loading-icon-vector-illustration.jpg?s=612x612&w=0&k=20&c=jARr4Alv-d5U3bCa8eixuX2593e1rDiiWnvJLgHCkQM=",
  brand: "Loading",
  model: "",
  extras: ["Loading"],
  condition: "Loading",
  description: ["Loading"],
  price: 0,
});

watch(
  isFetched,
  (newValue) => {
    if (newValue === false) {
      carsStore.FETCH_CARS();
    } else if (newValue === true) {
      selectedCar.value = ALL_CARS.value.find(
        (car) => car.id == currentCarId.value,
      );
    }
  },
  {
    immediate: true,
  },
);

watch([ALL_CARS, currentCarId], ([new_ALL_CARS], [new_currentCarId]) => {
  if ((new_ALL_CARS || new_currentCarId) && isFetched.value) {
    if (ALL_CARS.value && currentCarId.value) {
      selectedCar.value = ALL_CARS.value.find(
        (car) => car.id == currentCarId.value,
      );
    }
  }
});

// const selectedCar = computed(
//   (): Car =>
//     currentCarId.value && ALL_CARS.value
//       ? ALL_CARS.value.find((car): Car => car.id === currentCarId.value)
//       : undefined,
// );
</script>
