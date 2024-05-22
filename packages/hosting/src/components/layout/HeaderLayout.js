import React, { cloneElement } from "react";
import { Layout, Space, theme } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { LogoPrimary, PhotoNoFound } from "../../images";
import { mediaQuery } from "../../styles";
import { capitalize } from "lodash";
import { Dropdown } from "../ui";
import { Link } from "react-router-dom";
import { Roles } from "../../data-list";

const { useToken } = theme;

export const HeaderLayout = ({
  user,
  isVisibleDrawer,
  setIsVisibleDrawer,
  openDropdown,
  onOpenDropdown,
  onNavigateTo,
  onLogout,
}) => {
  const { token } = useToken();

  const defaultRole = Roles.find((role) => role?.code === user?.roleCode);

  const items = [
    {
      label: (
        <Link to="/profile" style={{ color: "#000" }}>
          <div style={{ padding: ".4em 0" }}>Perfil</div>
        </Link>
      ),
      key: "1",
    },
    {
      label: (
        <div
          onClick={() => onLogout()}
          style={{ padding: ".4em 0", color: "red" }}
        >
          Cerrar sesion
        </div>
      ),
      key: "3",
    },
  ];

  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  return (
    <HeaderContainer>
      <div className="right-item">
        <Space align="center" size="large">
          <div>
            <img
              src={LogoPrimary}
              width={60}
              alt="practice system"
              onClick={() => onNavigateTo("/home")}
              className="logo-img"
            />
          </div>
          <div
            style={{ fontSize: "1.7em", display: "flex", alignItems: "center" }}
          >
            <FontAwesomeIcon
              icon={faBars}
              onClick={() => setIsVisibleDrawer(!isVisibleDrawer)}
              className="icon-item"
            />
          </div>
        </Space>
      </div>
      <div className="user-items">
        <Dropdown
          trigger={["click"]}
          menu={{ items }}
          open={openDropdown}
          onOpenChange={onOpenDropdown}
          dropdownRender={(menu) => (
            <div style={contentStyle}>
              {cloneElement(menu, {
                style: {
                  boxShadow: "none",
                },
              })}
            </div>
          )}
        >
          <Space key="user-avatar" align="center">
            <h4>{capitalize((user?.firstName || "").split(" ")[0] || "")}</h4>
            <span>({defaultRole.name})</span>
            <img
              src={user?.profilePhoto?.thumbUrl || PhotoNoFound}
              alt="user"
            />
          </Space>
        </Dropdown>
      </div>
    </HeaderContainer>
  );
};

const HeaderContainer = styled(Layout.Header)`
  background: #fff !important;
  position: sticky;
  top: 1px;
  z-index: 1000;
  display: grid;
  grid-template-columns: auto 1fr;
  box-shadow: 0 1px 4px rgba(105, 105, 105, 0.24);
  overflow: hidden;
  padding: 0 16px;

  .right-item {
    display: flex;
    align-items: center;
    .logo-img,
    .icon-item {
      cursor: pointer;
    }
  }

  .user-items {
    display: flex;
    align-items: center;
    justify-content: end;

    h4 {
      margin: 0;
      font-size: 0.8em;

      ${mediaQuery.minTablet} {
        font-size: 1em;
      }
    }

    img {
      width: 2em;
      height: 2em;
      border-radius: 50%;
      margin: auto;
      object-fit: cover;
      cursor: pointer;

      ${mediaQuery.minTablet} {
        width: 2.5em;
        height: 2.5em;
      }
    }
  }
`;
