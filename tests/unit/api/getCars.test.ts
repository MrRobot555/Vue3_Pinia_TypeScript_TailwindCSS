import type { Mock } from "vitest";
import axios from "axios";

import getCars from "@/api/getCars";

vi.mock("axios");

const axiosGetMock = axios.get as Mock;

describe("getCars", () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({
      data: [
        {
          id: 1,
          brand: "Audi",
        },
      ],
    });
  });

  it("fetches cars into the Pinia store", async () => {
    await getCars();
    expect(axios.get).toHaveBeenCalledWith("http://myfakeapi.com/cars");
  });

  it("extracts Cars from response", async () => {
    const cars = await getCars();
    expect(cars).toEqual([{ id: 1, brand: "Audi" }]);
  });
});
