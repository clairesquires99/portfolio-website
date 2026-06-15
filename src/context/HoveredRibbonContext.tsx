import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export type HoveredRibbon = "engineering" | "design" | "people" | null;

interface HoveredRibbonContextValue {
  hoveredRibbon: HoveredRibbon;
  setHoveredRibbon: Dispatch<SetStateAction<HoveredRibbon>>;
}

const HoveredRibbonContext = createContext<HoveredRibbonContextValue | null>(
  null,
);

export function HoveredRibbonProvider({ children }: { children: ReactNode }) {
  const [hoveredRibbon, setHoveredRibbon] = useState<HoveredRibbon>(null);

  return (
    <HoveredRibbonContext.Provider value={{ hoveredRibbon, setHoveredRibbon }}>
      {children}
    </HoveredRibbonContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useHoveredRibbon() {
  const ctx = useContext(HoveredRibbonContext);
  if (!ctx) {
    throw new Error(
      "useHoveredRibbon must be used within a HoveredRibbonProvider",
    );
  }
  return ctx;
}
