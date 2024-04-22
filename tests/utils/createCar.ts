import type { Car } from "@/api/types";

export const createCar = (Car: Partial<Car> = {}): Car => ({
  id: 1,
  brand: "Volkswagen",
  model: "Tiguan",
  image:
    "https://hips.hearstapps.com/hmg-prod/amv-prod-cad-assets/images/media/672264/2018-volkswagen-tiguan-in-depth-model-review-car-and-driver-photo-703424-s-original.jpg?crop=0.639xw:0.796xh;0.260xw,0.0733xh&resize=768:*",
  year_of_production: "2023",
  engine: "Natural Gas (CNG)",
  price: 24123,
  condition: "new",
  description: [
    "This car is designed to deliver a superior driving experience, featuring a responsive engine and advanced handling capabilities. The interior boasts high-quality materials and innovative technology, making every journey enjoyable. It's a testament to craftsmanship and automotive excellence.",
    "Designed with the driver in mind, this vehicle combines functionality with elegance. It offers ample interior space, state-of-the-art technology, and a comfortable ride for both short and long distances. The car's efficient performance and eco-friendly options reflect a commitment to innovation and sustainability.",
  ],
  extras: [
    "GPS navigation system",
    "Ambient interior lighting",
    "Dual exhaust",
    "Cross-traffic alert",
  ],
  dateAdded: "2022-09-15",
  ...Car,
});
