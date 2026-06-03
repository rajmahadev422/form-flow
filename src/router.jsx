import { lazy, Suspense } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./pages/App";
import CreateForm from "./pages/CreateForm";
import FormLayout from "./pages/FormLayout";
import HomePage from "./pages/HomePage";
import ViewForm from "./pages/ViewForm";
import LoginPage from "./pages/LoginPage";
import { BarWaveLoader } from "./components/Loader";
import NotFound from "./components/not-found/NotFound";
import CommingSoon from "./components/not-found/CommingSoon";

const FormResponse = lazy(() => import("./pages/FormResponse"));
const FormPage = lazy(() => import("./pages/FormPage"));

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
            element: <FormPage />,
          },
          {
            path: "create",
            element: <CreateForm />,
          },
          {
            path: ":id",
            element: <FormResponse />,
          },
        ],
      },
      {
        path: "view/:id",
        element: <ViewForm />
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<BarWaveLoader />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "/report",
        element: <CommingSoon />
      },
      {
        path: "/terms",
        element: <CommingSoon />
      },
      {
        path: "/privacy",
        element: <CommingSoon />
      },
      {
        path: "*",
        element: <NotFound />
      }
    ],
  },
]);

export default router;
