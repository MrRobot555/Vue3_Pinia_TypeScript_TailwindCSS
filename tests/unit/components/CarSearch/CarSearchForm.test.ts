import type { Mock } from "vitest";
import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import { useRouter } from "vue-router";
vi.mock("vue-router");

import CarSearchForm from "@/components/CarSearch/CarSearchForm.vue";

const useRouterMock = useRouter as Mock;

describe("CarSearchForm", () => {
  describe("when user submits form", () => {
    it("directs user to car results page with user's search parameters", async () => {
      const push = vi.fn();
      useRouterMock.mockReturnValue({ push });

      render(CarSearchForm, {
        global: {
          stubs: {
            FontAwesomeIcon: true,
          },
        },
      });

      const brandInput = screen.getByRole("textbox");
      await userEvent.type(brandInput, "Audi");

      const submitButton = screen.getByRole("button", {
        name: /search/i,
      });
      await userEvent.click(submitButton);

      expect(push).toHaveBeenCalledWith({
        name: "CarResults",
        query: { brand: "Audi" },
      });
    });
  });
});
