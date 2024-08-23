import react from "react"
import "./index.scss"
// import "./layout.scss"
import Navbar from "../components/Navbar/Navbar"
import "../components/Navbar/navbar.scss"
import HomePage from "../routes/HomePage/homePage"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import ListPage from "../routes/ListPage/listPage"
import { Layout, RequireAuth } from "../routes/Layout/layout";
import "../routes/Layout/layout.scss"
import SinglePage from "../routes/SinglePage/SinglePage";
import ProfilePage from "../routes/ProfilePage/profile";
import Register from "../routes/Register/Register";
import Login from "../routes/Login/Login";
import ProfileUpdatePage from "../routes/profileUpdatePage/profileUpdatePage"
import NewPostPage from "../routes/newPostPage/NewPostPage";
import { listPageLoader, singlePageLoader, profilePageLoader } from "../lib/loader";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[
        {
          path: "/",
          element: <HomePage/>
        },
        {
          path: "/list",
          element: <ListPage/>,
          loader: listPageLoader
        },
        {
          path: `/:id`,
          element: <SinglePage/>,
          loader: singlePageLoader
        },
        // {
        //   path: "/profile",
        //   element: <ProfilePage/>
        // },
        {
          path: "/register",
          element: <Register/>
        },
        {
          path: "/login",
          element: <Login/>
        }
      ]
    },

    {
      path: "/",
      element: <RequireAuth/>,
      children:[
        {
          path: "/profile",
          element: <ProfilePage/>,
          loader: profilePageLoader
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage/>
        },
        {
          path: "/add",
          element: <NewPostPage/>
        }
      ]
    }
  ]);
  
  return (
    // <div className="layout">
    //   <div className="navbar">
    //     <Navbar/>
    //   </div>
    //   <div className="content">
    //     <HomePage/>
    //   </div>
    // </div>
    <RouterProvider router={router}/>
  )
}

export default App