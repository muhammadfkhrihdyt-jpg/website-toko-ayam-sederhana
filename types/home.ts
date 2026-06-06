import type { ComponentType, SVGProps } from "react";

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type Category = {
  name: string;
  description: string;
  icon: IconComponent;
};

export type PriceTier = {
  oneToFourKg: string;
  aboveFiveKg: string;
  aboveTwentyFiveKg: string;
};

export type Product = {
  name: string;
  category: string;
  description: string;
  image: string;
  badge: string;
  prices: PriceTier;
};

export type PriceListItem = {
  product: string;
  prices: PriceTier;
};

export type Benefit = {
  title: string;
  description: string;
  icon: IconComponent;
};
