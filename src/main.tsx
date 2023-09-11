import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/globals.scss";
import { Provider } from "react-redux";
import { store } from "./redux.ts";
import HomePage from "./pages/Home.page.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
