import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Partner } from "../types";
import { seedPartners } from "../data/seedPartners";

interface PartnerContextValue {
  partners: Partner[];
}

const PartnerContext = createContext<PartnerContextValue | null>(null);

export function PartnerProvider({ children }: { children: ReactNode }) {
  const [partners] = useState<Partner[]>(seedPartners);

  return (
    <PartnerContext.Provider value={{ partners }}>
      {children}
    </PartnerContext.Provider>
  );
}

export function usePartners() {
  const ctx = useContext(PartnerContext);
  if (!ctx) throw new Error("usePartners must be used within PartnerProvider");
  return ctx;
}
