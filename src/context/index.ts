import { createContext } from "react";

export type FeatureContextType = {
  isTelegramShareEnabled: boolean;
};

export const FeatureContext = createContext<FeatureContextType>({
  isTelegramShareEnabled: false,
});
