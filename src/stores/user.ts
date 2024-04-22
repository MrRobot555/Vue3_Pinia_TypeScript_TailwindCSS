import { ref } from "vue";
import { defineStore } from "pinia";

export const ADD_SELECTED_BRANDS = "ADD_SELECTED_BRANDS";
export const ADD_SELECTED_EXTRAS = "ADD_SELECTED_EXTRAS";
export const ADD_SELECTED_CONDITIONS = "ADD_SELECTED_CONDITIONS";
export const ADD_SELECTED_PRICE = "ADD_SELECTED_PRICE";
export const ADD_SELECTED_ENGINES = "ADD_SELECTED_ENGINES";
export const CLEAR_USER_CAR_FILTER_SELECTIONS =
  "CLEAR_USER_CAR_FILTER_SELECTIONS";

export const useCarUserStore = defineStore("carUser", () => {
  const isLoggedIn = ref(false);
  const selectedBrands = ref<string[]>([]);
  const selectedExtras = ref<string[]>([]);
  const selectedPrice = ref<number[]>([-Infinity, Infinity]);
  const selectedConditions = ref<string[]>([]);
  const selectedEngines = ref<string[]>([]);
  const brandsSearchTerm = ref("");

  const LOGIN_USER = () => {
    isLoggedIn.value = true;
  };

  const ADD_SELECTED_BRANDS = (brands: string[]) => {
    selectedBrands.value = brands;
  };

  const ADD_SELECTED_EXTRAS = (extras: string[]) => {
    selectedExtras.value = extras;
  };

  const ADD_SELECTED_PRICE = (price: number[]) => {
    selectedPrice.value = price;
  };

  const ADD_SELECTED_CONDITIONS = (conditions: string[]) => {
    selectedConditions.value = conditions;
  };

  const ADD_SELECTED_ENGINES = (engines: string[]) => {
    selectedEngines.value = engines;
  };

  const UPDATE_BRANDS_SEARCH_TERM = (term: string) => {
    brandsSearchTerm.value = term;
  };

  const CLEAR_USER_CAR_FILTER_SELECTIONS = () => {
    selectedBrands.value = [];
    selectedExtras.value = [];
    selectedPrice.value = [-Infinity, Infinity];
    selectedConditions.value = [];
    selectedEngines.value = [];
    brandsSearchTerm.value = "";
  };

  return {
    isLoggedIn,
    selectedBrands,
    selectedExtras,
    selectedPrice,
    selectedConditions,
    selectedEngines,
    brandsSearchTerm,
    LOGIN_USER,
    ADD_SELECTED_BRANDS,
    ADD_SELECTED_EXTRAS,
    ADD_SELECTED_CONDITIONS,
    ADD_SELECTED_PRICE,
    ADD_SELECTED_ENGINES,
    UPDATE_BRANDS_SEARCH_TERM,
    CLEAR_USER_CAR_FILTER_SELECTIONS,
  };
});
