import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import { useCarUserStore } from "@/stores/user";

import CarFiltersSidebarPrompt from "@/components/CarResults/CarFiltersSidebar/CarFiltersSidebarPrompt.vue";

describe("CarFiltersSidebarPrompt", () => {
  describe("when user clicks Clear Filters button", () => {
    it("sends message to clear all of user's car search filters", async () => {
      const pinia = createTestingPinia();
      const userStore = useCarUserStore();

      render(CarFiltersSidebarPrompt, {
        global: {
          plugins: [pinia],
        },
      });

      const button = screen.getByRole("button", { name: /clear filters/i });
      await userEvent.click(button);

      expect(userStore.CLEAR_USER_CAR_FILTER_SELECTIONS).toHaveBeenCalled();
    });
  });
});
