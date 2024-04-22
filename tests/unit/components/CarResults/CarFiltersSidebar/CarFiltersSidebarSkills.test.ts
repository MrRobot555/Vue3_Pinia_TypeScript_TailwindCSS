import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";

import { useCarUserStore } from "@/stores/user";

import CarFiltersSidebarSkills from "@/components/CarResults/CarFiltersSidebar/CarFiltersSidebarSkills.vue";

describe("CarFiltersSidebarSkills", () => {
  const renderCarFiltersSidebaSkills = () => {
    const pinia = createTestingPinia();
    const userStore = useCarUserStore();

    render(CarFiltersSidebarSkills, {
      global: {
        plugins: [pinia],
      },
    });

    return { userStore };
  };

  it("populates search input from store", async () => {
    const { userStore } = renderCarFiltersSidebaSkills();
    userStore.brandsSearchTerm = "Audi";
    const input = await screen.findByRole<HTMLInputElement>("textbox");
    expect(input.value).toBe("Audi");
  });

  it("writes user input to store", async () => {
    const { userStore } = renderCarFiltersSidebaSkills();
    userStore.brandsSearchTerm = "";
    const input = screen.getByRole<HTMLInputElement>("textbox");
    await userEvent.type(input, "V");
    await userEvent.click(document.body);

    expect(userStore.UPDATE_BRANDS_SEARCH_TERM).toHaveBeenCalledWith("V");
  });

  it("removes whitespace from user input", async () => {
    const { userStore } = renderCarFiltersSidebaSkills();
    userStore.brandsSearchTerm = "";
    const input = screen.getByRole<HTMLInputElement>("textbox");
    await userEvent.type(input, "   Audi   ");
    await userEvent.click(document.body);

    expect(userStore.UPDATE_BRANDS_SEARCH_TERM).toHaveBeenCalledWith("Audi");
  });
});
