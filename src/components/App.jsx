import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import CreateLink from "./Link/CreateLink";
import LinkList from "./Link/LinkList";
import Header from "./Header/Header";
import Auth from "./Auth/Auth";
import Search from "./Link/Search";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      { index: true, element: <Navigate to="/new/1" replace={true} /> },
      { path: "new/:page", element: <LinkList /> },
      { path: "top", element: <LinkList /> },
      { path: "search", element: <Search /> },
      { path: "submit", element: <CreateLink /> },
      { path: "auth", element: <Auth /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
