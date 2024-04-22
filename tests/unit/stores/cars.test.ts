import type { Mock } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import axios from "axios";

import { useCarsStore } from "@/stores/cars";
import { useCarUserStore } from "@/stores/user";
import { createCar } from "../../utils/createCar";

vi.mock("axios");
const axiosGetMock = axios.get as Mock;

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("stores car listings", () => {
    const store = useCarsStore();
    expect(store.cars).toEqual([]);
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("FETCH_CARS", () => {
    it("makes API request and stores received cars", async () => {
      axiosGetMock.mockResolvedValue({ data: ["Car 1", "Car 2"] });
      const carsStore = useCarsStore();
      await carsStore.FETCH_CARS();
      expect(carsStore.cars).toEqual(["Car 1", "Car 2"]);
    });
  });
});

describe("getters", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("UNIQUE_BRANDS", () => {
    it("finds unique brands from list of cars", () => {
      const carsStore = useCarsStore();
      carsStore.cars = [
        createCar({ brand: "Audi" }),
        createCar({ brand: "BMW" }),
        createCar({ brand: "Audi" }),
      ];

      const result = carsStore.UNIQUE_BRANDS;

      expect(result).toEqual(new Set(["Audi", "BMW"]));
    });
  });

  describe("UNIQUE_MODELS", () => {
    it("finds unique car types from list of cars", () => {
      const carsStore = useCarsStore();
      carsStore.cars = [
        createCar({ model: "Golf" }),
        createCar({ model: "Tiguan" }),
        createCar({ model: "Golf" }),
      ];

      const result = carsStore.UNIQUE_MODELS;

      expect(result).toEqual(new Set(["Golf", "Tiguan"]));
    });
  });

  describe("INCLUDE_CAR_BY_BRAND", () => {
    describe("when the user has not selected any brand", () => {
      it("includes car", () => {
        const userStore = useCarUserStore();
        userStore.selectedBrands = [];
        const carsStore = useCarsStore();
        const car = createCar({ brand: "Audi" });

        const result = carsStore.INCLUDE_CAR_BY_BRAND(car);

        expect(result).toBe(true);
      });
    });

    it("identifies if car is associated with given brand", () => {
      const userStore = useCarUserStore();
      userStore.selectedBrands = ["Audi", "BMW"];
      const carsStore = useCarsStore();
      const car = createCar({ brand: "Audi" });

      const result = carsStore.INCLUDE_CAR_BY_BRAND(car);

      expect(result).toBe(true);
    });
  });

  // This function is not developed, as its complexity is unjustified in a demo
  //
  // describe("INCLUDE_CAR_BY_MODEL", () => {
  //   describe("when the user has not selected any car model", () => {
  //     it("includes car", () => {
  //       const userStore = useCarUserStore();
  //       userStore.selectedModels = [];
  //       const store = useCarsStore();
  //       const car = createCar({ model: "Golf" });

  //       const result = store.INCLUDE_CAR_BY_MODEL(car);

  //       expect(result).toBe(true);
  //     });
  //   });

  //   it("identifies if car is associated with given car types", () => {
  //     const userStore = useCarUserStore();
  //     userStore.selectedModels = ["Passat", "Golf"];
  //     const store = useCarsStore();
  //     const car = createCar({ model: "Passat" });

  //     const result = store.INCLUDE_CAR_BY_MODEL(car);

  //     expect(result).toBe(true);
  //   });
  // });

  describe("INCLUDE_CAR_BY_EXTRAS", () => {
    describe("when the user has not selected any extras", () => {
      it("includes car", () => {
        const userStore = useCarUserStore();
        userStore.selectedExtras = [];
        const carsStore = useCarsStore();
        const car = createCar();

        const result = carsStore.INCLUDE_CAR_BY_EXTRAS(car);

        expect(result).toBe(true);
      });
    });

    it("identifies if car is associated with given extras", () => {
      const userStore = useCarUserStore();
      userStore.selectedExtras = ["GPS navigation system"];
      const carsStore = useCarsStore();
      const car = createCar({ extras: ["GPS navigation system"] });

      const result = carsStore.INCLUDE_CAR_BY_EXTRAS(car);

      expect(result).toBe(true);
    });
  });

  describe("INCLUDE_CAR_BY_PRICE", () => {
    it("identifies if car matches selected price range", () => {
      const userStore = useCarUserStore();
      userStore.selectedPrice = [50000, 100000];
      const carsStore = useCarsStore();
      const car = createCar({ price: 60000 });

      const result = carsStore.INCLUDE_CAR_BY_PRICE(car);

      expect(result).toBe(true);
    });

    describe("when the user has not entered any price", () => {
      it("includes car", () => {
        const userStore = useCarUserStore();
        userStore.selectedPrice = [-Infinity, Infinity]; //default setting
        const carsStore = useCarsStore();
        const car = createCar({ price: 53200 });

        const result = carsStore.INCLUDE_CAR_BY_PRICE(car);

        expect(result).toBe(true);
      });
    });
  });
});
