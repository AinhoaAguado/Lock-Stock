import React from "react";
import Navbar from "../../templates/Navbar";
import HeaderMenu from "../../templates/HeaderMenu";

const HowUse = ():React.JSX.Element => {
  return (
    <>
    <HeaderMenu />
    <section className="flex">
        <Navbar usar/>
        <section className="w-3/4 flex flex-col justify-center gap-10">
        <div className="flex gap-2 justify-center items-center">
              <img src="/src/images/candado-icon.svg" alt="help-icon" />
              <h1 className="text-primary text-5xl font-medium">Cómo Usar Lock&Stock</h1>
            </div>
            <video controls className="w-3/4 mx-auto">
                <source src=""/>
            </video>
            </section>
    </section>

    </>
  )
}

export default HowUse;