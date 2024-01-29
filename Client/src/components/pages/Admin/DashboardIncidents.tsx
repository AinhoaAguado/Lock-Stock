import React, { useState } from "react";
import HeaderMenu from "../../templates/HeaderMenu";
import NavbarAdmin from "../../templates/NavbarAdmin";
import { useLoaderData } from "react-router-dom";

const DashboardIncidents = (): React.JSX.Element => {

  // datos obtenidos
  const { response } = useLoaderData();




  // filtro
  const [filterValue, setFilterValue] = useState(""); 
  const [filteredData, setFilteredData] = useState(response);

  const filterFind = () => {
    const filterTable = response.filter((user) => {
      return user.name.toLowerCase().includes(filterValue.toLowerCase());
    });
    setFilteredData(filterTable);
  };



  return (
    <>
      <HeaderMenu />
      <section className="flex">
        <NavbarAdmin incidents />
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
              className="w-3/4 border h-full border-black rounded-xl p-2"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              placeholder="Busqueda Rapida"
            />
            <button
              className="h-full  bg-[url(/src/images/search.svg)] bg-center"
              onClick={filterFind}
            ></button>
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
              {filteredData.map((user, index) => (
                <tr key={index}>
                  <td className="text-white">{user.name}</td>
                  <td className="text-white">{user.status}</td>
                  <td className="text-white">{user.ipAddress}</td>
                  <td className="text-white">{user.os}</td>
                  <td className="text-white">{user.registrationDate}</td>
                  <td className="text-white flex gap-3">
                    {user.lastConnection}
                    <img
                      src={user.alertIcon}
                      alt="alert-icon"
                      className="w-4 h-4"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </section>
    </>
  );
};

export default DashboardIncidents;
