import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Investor } from "../types";
import { seedInvestors } from "../data/seedInvestors";

interface InvestorContextValue {
  investors: Investor[];
}

const InvestorContext = createContext<InvestorContextValue | null>(null);

export function InvestorProvider({ children }: { children: ReactNode }) {
  const [investors] = useState<Investor[]>(seedInvestors);

  return (
    <InvestorContext.Provider value={{ investors }}>
      {children}
    </InvestorContext.Provider>
  );
}

export function useInvestors() {
  const ctx = useContext(InvestorContext);
  if (!ctx) throw new Error("useInvestors must be used within InvestorProvider");
  return ctx;
}
