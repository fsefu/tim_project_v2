import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import Footer from "../../components/footer/Footer";
import routes from "../../routes";
import axios from "axios";

export default function Admin(props: { [x: string]: any }) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [csrf, setCsrf] = useState("");

  useEffect(() => {
    getSession();
  }, []);

  const getCsrf = () => {
    axios
      .get("http://localhost:8000/auth/csrf/", { withCredentials: true })
      .then((res) => {
        let csrfToken = res.headers["x-csrftoken"];
        if (csrfToken) setCsrf(csrfToken);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSession = () => {
    axios
      .get("http://localhost:8000/auth/session/", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        if (res.data.isAuthenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          getCsrf();
        }
      })
      .catch((err) => {
        setIsAuthenticated(false);

        console.log(err);
      });
  };

  useEffect(() => {
    if (isAuthenticated === null) {
      console.log("IS NULL");
    } else if (!isAuthenticated) {
      console.log("NOT Authorized");
      window.location.href = "/auth/sign-in";
    } else {
      window.addEventListener("resize", () =>
        window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
      );
      getActiveRoute(routes);

      return () => {
        window.removeEventListener("resize", () =>
          window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
        );
      };
    }
  }, [isAuthenticated, location.pathname]);

  const getActiveRoute = (routes: RoutesType[]): string | boolean => {
    let activeRoute = "Main Dashboard";
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(
          routes[i].layout + "/" + routes[i].path
        ) !== -1
      ) {
        setCurrentRoute(routes[i].name);
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes: RoutesType[]): string | boolean => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        activeNavbar = routes[i].secondary || false;
        return activeNavbar;
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes: RoutesType[]): any => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  document.documentElement.dir = "ltr";
  return (
    <div className="flex h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
        >
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              brandText={currentRoute}
              secondary={getActiveNavbar(routes)}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                {getRoutes(routes)}

                <Route
                  path="/"
                  element={<Navigate to="/admin/default" replace />}
                />
              </Routes>
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
