import type { Mock } from "vitest";
import { nextTick } from "vue";
import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { useRoute } from "vue-router";
import { createCar } from "../../../utils/createCar";
vi.mock("vue-router");

import CarListings from "@/components/CarResults/CarListings.vue";
import { useCarsStore } from "@/stores/cars";

const useRouteMock = useRoute as Mock;

describe("CarListings", () => {
  const renderCarListings = () => {
    const pinia = createTestingPinia();
    const carsStore = useCarsStore();
    // @ts-expect-error
    carsStore.FILTERED_CARS = Array(30)
      .fill(null)
      .map(() => createCar({ brand: "Audi" }));

    render(CarListings, {
      global: {
        plugins: [pinia],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    return { carsStore };
  };

  it("fetches cars", () => {
    useRouteMock.mockReturnValue({ query: {} });

    const { carsStore } = renderCarListings();

    expect(carsStore.FETCH_CARS).toHaveBeenCalled();
  });

  it("displays maximum of 10 cars", async () => {
    useRouteMock.mockReturnValue({ query: { page: "1" } });

    const { carsStore } = renderCarListings();
    // @ts-expect-error
    carsStore.FILTERED_CARS = Array(10)
      .fill(null)
      .map(() => createCar({ brand: "Audi" }));

    const carListings = await screen.findAllByTestId("car-listing");
    expect(carListings).toHaveLength(10);
  });

  describe("when params exclude page number", () => {
    it("displays page number 1", async () => {
      useRouteMock.mockReturnValue({ query: {} });

      renderCarListings();
      await nextTick();

      expect(screen.getByText("Page 1")).toBeInTheDocument();
    });
  });

  describe("when params include page number", () => {
    it("displays page number", async () => {
      useRouteMock.mockReturnValue({ query: { page: "3" } });
      renderCarListings();
      await nextTick();
      expect(screen.getByText("Page 3")).toBeInTheDocument();
    });
  });

  describe("when user is on first page", () => {
    it("does not show link to previous page", async () => {
      useRouteMock.mockReturnValue({ query: { page: "1" } });

      const { carsStore } = renderCarListings();
      // @ts-expect-error
      carsStore.FILTERED_CARS = Array(15).fill({});

      await screen.findAllByRole("listitem");
      const previousLink = screen.queryByRole("link", { name: /previous/i });
      expect(previousLink).not.toBeInTheDocument();
    });

    it("shows link to next page", async () => {
      useRouteMock.mockReturnValue({ query: { page: "1" } });

      const { carsStore } = renderCarListings();
      // @ts-expect-error
      carsStore.FILTERED_CARS = Array(15).fill({});

      render(CarListings);

      const nextLinkXPath = document.evaluate(
        "//a[contains(text(), 'Next')]",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null,
      );

      const nextLink = nextLinkXPath.singleNodeValue;

      // Assert that the element exists
      expect(nextLink).toBeDefined();
    });
  });

  describe("when user is on last page", () => {
    it("shows link to previous page", async () => {
      useRouteMock.mockReturnValue({ query: { page: "2" } });

      const { carsStore } = renderCarListings();
      // @ts-expect-error
      carsStore.FILTERED_CARS = Array(15).fill({});

      render(CarListings);

      const previousLinkXPath = document.evaluate(
        "//a[contains(text(), 'Previous')]",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null,
      );

      const previousLink = previousLinkXPath.singleNodeValue;

      // Assert that the element exists
      expect(previousLink).toBeDefined();
    });
  });
});
