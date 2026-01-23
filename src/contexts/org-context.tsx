import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type OrgContextType = {
  orgName: string;
  orgId: string;
  setOrgName: (name: string) => void;
  setOrgId: (id: string) => void;
};

interface OrgProviderProps {
  children: ReactNode;
  defaultOrgName?: string;
  defaultOrgId?: string;
}

const OrgContext = createContext<OrgContextType | undefined>(undefined);

export const useOrgContext = () => {
  const context = useContext(OrgContext);
  if (!context) {
    throw new Error("useOrg must be used within an OrgProvider");
  }
  return context;
};

const OrgProvider = ({
  children,
  defaultOrgName = "",
  defaultOrgId = "",
}: OrgProviderProps) => {
  const [orgName, setOrgName] = useState(defaultOrgName);
  const [orgId, setOrgId] = useState(defaultOrgId);

  useEffect(() => {
    setOrgName(defaultOrgName || "");
  }, [defaultOrgName]);

  useEffect(() => {
    setOrgId(defaultOrgId || "");
  }, [defaultOrgId]);

  return (
    <OrgContext.Provider value={{ orgName, orgId, setOrgName, setOrgId }}>
      {children}
    </OrgContext.Provider>
  );
};

export default OrgProvider;
