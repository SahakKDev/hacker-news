import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import CreateLink from "./Link/CreateLink";
import LinkList from "./Link/LinkList";
import Header from "./Header/Header";
import Auth from "./Auth/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        index: true,
        element: <Navigate to="/new" replace={true} />,
      },
      {
        path: "new",
        element: <LinkList />,
      },

      {
        path: "submit",
        element: <CreateLink />,
      },
      {
        path: "auth",
        element: <Auth />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="container">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
