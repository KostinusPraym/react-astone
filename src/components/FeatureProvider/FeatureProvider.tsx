import { ReactNode, useMemo } from "react";

import { FeatureContext } from "../../context";
import { useGetFeatureFlagQuery } from "../../redux/rtkQuery/featureFlagApi";

type Props = {
  children: ReactNode;
};

export const FeatureProvider = ({ children }: Props) => {
  const { data } = useGetFeatureFlagQuery();
  const contextValue = useMemo(() => {
    if (data) {
      return data;
    }
    return { isTelegramShareEnabled: false };
  }, [data]);

  return (
    <FeatureContext.Provider value={contextValue}>
      {children}
    </FeatureContext.Provider>
  );
};
