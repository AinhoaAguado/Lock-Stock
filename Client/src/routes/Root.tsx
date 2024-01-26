import React from "react";
import { Outlet } from "react-router-dom"

const Root = (): React.JSX.Element => {
  return (
    <>
        <Outlet />
    </>
  )
}

export default Root;