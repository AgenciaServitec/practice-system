import React, { useState } from "react";
import styled from "styled-components";
import LayoutAntd from "antd/lib/layout";
import { DrawerLayout } from "./DrawerLayout";
import { HeaderLayout } from "./HeaderLayout";
import { FooterLayout } from "./FooterLayout";
import { useNavigate } from "react-router";
import { BreadcrumbLayout } from "./Breadcrumb";
import { useAuthentication } from "../../providers";

const { Content } = LayoutAntd;

export const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const { authUser, logout } = useAuthentication();

  const [isVisibleDrawer, setIsVisibleDrawer] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const onNavigateTo = (url) => navigate(url);

  return (
    <LayoutContainer>
      <LayoutAntd className="site-layout">
        <DrawerLayout
          user={authUser}
          isVisibleDrawer={isVisibleDrawer}
          onSetIsVisibleDrawer={setIsVisibleDrawer}
          onNavigateTo={onNavigateTo}
        />
        <HeaderLayout
          user={authUser}
          onNavigateTo={onNavigateTo}
          isVisibleDrawer={isVisibleDrawer}
          setIsVisibleDrawer={setIsVisibleDrawer}
          openDropdown={openDropdown}
          onOpenDropdown={setOpenDropdown}
          onLogout={logout}
        />
        <Content style={{ margin: "0 16px" }}>
          <BreadcrumbLayout user={authUser} />
          <div className="site-layout-background" style={{ padding: 24 }}>
            {children}
          </div>
        </Content>
        <FooterLayout />
      </LayoutAntd>
    </LayoutContainer>
  );
};

const LayoutContainer = styled(LayoutAntd)`
  min-width: 100vw;
  min-height: 100vh;
  .site-layout-background {
    background: #fff;
  }

  .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }
`;
