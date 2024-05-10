import React from "react";
import { capitalize } from "lodash";
import Breadcrumb from "antd/lib/breadcrumb";
import { Roles } from "../../data-list";

export const BreadcrumbLayout = ({ user }) => {
  const legend = window.location.pathname.split("/").filter((legend) => legend);

  const findRole = (roleCode) =>
    Roles.find((role) => role.roleCode === roleCode);

  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      <Breadcrumb.Item>
        {capitalize(findRole(user?.roleCode)?.roleName || "User")}
      </Breadcrumb.Item>
      {(legend || []).map((legend, index) => (
        <Breadcrumb.Item key={index}>{capitalize(legend)}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};
