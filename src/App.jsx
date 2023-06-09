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
import NotFound from "./pages/NotFound";
import AdminPage from "./components/Admin";
import PrivateRoute from "./components/PrivateRoute";
import Authorized from "./pages/NotPermitted";

const Layout = () => {
  return(
    <div className="layout-app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

const LayoutAdmin = () => {
  const isAdminRoute = window.location.pathname.startsWith('/admin');
  const user = useSelector(state => state.account.user);
  const userRole = user.role;
  console.log(isAdminRoute, user, userRole)

  return(
    <div className="layout-app">
      {isAdminRoute && userRole === 'ADMIN' && <Header />}
      <Outlet />
      {isAdminRoute && userRole === 'ADMIN' && <Footer />}
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.account.isLoading);

  const getAccount = async() => {
    if(
      window.location.pathname === '/login'
      || window.location.pathname === '/register'
      ) 
    return;

    const res = await callFetchAccount();
    
    if(res && res.data){
      dispatch(doGetAccountAction(res.data));
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
      element: <LayoutAdmin />,
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
      {
      isLoading === false
      || window.location.pathname === '/login' 
      || window.location.pathname === '/register'
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