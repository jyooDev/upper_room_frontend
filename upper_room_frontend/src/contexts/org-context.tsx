import { createContext, useContext, useState, type ReactNode } from "react";

type OrgContextType = {
  orgName: string;
  setOrgName: (name: string) => void;
};

interface OrgProviderProps {
  children: ReactNode;
  defaultOrgName?: string;
}

const OrgContext = createContext<OrgContextType | undefined>(undefined);

export const useOrgContext = () => {
  const context = useContext(OrgContext);
  if (!context) {
    throw new Error("useOrg must be used within an OrgProvider");
  }
  return context;
};

const OrgProvider = ({ children, defaultOrgName = "" }: OrgProviderProps) => {
  const [orgName, setOrgName] = useState(defaultOrgName);

  return (
    <OrgContext.Provider value={{ orgName, setOrgName }}>
      {children}
    </OrgContext.Provider>
  );
};

export default OrgProvider;
