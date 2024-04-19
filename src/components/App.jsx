import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CreateLink from "./Link/CreateLink";
import LinkList from "./Link/LinkList";
import Header from "./Header/Header";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "",
        element: <LinkList />,
      },
      {
        path: "submit",
        element: <CreateLink />,
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
