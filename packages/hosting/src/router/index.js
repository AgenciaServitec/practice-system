import React from "react";
import { Route, Routes } from "react-router-dom";
import { AdminLayout } from "../components/layout/AdminLayout";
import { PrivateRoute } from "./PrivateRoute";
import * as A from "../pages";
import { Page404 } from "../pages/404";

export const Router = () => {
  return (
    <Routes>
      <Route exact path="/" element={<A.LoginIntegration />} />
      <Route exact path="/register" element={<A.RegisterIntegration />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route
          exact
          path="users"
          element={
            <AdminLayout>
              <A.Users />
            </AdminLayout>
          }
        />
        <Route
          exact
          path="users/:userId"
          element={
            <AdminLayout>
              <A.UserIntegration />
            </AdminLayout>
          }
        />
        <Route
          exact
          path="default-roles-acls"
          element={
            <AdminLayout>
              <A.DefaultRolesAclsIntegration />
            </AdminLayout>
          }
        />
        <Route
          exact
          path="default-roles-acls/:roleAclsId"
          element={
            <AdminLayout>
              <A.RoleAclIntegration />
            </AdminLayout>
          }
        />
        <Route
          exact
          path="manage-acls"
          element={
            <AdminLayout>
              <A.ManageAclsIntegration />
            </AdminLayout>
          }
        />
        <Route
          exact
          path="profile"
          element={
            <AdminLayout>
              <A.Profile />
            </AdminLayout>
          }
        />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};
