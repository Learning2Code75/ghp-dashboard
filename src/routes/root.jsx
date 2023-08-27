import { createTheme, ThemeProvider } from "@mui/material";
import { createContext, useMemo, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SwipeableEdgeDrawer from "../components/SwipeableEdgeDrawer";
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});
export const RouteContext = createContext("");
export default function Root() {
  const [openNav, setOpenNav] = useState(false);
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  const handleNavClick = (path) => {
    if (openNav) {
      setOpenNav(!openNav);
    }
    if (path === "/") {
      setActive(0);
    } else if (path === "invoices/") {
      setActive(1);
    } else if (path === "fix-menus/") {
      setActive(2);
    } else if (path === "daily-menus/") {
      setActive(3);
    } else if (path === "festive-menus/") {
      setActive(4);
    } else if (path === "general-info/") {
      setActive(5);
    } else if (path === "image-gallery/") {
      setActive(6);
    }
    navigate(path);
  };
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <RouteContext.Provider value={{ active, setActive, handleNavClick }}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <SwipeableEdgeDrawer
            handleNavClick={handleNavClick}
            openNav={openNav}
            setOpenNav={setOpenNav}
            active={active}
          />
          <div
            style={{
              marginTop: "3.4rem",
              marginBottom: "5rem",
            }}
          >
            <Outlet setActive={setActive} />
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </RouteContext.Provider>
  );
}
