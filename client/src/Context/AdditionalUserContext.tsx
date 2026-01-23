import { UserAuth } from "@/components/auth/AuthContext";
import { useGetUserOrgUuid } from "@/services/queries/userQueries";
import { createContext, useContext } from "react";

type AdditionalUserContextType = {
  org_uuid: string | null | undefined;
};
const AdditionalUserContext = createContext<AdditionalUserContextType>({
  org_uuid: null,
});

export function AdditionalUserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = useGetUserOrgUuid(UserAuth().session?.user?.id as string);

  return (
    <AdditionalUserContext.Provider value={{ org_uuid: data }}>
      {children}
    </AdditionalUserContext.Provider>
  );
}

export function useAdditionalUserContext() {
  return useContext(AdditionalUserContext);
}
