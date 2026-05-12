import React, { useState } from "react";
import {
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Layout as AntLayout,
  Menu,
  Tag,
  theme,
  Badge,
  Drawer,
  Grid,
} from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import BasketModal from "./BasketModal";
import type { RootState } from "../redux/store";
import { useSelector } from "react-redux";

const { Header, Sider, Content } = AntLayout;

export default function Layout({ children }: { children?: React.ReactNode }) {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [basketOpen, setBasketOpen] = useState(false);

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate(0);
  };

  const basketCount = useSelector(
    (state: RootState) => state.basket.items.length
  );

  const selectedKey = location.pathname.startsWith("/product")
    ? "/product"
    : location.pathname;

  return (
    <>
      <AntLayout
        style={{
          marginLeft: screens.md ? (collapsed ? 90 : 250) : 0,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          minHeight: "100vh",
          background: "#eef2f7",
        }}
      >
        {screens.md && (
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            collapsedWidth={90}
            width={250}
            className="fixed! bottom-0! left-0! top-0! z-50! h-screen! bg-transparent!"
          >
            <div className="relative h-full overflow-hidden border-r border-white/70 bg-[linear-gradient(180deg,#f8fbff_0%,#eef6ff_38%,#eef2ff_68%,#fdf2ff_100%)] shadow-[18px_0_60px_rgba(59,130,246,0.16)]">

              <div className="absolute -left-20 top-8 h-52 w-52 rounded-full bg-blue-300/45 blur-[70px]" />
              <div className="absolute -right-24 top-56 h-56 w-56 rounded-full bg-purple-300/40 blur-[75px]" />
              <div className="absolute bottom-0 left-8 h-52 w-52 rounded-full bg-cyan-300/35 blur-[70px]" />

              <div className="relative z-10 flex h-full flex-col px-4 py-5">

                <div
                  className={`mb-6 flex items-center ${collapsed ? "justify-center" : "gap-3"
                    } rounded-[26px] border border-white/80 bg-white/75 p-3 shadow-[0_14px_40px_rgba(59,130,246,0.14)] backdrop-blur-xl`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#38bdf8,#2563eb,#7c3aed)] text-xl font-black text-white shadow-lg">
                    A
                  </div>

                  {!collapsed && (
                    <div>
                      <h2 className="m-0 text-lg font-black text-slate-900">
                        My Dashboard
                      </h2>
                      <p className="m-0 text-xs font-semibold text-slate-500">
                        Premium Product Panel
                      </p>
                    </div>
                  )}
                </div>

                {!collapsed && (
                  <div className="mb-5 rounded-3xl border border-white/80 bg-white/70 p-4 shadow-[0_16px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                    <div className="mb-3 flex items-center gap-3">
                      <Avatar
                        size={46}
                        className="bg-[linear-gradient(135deg,#2563eb,#7c3aed)] font-bold shadow-md"
                      >
                        AI
                      </Avatar>

                      <div>
                        <h3 className="m-0 text-sm font-black text-slate-900">
                          Welcome back
                        </h3>
                        <p className="m-0 text-xs font-semibold text-slate-500">
                          Store Manager
                        </p>
                      </div>
                    </div>

                    <Tag className="m-0 rounded-full border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                      Active
                    </Tag>
                  </div>
                )}

                <Menu
                  mode="inline"
                  selectedKeys={[selectedKey]}
                  className="premium-light-menu border-none bg-transparent"
                  items={[
                    {
                      key: "/",
                      icon: <HomeOutlined />,
                      label: <Link to="/">Home</Link>,
                    },
                    {
                      key: "/User",
                      icon: <UserOutlined />,
                      label: <Link to="/User">Profile</Link>,
                    },
                    {
                      key: "/product",
                      icon: <ShoppingOutlined />,
                      label: <Link to="/product">Product</Link>,
                    },
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: (
                        <span onClick={logout} className="cursor-pointer">
                          Log out
                        </span>
                      ),
                    },
                  ]}
                />

                {!collapsed && (
                  <div className="mt-auto rounded-24px border border-blue-100 bg-[linear-gradient(135deg,#eff6ff,#f5f3ff)] p-4 shadow-[0_16px_40px_rgba(59,130,246,0.12)]">
                    <p className="m-0 text-xs font-bold uppercase tracking-[0.2em] text-blue-500">
                      Storage
                    </p>
                    <h3 className="m-0 mt-1 text-lg font-black text-slate-900">
                      LocalStorage
                    </h3>
                    <p className="m-0 mt-1 text-xs leading-5 text-slate-500">
                      Product edit və save məlumatları browser-də saxlanılır.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Sider>
        )}

        {/* ===== MOBILE DRAWER (ONLY RESPONSIVE ADDITION) ===== */}
        {!screens.md && (
          <Drawer
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            placement="left"
            size='default'
          >
            <Menu
              mode="inline"
              selectedKeys={[selectedKey]}
              items={[
                {
                  key: "/",
                  icon: <HomeOutlined />,
                  label: <Link to="/">Home</Link>,
                },
                {
                  key: "/User",
                  icon: <UserOutlined />,
                  label: <Link to="/User">Profile</Link>,
                },
                {
                  key: "/product",
                  icon: <ShoppingOutlined />,
                  label: <Link to="/product">Product</Link>,
                },
                {
                  key: "logout",
                  icon: <LogoutOutlined />,
                  label: (
                    <span onClick={logout} className="cursor-pointer">
                      Log out
                    </span>
                  ),
                },
              ]}
            />
          </Drawer>
        )}

        <Header
          style={{
            position: "fixed",
            top: 0,
            left: screens.md ? (collapsed ? 90 : 250) : 0,
            right: 0,
            height: 70,
            padding: "0 24px",
            background: "rgba(255,255,255,0.76)",
            backdropFilter: "blur(16px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 1000,
            borderBottom: "1px solid rgba(255,255,255,0.7)",
            transition: "all 0.3s ease",
          }}
        >
          <Button
            type="text"
            icon={
              screens.md ? (
                collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
              ) : (
                <MenuUnfoldOutlined />
              )
            }
            onClick={() =>
              screens.md ? setCollapsed(!collapsed) : setMobileOpen(true)
            }
          />

          <Badge count={basketCount} size="small">
            <Button onClick={() => setBasketOpen(true)}>
              🛒 Basket
            </Button>
          </Badge>
        </Header>

        <Content
          style={{
            margin: screens.md
              ? "100px 24px 24px 24px"
              : "90px 12px 12px 12px",
            padding: screens.md ? 32 : 16,
            minHeight: "calc(100vh - 140px)",
            background: "#ffffff",
            borderRadius: borderRadiusLG,
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            border: "1px solid rgba(0,0,0,0.04)",
            overflow: "auto",
            transition: "all 0.3s ease",
          }}
        >
          <Outlet />
          {children}
        </Content>
      </AntLayout>

      <BasketModal
        open={basketOpen}
        onClose={() => setBasketOpen(false)}
      />
    </>
  );
}