import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/login";
import ContactPage from "./pages/contact";
import BookPage from "./pages/book";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import RegisterPage from "./pages/register";
import { useEffect } from "react";
import { callFetchAccount } from "./service/apiService";
import { useDispatch } from 'react-redux';
import { doGetAccountAction } from "./redux/account/accountSlice";

const Layout = () => {
  return(
    <div className="layout-app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>404 not found</div>,
    children: [
      {index: true, element: <Home />},

      {
        path: "contact",
        element: <ContactPage />,
      },

      {
        path: "book",
        element: <BookPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

const App = () => {
  const dispatch = useDispatch();

  const getAccount = async() => {
    const res = await callFetchAccount();
    
    if(res && res.data && res.data.user){
      dispatch(doGetAccountAction(res.data.user));
    }
  }

  useEffect(() => {
    getAccount();
  }, [])

  return(
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;