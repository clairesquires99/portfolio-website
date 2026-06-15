import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export type AnimationPhase = 0 | 1 | 2 | 3;

interface AnimationPhaseContextValue {
  phase: AnimationPhase;
  setPhase: Dispatch<SetStateAction<AnimationPhase>>;
}

const AnimationPhaseContext = createContext<AnimationPhaseContextValue | null>(
  null,
);

export function AnimationPhaseProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<AnimationPhase>(0);

  return (
    <AnimationPhaseContext.Provider value={{ phase, setPhase }}>
      {children}
    </AnimationPhaseContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAnimationPhase() {
  const ctx = useContext(AnimationPhaseContext);
  if (!ctx) {
    throw new Error(
      "useAnimationPhase must be used within an AnimationPhaseProvider",
    );
  }
  return ctx;
}
