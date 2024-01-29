import React, { useState } from "react";
import HeaderMenu from "../../templates/HeaderMenu";
import NavbarAdmin from "../../templates/NavbarAdmin";
import { useLoaderData } from "react-router-dom";
import { servicesApp } from "../../../services/services";
import { hashData } from "../../../services/hash";

const DashboardAdmin = (): React.JSX.Element => {

  //datos de la tabla
  const { response } = useLoaderData();

  console.log(response)



  //filtro de la tabla
  const [filter, setFilter] = useState("");
  const [filteredTable, setFilteredTable] = useState(response);

  const handleFilter = () => {
    const filteredTable = response.filter((user) =>
      user.Usuario.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredTable(filteredTable);
  };

  //bloquear usuario
  const blockUser = async (itemId: string) => {
    try {

      const newData = {
        id: await hashData(itemId)
      };
  
      const idHash = await servicesApp.blockDashboardAdmin(newData);

      //ver datos enviados
      console.log(newData)

      //respuesta de la peticion
      console.log(idHash)

    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };



  //eliminar usuario
  const deleteUser = async (itemId: string) => {
    try {


      const newData = {
        id: await hashData(itemId)
      };
  
      const idHash = await servicesApp.deleteDashboardAdmin(newData);

      //ver datos enviados
      console.log(newData)

      //respuesta de la peticion
      console.log(idHash)

    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };




  return (
    <>
      <HeaderMenu />
      <section className="flex">
        <NavbarAdmin dashboard />
        <section className="w-full min-h-screen justify-start py-20 flex flex-col gap-10 bg-gradient-to-b from-green-700 to-black">
          <h1 className="text-white text-center text-3xl font-semibold">
            Gestion de Usuarios
          </h1>

          <label htmlFor="" className="h-8 flex items-center justify-center gap-5">
            <input
              type="text"
              className="w-3/4 border h-full border-black rounded-xl p-2"
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Busqueda Rapida"
            />
            <button
              className="h-full  bg-[url(/src/images/search.svg)] bg-center"
              onClick={handleFilter}
            ></button>
          </label>

          <table className="w-3/4 mx-auto table-fixed border-separate border-spacing-3 ">
            <thead>
              <tr>
                <th className="text-white">Usuario &#9660;</th>
                <th className="text-white">Fecha de Registro &#9660;</th>
                <th className="text-white">Última Conexion &#9660;</th>
                <th className="text-white">Direccion IP &#9660;</th>
                <th className="text-white">Bloquear &#9660;</th>
                <th className="text-white ">Eliminar &#9660;</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {filteredTable.map((user, index) => (
                <tr key={index}>
                  <td className="text-white">{user.Usuario}</td>
                  <td className="text-white">{user.FechaRegistro}</td>
                  <td className="text-white">{user.UltimaConexion}</td>
                  <td className="text-white">{user.DireccionIP}</td>

                  <td>
                    <img
                      src={
                        user.Bloquear
                          ? "/src/images/block-red-icon.svg"
                          : "/src/images/block-white-icon.svg"
                      }
                      alt="Bloquear"
                      className="m-auto cursor-pointer"
                      onClick={() => blockUser(user.id)}
                    />
                  </td>

                  <td>
                    <img
                      src={
                        user.Bloquear
                          ? "/src/images/delete-icon-red.svg"
                          : "/src/images/delete-white-icon.svg"
                      }
                      alt="Eliminar"
                      className="m-auto cursor-pointer" onClick={()=>deleteUser(user.id)}
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

export default DashboardAdmin;
