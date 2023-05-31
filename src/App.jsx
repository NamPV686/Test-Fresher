import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/login";

const Layout = () => {
  return(
    <>
      main page
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>404 not found</div>
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

const App = () => {
  return(
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;