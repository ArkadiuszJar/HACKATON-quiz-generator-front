import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import QuizArticles from "./routes/QuizArticles";
import AuthProvider from "./AuthProvider";
import Register from "./routes/Register";
import Questions from "./routes/Questions";
import NotFound from "./routes/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Home />
      </AuthProvider>
    ),
  },
  {
    path: "/login",
    element: (
      <AuthProvider>
        <Login />
      </AuthProvider>
    ),
  },
  {
    path: "/register",
    element: (
      <AuthProvider>
        <Register />
      </AuthProvider>
    ),
  },
  {
    path: "/quiz/articles",
    element: (
      <AuthProvider>
        <QuizArticles />
      </AuthProvider>
    ),
  },
  {
    path: "/questions",
    element: (
      <AuthProvider>
        <Questions />
      </AuthProvider>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

router.navigate()

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
