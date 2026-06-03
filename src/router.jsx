import { lazy, Suspense } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./pages/App";
import CreateForm from "./pages/CreateForm";
import FormsPage from "./pages/FormPage";
import FormLayout from "./pages/FormLayout";
import HomePage from "./pages/HomePage";
import ViewForm from "./pages/ViewForm";
import LoginPage from "./pages/LoginPage";
import { BarWaveLoader } from "./components/Loader";

const FormResponse = lazy(() => import("./pages/FormResponse"));

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
            element: (
              <Suspense fallback={<BarWaveLoader />}>
                <FormResponse />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "view/:id",
        element: (
          <Suspense fallback={<BarWaveLoader />}>
            <ViewForm />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);

export default router;
