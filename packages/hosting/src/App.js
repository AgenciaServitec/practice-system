import React from "react";
import { Router } from "./router";
import {
  AuthenticationProvider,
  ConfigsInitializer,
  GlobalDataProvider,
  VersionProvider,
} from "./providers";
import { usersRef } from "./firebase/collections";
import { useCollectionData } from "react-firebase-hooks/firestore";

const App = () => {
  const fetchAllUsers = () => {
    let queryRef = usersRef.where("isDeleted", "==", false);
    return queryRef;
  };

  const [users = []] = useCollectionData(fetchAllUsers());

  const searchData = (user) => {
    return [
      user?.id,
      user?.studentShift,
      user?.dni.toString(),
      user?.email,
      user?.paternalSurname,
      user?.maternalSurname,
      user?.firstName,
    ].filter((v) => v);
  };

  const _searchData = users.map((user) => ({
    ...user,
    searchData: searchData(user),
  }));

  console.log(_searchData);

  return (
    <VersionProvider>
      <ConfigsInitializer>
        <AuthenticationProvider>
          <GlobalDataProvider>
            <Router />
          </GlobalDataProvider>
        </AuthenticationProvider>
      </ConfigsInitializer>
    </VersionProvider>
  );
};

export default App;
