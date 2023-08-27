import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Invoices from "./components/Invoices/Inovoices";
import FixMenus from "./components/FixMenus/FixMenus";
// import daily-menus from "./components/daily-menus/daily-menus";

import Root from "./routes/root";
import GeneralInfo from "./components/GeneralInfo/GeneralInfo";
import ImagesView from "./components/ImageGallery/ImagesView";
import DailyMenus from "./components/DailyMenus /DailyMenus";
import FestiveMenus from "./components/FestiveMenus /FestiveMenus";

function App({ setActive }) {
  const router = createBrowserRouter([
    {
      path: "/ghp-dashboard",
      element: <Root />,
      children: [
        {
          path: "/ghp-dashboard/",
          element: <Home />,
        },
        {
          path: "/ghp-dashboard/invoices/",
          element: <Invoices />,
        },
        {
          path: "/ghp-dashboard/fix-menus/",
          element: <FixMenus />,
        },
        {
          path: "/ghp-dashboard/daily-menus/",
          element: <DailyMenus />,
        },
        {
          path: "/ghp-dashboard/festive-menus/",
          element: <FestiveMenus />,
        },
        {
          path: "/ghp-dashboard/general-info/",
          element: <GeneralInfo />,
        },
        {
          path: "/ghp-dashboard/image-gallery/",
          element: <ImagesView />,
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
