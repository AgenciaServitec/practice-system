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

  const error = rolesAclsError || usersError;

  const loading = rolesAclsLoading || usersLoading;

  useEffect(() => {
    error && notification({ type: "error" });
  }, [error]);

  if (loading) return <Spinner height="100vh" />;

  return (
    <GlobalDataContext.Provider
      value={{
        rolesAcls,
        users: orderBy(users, (user) => [user.createAt], ["desc"]),
      }}
    >
      {children}
    </GlobalDataContext.Provider>
  );
};

export const useGlobalData = () => useContext(GlobalDataContext);
