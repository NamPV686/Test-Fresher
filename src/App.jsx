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
import { useDispatch, useSelector } from 'react-redux';
import { doGetAccountAction } from "./redux/account/accountSlice";
import Loading from "./components/Loading";
import NotFound from "./pages/Error";
import AdminPage from "./components/Admin";
import PrivateRoute from "./components/PrivateRoute";

const Layout = () => {
  return(
    <div className="layout-app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.account.isAuthenticated);

  const getAccount = async() => {
    if(window.location.pathname === '/login') return;
    const res = await callFetchAccount();
    
    if(res && res.data && res.data.user){
      dispatch(doGetAccountAction(res.data.user));
    }
  }

  useEffect(() => {
    getAccount();
  }, [])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
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
      path: "/admin",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {index: true, element: 
          <PrivateRoute>
            <AdminPage />
          </PrivateRoute>
        },
  
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

  return(
    <div>
      {isAuthenticated === true 
      || window.location.pathname === '/login' 
      || window.location.pathname === '/admin'
      || window.location.pathname === '/'
      ?
        <RouterProvider router={router} />
        :
        <Loading />
      }
      
    </div>
  )
}

export default App;