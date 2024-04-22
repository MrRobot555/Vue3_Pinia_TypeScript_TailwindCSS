import type { Mock } from "vitest";
import { render, screen } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";

import { useRoute } from "vue-router";
vi.mock("vue-router");

import TheSubnav from "@/components/Navigation/TheSubnav.vue";
import { useCarsStore } from "@/stores/cars";

const useRouteMock = useRoute as Mock;

describe("TheSubnav", () => {
  const renderTheSubnav = () => {
    const pinia = createTestingPinia();
    const carsStore = useCarsStore();

    render(TheSubnav, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    return { carsStore };
  };

  describe("when user is on cars page", () => {
    it("displays car count", async () => {
      useRouteMock.mockReturnValue({ name: "CarResults" });

      const { carsStore } = renderTheSubnav();
      const numberOfCars = 16;
      // @ts-expect-error: Getter is read only
      carsStore.FILTERED_CARS = Array(numberOfCars).fill({});

      const carCount = await screen.findByText(numberOfCars);
      expect(carCount).toBeInTheDocument();
    });
  });

  describe("when user is not on cars page", () => {
    it("does NOT display car count", () => {
      useRouteMock.mockReturnValue({ name: "Home" });

      const { carsStore } = renderTheSubnav();
      const numberOfCars = 16;
      // @ts-expect-error: Getter is read only
      carsStore.FILTERED_CARS = Array(numberOfCars).fill({});

      const carCount = screen.queryByText(numberOfCars);
      expect(carCount).not.toBeInTheDocument();
    });
  });
});
