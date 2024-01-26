import React from "react";
import HeaderMenu from "../../templates/HeaderMenu";
import NavbarAdmin from "../../templates/NavbarAdmin";

const DashboardIncidents = (): React.JSX.Element => {
  return (
    <>
              <HeaderMenu />
    <section className="flex">
        <NavbarAdmin incidents/>
      <section className="w-full min-h-screen justify-start py-20 flex flex-col gap-10 bg-gradient-to-b from-green-700 to-black">
        <h1 className="text-white text-center text-3xl font-semibold">
          Incidencias
        </h1>

        <label
          htmlFor=""
          className="h-8 flex items-center justify-center gap-5"
        >
          <input
            type="text"
            className="w-3/4 border h-full border-black rounded-xl"
          />
          <button className="h-full  bg-[url(/src/images/search.svg)] bg-center"></button>
        </label>

        <table className="w-3/4 mx-auto table-fixed border-separate border-spacing-3 ">
          <thead>
            <tr>
              <th className="text-white">Name</th>
              <th className="text-white">Status</th>
              <th className="text-white">Dirección IP </th>
              <th className="text-white">Sistema Operativo</th>
              <th className="text-white">Fecha de registro</th>
              <th className="text-white ">Ultima conexión</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <td className="text-white">Leire1932</td>
              <td className="text-white">Activo</td>
              <td className="text-white">193.00.00.01</td>
              <td className="text-white">IOS</td>

              <td className="text-white">23/11/2023</td>

              <td className="text-white flex gap-3">23/11/2023@11:07:03 <img src="/src/images/alert-icon.svg" alt="alert-icon" /></td>
            </tr>
            <tr>
              <td className="text-white">Leire1932</td>
              <td className="text-white">Activo</td>
              <td className="text-white">193.00.00.01</td>
              <td className="text-white">IOS</td>

              <td className="text-white">23/11/2023</td>

              <td className="text-white flex gap-3">23/11/2023@11:07:03 <img src="/src/images/alert-icon.svg" alt="alert-icon" /></td>
  
            </tr>
            <tr>
              <td className="text-white">Leire1932</td>
              <td className="text-white">Activo</td>
              <td className="text-white">193.00.00.01</td>
              <td className="text-white">IOS</td>

              <td className="text-white">23/11/2023</td>

              <td className="text-white flex gap-3">23/11/2023@11:07:03 <img src="/src/images/alert-icon.svg" alt="alert-icon" /></td>
            </tr>
            <tr>
              <td className="text-white">Leire1932</td>
              <td className="text-white">Activo</td>
              <td className="text-white">193.00.00.01</td>
              <td className="text-white">IOS</td>

              <td className="text-white">23/11/2023</td>

              <td className="text-white flex gap-3">23/11/2023@11:07:03 <img src="/src/images/alert-icon.svg" alt="alert-icon" /></td>
            </tr>
            <tr>
              <td className="text-white">Leire1932</td>
              <td className="text-white">Activo</td>
              <td className="text-white">193.00.00.01</td>
              <td className="text-white">IOS</td>

              <td className="text-white">23/11/2023</td>

              <td className="text-white flex gap-3">23/11/2023@11:07:03 <img src="/src/images/alert-icon.svg" alt="alert-icon" /></td>
            </tr>
            <tr>
              <td className="text-white">Leire1932</td>
              <td className="text-white">Activo</td>
              <td className="text-white">193.00.00.01</td>
              <td className="text-white">IOS</td>

              <td className="text-white">23/11/2023</td>

              <td className="text-white flex gap-3">23/11/2023@11:07:03 <img src="/src/images/alert-icon.svg" alt="alert-icon" /></td>
            </tr>

          </tbody>
        </table>
      </section>
      </section>
    </>
  )
}

export default DashboardIncidents;