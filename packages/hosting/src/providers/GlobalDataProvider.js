import React, { createContext, useContext, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../firebase";
import { useAuthentication } from "./AuthenticationProvider";
import { notification, Spinner } from "../components";
import { orderBy } from "lodash";

const GlobalDataContext = createContext({
  rolesAcls: [],
  users: [],
});

export const GlobalDataProvider = ({ children }) => {
  const { authUser } = useAuthentication();

  const [rolesAcls = [], rolesAclsLoading, rolesAclsError] = useCollectionData(
    authUser ? firestore.collection("roles-acls") : null
  );

  const [users = [], usersLoading, usersError] = useCollectionData(
    authUser
      ? firestore.collection("users").where("isDeleted", "==", false)
      : null
  );

  const [practices = [], practicesLoading, practicesError] = useCollectionData(
    authUser
      ? firestore.collection("practices").where("isDeleted", "==", false)
      : null
  );

  const [companies = [], companiesLoading, companiesError] = useCollectionData(
    authUser
      ? firestore.collection("companies").where("isDeleted", "==", false)
      : null
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
        companies: orderBy(companies, (company) => [company.createAt], [
          "desc",
        ]),
        practices: orderBy(practices, (practice) => [practice.createAt], [
          "desc",
        ]),
        rolesAcls: orderBy(rolesAcls, (roleAcls) => [roleAcls.name], ["desc"]),
        users: orderBy(users, (user) => [user.createAt], ["desc"]),
      }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
};

export const useGlobalData = () => useContext(GlobalDataContext);
