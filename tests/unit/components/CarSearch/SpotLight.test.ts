import type { Mock } from "vitest";
import { render, screen } from "@testing-library/vue";
import axios from "axios";
import SpotLight from "@/components/CarSearch/SpotLight.vue";
import { createPinia, setActivePinia } from "pinia";

vi.mock("axios");
const axiosGetMock = axios.get as Mock;

describe("SpotLight", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  const mockSpotlightsResponse = (spotlight = {}) => {
    axiosGetMock.mockResolvedValue({
      data: [{ ids: 1 }],
    });
  };

  it("provides image to parent component", async () => {
    const spotlight = {};
    mockSpotlightsResponse(spotlight);

    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
          <h1>{{ slotProps.img }}</h1>
        </template>`,
      },
    });

    const text = await screen.findByText(
      "https://media.istockphoto.com/id/1335247217/vector/loading-icon-vector-illustration.jpg?s=612x612&w=0&k=20&c=jARr4Alv-d5U3bCa8eixuX2593e1rDiiWnvJLgHCkQM=",
    );
    expect(text).toBeInTheDocument();
  });

  it("provides title to parent component", async () => {
    const spotlight = {};
    mockSpotlightsResponse(spotlight);

    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
          <h1>{{ slotProps.title }}</h1>
        </template>`,
      },
    });

    const text = await screen.findByText("Loading title");
    expect(text).toBeInTheDocument();
  });

  it("provides price to parent component", async () => {
    const spotlight = { description: "Another description" };
    mockSpotlightsResponse(spotlight);

    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
          <h1>{{ slotProps.price }}</h1>
        </template>`,
      },
    });

    const text = await screen.findByText("1000");
    expect(text).toBeInTheDocument();
  });
});
