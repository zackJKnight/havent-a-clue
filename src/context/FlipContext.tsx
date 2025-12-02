import { createContext, useContext, useState, ReactNode } from "react";

type FlipContextValue = {
  flippedId: string | null;
  setFlippedId: (id: string | null) => void;
};

const FlipContext = createContext<FlipContextValue | undefined>(undefined);

export const FlipProvider = ({ children }: { children: ReactNode }) => {
  const [flippedId, setFlippedId] = useState<string | null>(null);
  return (
    <FlipContext.Provider value={{ flippedId, setFlippedId }}>
      {children}
    </FlipContext.Provider>
  );
};

export const useFlipContext = () => {
  const ctx = useContext(FlipContext);
  if (!ctx) throw new Error('useFlipContext must be used within FlipProvider');
  return ctx;
};
