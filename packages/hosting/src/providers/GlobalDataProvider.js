import React, { createContext, useContext, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../firebase";
import { useAuthentication } from "./AuthenticationProvider";
import { notification, Spinner } from "../components";
import { orderBy } from "lodash";

const GlobalDataContext = createContext({
  rolesAcls: [],
  users: [],
  practices: [],
  companies: [],
});

export const GlobalDataProvider = ({ children }) => {
  const { authUser } = useAuthentication();

  const [rolesAcls = [], rolesAclsLoading, rolesAclsError] = useCollectionData(
    authUser ? firestore.collection("roles-acls") : null
  );

  const [users = [], usersLoading, usersError] = useCollectionData(
    firestore.collection("users").where("isDeleted", "==", false) || null
  );

  const [practices = [], practicesLoading, practicesError] = useCollectionData(
    firestore.collection("practices").where("isDeleted", "==", false) || null
  );

  const [companies = [], companiesLoading, companiesError] = useCollectionData(
    firestore.collection("companies").where("isDeleted", "==", false) || null
  );

  const error =
    rolesAclsError || usersError || practicesError || companiesError;

  const loading =
    rolesAclsLoading || usersLoading || practicesLoading || companiesLoading;

  useEffect(() => {
    error && notification({ type: "error" });
  }, [error]);

  if (loading) return <Spinner height="100vh" />;

  return (
    <GlobalDataContext.Provider
      value={{
        rolesAcls: orderBy(rolesAcls, (roleAcls) => [roleAcls.name], ["desc"]),
        users: orderBy(users, (user) => [user.createAt], ["desc"]),
        companies: orderBy(companies, (company) => [company.createAt], [
          "desc",
        ]),
        practices: orderBy(practices, (practice) => [practice.createAt], [
          "desc",
        ]),
      }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
};

export const useGlobalData = () => useContext(GlobalDataContext);
