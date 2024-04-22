import { defineStore } from "pinia";

import getCars from "@/api/getCars";
import getSpotlights from "@/api/getSpotlights";

import { useCarUserStore } from "@/stores/user";

import type { Car, Spotlight } from "@/api/types";

export const FETCH_CARS = "FETCH_CARS";
export const FETCH_SPOTLIGHTS = "FETCH_SPOTLIGHTS";
export const SPOTLIGHTS = "SPOTLIGHTS";
export const UNIQUE_BRANDS = "UNIQUE_BRANDS";
export const UNIQUE_MODELS = "UNIQUE_MODELS";
export const UNIQUE_EXTRAS = "UNIQUE_EXTRAS";
export const UNIQUE_PRICE_RANGE = "UNIQUE_PRICE_RANGE";
export const UNIQUE_CONDITIONS = "UNIQUE_CONDITIONS";
export const FILTERED_CARS = "FILTERED_CARS";
export const ALL_CARS = "ALL_CARS";
export const IS_FETCHED = "IS_FETCHED";
export const IS_SPOTLIGHT_FETCHED = "IS_SPOTLIGHT_FETCHED";

export const INCLUDE_CAR_BY_BRAND = "INCLUDE_CAR_BY_BRAND";
export const INCLUDE_CAR_BY_EXTRAS = "INCLUDE_CAR_BY_EXTRAS";
export const INCLUDE_CAR_BY_PRICE = "INCLUDE_CAR_BY_PRICE";
export const INCLUDE_CAR_BY_CONDITION = "INCLUDE_CAR_BY_CONDITION";
export const INCLUDE_CAR_BY_ENGINE = "INCLUDE_CAR_BY_ENGINE";
export const INCLUDE_CAR_BY_BRAND_SEARCH = "INCLUDE_CAR_BY_BRAND_SEARCH";

export interface CarsState {
  cars: Car[];
  spotlights: Spotlight[];
  isFetched: Boolean;
  isSpotlightFetched: Boolean;
}
export const useCarsStore = defineStore("cars", {
  state: (): CarsState => ({
    cars: [],
    spotlights: [],
    isFetched: false,
    isSpotlightFetched: false,
  }),
  actions: {
    async [FETCH_CARS]() {
      const cars = await getCars();
      this.cars = cars;
      this.isFetched = true;
    },
    async [FETCH_SPOTLIGHTS]() {
      const spotlights = await getSpotlights();
      this.spotlights = spotlights;
      this.isSpotlightFetched = true;
    },
  },
  getters: {
    [IS_FETCHED](state) {
      return state.isFetched;
    },
    [IS_SPOTLIGHT_FETCHED](state) {
      return state.isSpotlightFetched;
    },
    [UNIQUE_BRANDS](state) {
      const uniqueBrands = new Set<string>();
      state.cars.forEach((car) => uniqueBrands.add(car.brand));
      return uniqueBrands;
    },
    [UNIQUE_MODELS](state) {
      const uniqueModels = new Set<string>();
      state.cars.forEach((car) => uniqueModels.add(car.model));
      return uniqueModels;
    },
    [UNIQUE_EXTRAS](state) {
      const uniqueExtras = new Set<string>();
      state.cars.forEach((car: Car) => {
        car.extras.forEach((extra: string) => {
          uniqueExtras.add(extra);
        });
      });
      return uniqueExtras;
    },
    [UNIQUE_CONDITIONS](state) {
      const uniqueConditions = new Set<string>();
      state.cars.forEach((car: Car) => uniqueConditions.add(car.condition));
      return uniqueConditions;
    },
    [UNIQUE_PRICE_RANGE](state) {
      const prices = state.cars.map((car: Car) => car.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      return new Set<number>([minPrice, maxPrice]);
    },
    [INCLUDE_CAR_BY_BRAND]: () => (car: Car) => {
      const userCarStore = useCarUserStore();
      if (userCarStore.selectedBrands.length === 0) return true;
      return userCarStore.selectedBrands.includes(car.brand);
    },
    [INCLUDE_CAR_BY_EXTRAS]: () => (car: Car) => {
      const userCarStore = useCarUserStore();
      if (userCarStore.selectedExtras.length === 0) return true;
      return userCarStore.selectedExtras.every((extra) =>
        car.extras.includes(extra),
      );
    },
    [INCLUDE_CAR_BY_CONDITION]: () => (car: Car) => {
      const userCarStore = useCarUserStore();
      if (userCarStore.selectedConditions.length === 0) return true;
      return userCarStore.selectedConditions.includes(car.condition);
    },
    [INCLUDE_CAR_BY_PRICE]: () => (car: Car) => {
      const userCarStore = useCarUserStore();
      return (
        car.price >= userCarStore.selectedPrice[0] &&
        car.price <= userCarStore.selectedPrice[1]
      );
    },
    [INCLUDE_CAR_BY_ENGINE]: () => (car: Car) => {
      const userCarStore = useCarUserStore();
      if (userCarStore.selectedEngines.length === 0) return true;
      return userCarStore.selectedEngines.includes(car.engine);
    },
    [INCLUDE_CAR_BY_BRAND_SEARCH]: () => (car: Car) => {
      const userCarStore = useCarUserStore();
      return car.brand
        .toLowerCase()
        .includes(userCarStore.brandsSearchTerm.toLowerCase());
    },
    [FILTERED_CARS](state): Car[] {
      return state.cars
        .filter((car) => this.INCLUDE_CAR_BY_BRAND(car))
        .filter((car) => this.INCLUDE_CAR_BY_EXTRAS(car))
        .filter((car) => this.INCLUDE_CAR_BY_CONDITION(car))
        .filter((car) => this.INCLUDE_CAR_BY_PRICE(car))
        .filter((car) => this.INCLUDE_CAR_BY_ENGINE(car))
        .filter((car) => this.INCLUDE_CAR_BY_BRAND_SEARCH(car));
    },
    [ALL_CARS](state): Car[] {
      return state.cars;
    },
    [SPOTLIGHTS](state): Spotlight[] {
      return state.spotlights;
    },
  },
});
