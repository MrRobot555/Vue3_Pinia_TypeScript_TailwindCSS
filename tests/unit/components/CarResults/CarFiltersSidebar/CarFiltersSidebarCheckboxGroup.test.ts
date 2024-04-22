import type { Mock } from "vitest";
import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";
import { useRouter } from "vue-router";
vi.mock("vue-router");

import CarFiltersSidebarCheckboxGroup from "@/components/CarResults/CarFiltersSidebar/CarFiltersSidebarCheckboxGroup.vue";
import { useCarUserStore } from "@/stores/user";

const useRouterMock = useRouter as Mock;

describe("CarFiltersSidebarCheckboxGroup", () => {
  interface CarFiltersSidebarCheckboxGroupProps {
    uniqueValues: Set<string>;
    action: Mock;
  }

  const createProps = (
    props: Partial<CarFiltersSidebarCheckboxGroupProps> = {},
  ): CarFiltersSidebarCheckboxGroupProps => ({
    uniqueValues: new Set(["ValueA", "ValueB"]),
    action: vi.fn(),
    ...props,
  });

  const renderCarFiltersSidebarCheckboxGroup = (
    props: CarFiltersSidebarCheckboxGroupProps,
  ) => {
    const pinia = createTestingPinia({ stubActions: false });
    const userStore = useCarUserStore();

    render(CarFiltersSidebarCheckboxGroup, {
      props: {
        ...props,
      },
      global: {
        plugins: [pinia],
      },
    });

    return { userStore };
  };

  it("renders unique list of values", () => {
    const props = createProps({
      uniqueValues: new Set(["new", "used"]),
    });
    renderCarFiltersSidebarCheckboxGroup(props);

    const carTypesListItems = screen.getAllByRole("listitem");
    const carTypes = carTypesListItems.map((node) => node.textContent);
    expect(carTypes).toEqual(["new", "used"]);
  });

  describe("when user clicks checkbox", () => {
    it("communicates that user has selected checkbox for value", async () => {
      useRouterMock.mockReturnValue({ push: vi.fn() });
      const action = vi.fn();
      const props = createProps({
        uniqueValues: new Set(["new", "used"]),
        action,
      });
      renderCarFiltersSidebarCheckboxGroup(props);

      const fullTimeCheckbox = screen.getByRole("checkbox", {
        name: /new/i,
      });
      await userEvent.click(fullTimeCheckbox);

      expect(action).toHaveBeenCalledWith(["new"]);
    });

    it("navigates user to car results page to see fresh batch of filtered cars", async () => {
      const push = vi.fn();
      useRouterMock.mockReturnValue({ push });
      const props = createProps({
        uniqueValues: new Set(["new"]),
      });
      renderCarFiltersSidebarCheckboxGroup(props);

      const fullTimeCheckbox = screen.getByRole("checkbox", {
        name: /new/i,
      });
      await userEvent.click(fullTimeCheckbox);

      expect(push).toHaveBeenCalledWith({ name: "CarResults" });
    });
  });

  describe("when user clears car filters", () => {
    it("unchecks any checked checkboxes", async () => {
      useRouterMock.mockReturnValue({ push: vi.fn() });
      const props = createProps({
        uniqueValues: new Set(["new"]),
      });
      const { userStore } = renderCarFiltersSidebarCheckboxGroup(props);

      const fullTimeCheckboxBeforeAction = screen.getByRole<HTMLInputElement>(
        "checkbox",
        {
          name: /new/i,
        },
      );
      await userEvent.click(fullTimeCheckboxBeforeAction);

      expect(fullTimeCheckboxBeforeAction.checked).toBe(true);

      userStore.CLEAR_USER_CAR_FILTER_SELECTIONS();

      const fullTimeCheckboxAfterAction =
        await screen.findByRole<HTMLInputElement>("checkbox", {
          name: /new/i,
        });
      expect(fullTimeCheckboxAfterAction.checked).toBe(false);
    });
  });
});
