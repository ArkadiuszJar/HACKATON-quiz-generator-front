import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider } from '@chakra-ui/react'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Home from './routes/Home'
import Login from './routes/Login'
import QuizArticles from './routes/QuizArticles'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/quiz/articles",
    element: <QuizArticles />
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
