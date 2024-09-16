import React from "react";
import { Drawer, Menu } from "antd";
import { version } from "../../firebase";
import {
  faBriefcase,
  faFilePen,
  faGears,
  faHome,
  faUsers,
  faUsersCog,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { includes } from "lodash";

export const DrawerLayout = ({
  user,
  isVisibleDrawer,
  onSetIsVisibleDrawer,
  onNavigateTo,
}) => {
  const existPageAclsInAclsOfUser = (aclNames = []) =>
    (user?.acls || []).some((acl) => includes(aclNames, acl));

  const items = [
    {
      label: "Home",
      key: "home",
      icon: <FontAwesomeIcon icon={faHome} size="lg" />,
      isVisible: existPageAclsInAclsOfUser(["/home"]),
      onClick: () => {
        onNavigateTo("/home");
        onSetIsVisibleDrawer(false);
      },
    },
    {
      label: "Control de Accesos (acls)",
      key: "group-acls",
      icon: <FontAwesomeIcon icon={faUsersCog} size="lg" />,
      isVisible: existPageAclsInAclsOfUser([
        "/default-roles-acls",
        "/manage-acls",
      ]),
      children: [
        {
          label: "Roles con Acls",
          key: "default-roles-acls",
          isVisible: existPageAclsInAclsOfUser(["/default-roles-acls"]),
          onClick: () => {
            onNavigateTo("/default-roles-acls");
            onSetIsVisibleDrawer(false);
          },
        },
        {
          label: "Administrador Acls",
          key: "manage-acls",
          isVisible: existPageAclsInAclsOfUser(["/manage-acls"]),
          onClick: () => {
            onNavigateTo("/manage-acls");
            onSetIsVisibleDrawer(false);
          },
        },
      ],
    },
    {
      label: ["super_admin", "admin"].includes(user.roleCode)
        ? "Usuarios"
        : "Practicantes",
      key: "users",
      icon: <FontAwesomeIcon icon={faUsers} size="lg" />,
      isVisible: existPageAclsInAclsOfUser(["/users"]),
      onClick: () => {
        onNavigateTo("/users");
        onSetIsVisibleDrawer(false);
      },
    },
    {
      label: "Empresas",
      key: "companies",
      icon: <FontAwesomeIcon icon={faBriefcase} size="lg" />,
      isVisible: existPageAclsInAclsOfUser(["/companies"]),
      onClick: () => {
        onNavigateTo("/companies");
        onSetIsVisibleDrawer(false);
      },
    },
    {
      label: "Prácticas",
      key: "practices",
      icon: <FontAwesomeIcon icon={faFilePen} size="lg" />,
      isVisible: existPageAclsInAclsOfUser(["/practices"]),
      onClick: () => {
        onNavigateTo("/practices");
        onSetIsVisibleDrawer(false);
      },
    },
  ];

  const filterByRoleCode = (items) => {
    return items.filter((item) => {
      if (item?.children) {
        item.children = (item?.children || []).filter(
          (_children) => _children.isVisible
        );
      }

      return item.isVisible;
    });
  };

  return (
    <Drawer
      key="right"
      title={
        <div style={{ width: "100%", textAlign: "right" }}>
          <h5>version: {version}</h5>
        </div>
      }
      placement="left"
      width={330}
      closable={true}
      onClose={() => onSetIsVisibleDrawer(!isVisibleDrawer)}
      open={isVisibleDrawer}
      className="drawer-content"
      bodyStyle={{ padding: "0" }}
    >
      <div className="logo" />
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={filterByRoleCode(items)}
      />
    </Drawer>
  );
};
