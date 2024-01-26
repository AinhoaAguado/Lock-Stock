import React from "react";
import { Outlet } from "react-router-dom"

const RootAdmin = (): React.JSX.Element => {
  return (
    <>
        <Outlet />
    </>
  )
}

export default RootAdmin;