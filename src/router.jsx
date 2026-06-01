import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./pages/App";
import GoogleLogin from "./pages/GoogleLogin";
import CreateForm from "./pages/CreateForm";
import FormsPage from "./pages/FormPage";
import FormLayout from "./pages/FormLayout";
import HomePage from "./pages/HomePage";
import ViewForm from "./pages/ViewForm";
import FormResponse from "./pages/FormResponse";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "form",
        element: <FormLayout />,
        children: [
          {
            index: true,
            element: <FormsPage />,
          },
          {
            path: "create",
            element: <CreateForm />,
          },
          {
            path: ":id",
            element: <FormResponse />
          }
        ],
      },
      {
        path: "view",
        children: [
          {
            path: ":id",
            element: <ViewForm />
          }
        ]
      }
    ],
  },

  {
    path: "/login",
    element: <GoogleLogin />,
  },
]);

export default router;
