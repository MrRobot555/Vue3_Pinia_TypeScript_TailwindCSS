import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";

import type { Car } from "@/api/types";
import CarListing from "@/components/CarResults/CarListing.vue";

import { createCar } from "../../../utils/createCar";

describe("CarListing", () => {
  const renderCarListing = (car: Car) => {
    render(CarListing, {
      global: {
        stubs: {
          "router-link": RouterLinkStub,
        },
      },
      props: {
        car: {
          ...car,
        },
      },
    });
  };

  it("renders car brand", () => {
    const carProps = createCar({ brand: "Audi" });
    renderCarListing(carProps);
    expect(screen.getByText(/Audi/i)).toBeInTheDocument();
  });

  it("renders car model", () => {
    const carProps = createCar({ model: "Aventador" });
    renderCarListing(carProps);
    expect(screen.getByText(/Aventador/i)).toBeInTheDocument();
  });

  it("renders car price", () => {
    const carProps = createCar({ price: 24123 });
    renderCarListing(carProps);
    expect(screen.getByText("24,123 USD")).toBeInTheDocument();
  });

  it("renders car extras", () => {
    const carProps = createCar({
      extras: ["GPS navigation system", "Ambient interior lighting"],
    });
    renderCarListing(carProps);
    expect(screen.getByText("GPS navigation system")).toBeInTheDocument();
    expect(screen.getByText("Ambient interior lighting")).toBeInTheDocument();
  });

  it("renders car price", () => {
    const carProps = createCar({ condition: "new" });
    renderCarListing(carProps);
    expect(screen.getByText("Condition: new")).toBeInTheDocument();
  });

  it("renders car qualifications", () => {
    const carProps = createCar({
      description: [
        "This car is designed to deliver a superior driving experience",
        "featuring a responsive engine and advanced handling capabilities",
      ],
    });
    renderCarListing(carProps);
    expect(
      screen.getByText(
        "This car is designed to deliver a superior driving experience",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "featuring a responsive engine and advanced handling capabilities",
      ),
    ).toBeInTheDocument();
  });
});
