import React from "react";
import Dasboard from "./commponent/Dasboard";
import Navbar from "./commponent/Navbar";
import ItemList from "./commponent/ItemList";
import { useRoutes, Navigate } from "react-router-dom"

export default function Routes() {
  return useRoutes(
    [{
        path : "/",
        element : <Navbar/>,
        children : [
            {path : "", element : <Dasboard/>},
            {path : "details/:id", element : <ItemList/>}
        ]
    },
         {path : '*', element:<Dasboard/>}
    ]
  )
}