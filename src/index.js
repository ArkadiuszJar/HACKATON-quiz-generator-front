import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider } from '@chakra-ui/react'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Home from './routes/Home'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider
        router={router}
      />
    </ChakraProvider>
  </React.StrictMode>
);
