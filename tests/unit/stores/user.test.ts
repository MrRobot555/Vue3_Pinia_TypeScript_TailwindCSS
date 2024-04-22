import { createPinia, setActivePinia } from "pinia";

import { useCarUserStore } from "@/stores/user";

describe("state", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("keeps track of if user is logged in", () => {
    const store = useCarUserStore();
    expect(store.isLoggedIn).toBe(false);
  });

  it("stores brands that the user would like to filter cars by", () => {
    const store = useCarUserStore();
    expect(store.selectedBrands).toEqual([]);
  });

  // this function is cut for its complexity is unjustified in a demo
  //
  // it("stores models that the user would like to filter cars by", () => {
  //   const store = useCarUserStore();
  //   expect(store.selectedCarModels).toEqual([]);
  // });

  it("stores extras that the user would like to filter cars by", () => {
    const store = useCarUserStore();
    expect(store.selectedExtras).toEqual([]);
  });

  it("stores minimum and maximum price range limits that the user would like to filter cars by", () => {
    const store = useCarUserStore();
    expect(store.selectedPrice).toEqual([-Infinity, Infinity]);
  });

  it("store's user's search term for brand", () => {
    const store = useCarUserStore();
    expect(store.brandsSearchTerm).toBe("");
  });
});

describe("actions", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("LOGIN_USER", () => {
    it("logs the user in", () => {
      const store = useCarUserStore();
      store.LOGIN_USER();
      expect(store.isLoggedIn).toBe(true);
    });
  });

  describe("ADD_SELECTED_BRANDS", () => {
    it("updates brands the user has chosen to filter cars by", () => {
      const store = useCarUserStore();
      store.ADD_SELECTED_BRANDS(["Audi", "BMW"]);
      expect(store.selectedBrands).toEqual(["Audi", "BMW"]);
    });
  });

  // this function is cut for its complexity is unjustified in a demo
  //
  // describe("ADD_SELECTED_MODELS", () => {
  //   it("updates models the user has chosen to filter cars by", () => {
  //     const store = useCarUserStore();
  //     store.ADD_SELECTED_MODELS(["Passat", "Golf"]);
  //     expect(store.selectedModels).toEqual(["Passat", "Golf"]);
  //   });
  // });

  describe("ADD_SELECTED_EXTRAS", () => {
    it("updates extras the user has chosen to filter cars by", () => {
      const store = useCarUserStore();
      store.ADD_SELECTED_EXTRAS([
        "GPS navigation system",
        "Ambient interior lighting",
        "Dual exhaust",
        "Cross-traffic alert",
      ]);
      expect(store.selectedExtras).toEqual([
        "GPS navigation system",
        "Ambient interior lighting",
        "Dual exhaust",
        "Cross-traffic alert",
      ]);
    });
  });

  describe("UPDATE_BRANDS_SEARCH_TERM", () => {
    it("receives search term for brand the user has entered", () => {
      const store = useCarUserStore();
      store.brandsSearchTerm = "";
      store.UPDATE_BRANDS_SEARCH_TERM("Audi");
      expect(store.brandsSearchTerm).toBe("Audi");
    });
  });

  describe("ADD_SELECTED_PRICE", () => {
    it("receives minimum and maximum price range values the user has entered", () => {
      const store = useCarUserStore();
      store.selectedPrice = [-Infinity, Infinity];
      store.ADD_SELECTED_PRICE([50000, 100000]);
      expect(store.selectedPrice).toEqual([50000, 100000]);
    });
  });

  describe("CLEAR_USER_CAR_FILTER_SELECTIONS", () => {
    it("removes all car filters that user has chosen", () => {
      const store = useCarUserStore();
      store.selectedBrands = ["Random brand"];
      store.selectedExtras = ["Random car extra"];
      store.selectedPrice = [50000, 100000];
      store.selectedConditions = ["new"];
      store.selectedEngines = ["engine1", "engine2"];
      store.brandsSearchTerm = "";

      store.CLEAR_USER_CAR_FILTER_SELECTIONS();

      expect(store.selectedBrands).toEqual([]);
      expect(store.selectedExtras).toEqual([]);
      expect(store.selectedPrice).toEqual([-Infinity, Infinity]);
      expect(store.selectedConditions).toEqual([]);
      expect(store.selectedEngines).toEqual([]);
      expect(store.brandsSearchTerm).toBe("");
    });
  });
});
