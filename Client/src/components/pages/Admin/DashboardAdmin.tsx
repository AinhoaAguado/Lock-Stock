import React from "react";
import HeaderMenu from "../../templates/HeaderMenu";
import NavbarAdmin from "../../templates/NavbarAdmin";

const DashboardAdmin = (): React.JSX.Element => {
  return (
    <>
    <HeaderMenu />
    <section className="flex">
    <NavbarAdmin dashboard/>
    <section className="w-full min-h-screen justify-start py-20 flex flex-col gap-10 bg-gradient-to-b from-green-700 to-black">
        
            <h1 className="text-white text-center text-3xl font-semibold">
              Gestion de USuarios
            </h1>

          <label htmlFor="" className="h-8 flex items-center justify-center gap-5">
            <input 
              type="text"
              className="w-3/4 border h-full border-black rounded-xl"
            />
            <button className="h-full  bg-[url(/src/images/search.svg)] bg-center"></button>
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

              <tr>
                <td className="text-white">MovilM11T</td>
                <td className="text-white">23/11/2023 11:07</td>
                <td className="text-white">23/11/2023 11:07</td>
                <td className="text-white">23/11/2023 11:07</td>


                <td >
                  <img src="/src/images/block-red-icon.svg" alt="Eliminar" className="m-auto"  />
                </td>

                <td >
                  <img src="/src/images/delete-icon-red.svg" alt="Eliminar" className="m-auto" />
                </td>

              </tr>






              <tr>
                <td className="text-white">MovilM11T</td>
                <td className="text-white">23/11/2023 11:07</td>
                <td className="text-white">23/11/2023 11:07</td>
                <td className="text-white">23/11/2023 11:07</td>


                <td >
                  <img src="/src/images/block-red-icon.svg" alt="Eliminar" className="m-auto"  />
                </td>

                <td >
                  <img src="/src/images/delete-icon-red.svg" alt="Eliminar" className="m-auto" />
                </td>

              </tr>



              <tr>
                <td className="text-white">MovilM11T</td>
                <td className="text-white">23/11/2023 11:07</td>
                <td className="text-white">23/11/2023 11:07</td>
                <td className="text-white">23/11/2023 11:07</td>


                <td >
                  <img src="/src/images/block-white-icon.svg" alt="Eliminar" className="m-auto"  />
                </td>

                <td >
                  <img src="/src/images/delete-white-icon.svg" alt="Eliminar" className="m-auto" />
                </td>

              </tr>


              <tr>
                <td className="text-white">MovilM11T</td>
                <td className="text-white">23/11/2023 11:07</td>
                <td className="text-white">23/11/2023 11:07</td>
                <td className="text-white">23/11/2023 11:07</td>


                <td >
                  <img src="/src/images/block-white-icon.svg" alt="Eliminar" className="m-auto"  />
                </td>

                <td >
                  <img src="/src/images/delete-white-icon.svg" alt="Eliminar" className="m-auto" />
                </td>

              </tr>


              <tr>
                <td className="text-white">MovilM11T</td>
                <td className="text-white">23/11/2023 11:07</td>
                <td className="text-white">23/11/2023 11:07</td>
                <td className="text-white">23/11/2023 11:07</td>


                <td >
                  <img src="/src/images/block-white-icon.svg" alt="Eliminar" className="m-auto"  />
                </td>

                <td >
                  <img src="/src/images/delete-white-icon.svg" alt="Eliminar" className="m-auto" />
                </td>

              </tr>


              <tr>
                <td className="text-white">MovilM11T</td>
                <td className="text-white">23/11/2023 11:07</td>
                <td className="text-white">23/11/2023 11:07</td>
                <td className="text-white">23/11/2023 11:07</td>


                <td >
                  <img src="/src/images/block-white-icon.svg" alt="Eliminar" className="m-auto"  />
                </td>

                <td >
                  <img src="/src/images/delete-white-icon.svg" alt="Eliminar" className="m-auto" />
                </td>

              </tr>





            </tbody>
          </table>
        </section>
        </section>

    </>
  )
}

export default DashboardAdmin;