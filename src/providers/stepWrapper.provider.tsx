import React from "react";

export const StepWrapperProviderContext = React.createContext(0);

function StepWrapperProvider({
  activeIndex,
  children,
}: {
  activeIndex: number;
  children: React.ReactNode;
}) {
  return (
    <StepWrapperProviderContext.Provider value={activeIndex}>
      {children}
    </StepWrapperProviderContext.Provider>
  );
}

export default StepWrapperProvider;
