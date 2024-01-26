import React, { useState } from "react";
import HeaderMenu from "../../templates/HeaderMenu";
import NavbarAdmin from "../../templates/NavbarAdmin";

const UserActivity = (): React.JSX.Element => {
  const userActivityData = [
    {
      name: "Leire1932",
      status: "Activo",
      ipAddress: "193.00.00.01",
      os: "IOS",
      registrationDate: "23/11/2023",
      lastConnection: "23/11/2023@11:07:03",
    },
    {
      name: "Leire1932",
      status: "Activo",
      ipAddress: "193.00.00.01",
      os: "IOS",
      registrationDate: "23/11/2023",
      lastConnection: "23/11/2023@11:07:03",
    },
    {
      name: "Leire1932",
      status: "Activo",
      ipAddress: "193.00.00.01",
      os: "IOS",
      registrationDate: "23/11/2023",
      lastConnection: "23/11/2023@11:07:03",
    },
    {
      name: "Leire1932",
      status: "Activo",
      ipAddress: "193.00.00.01",
      os: "IOS",
      registrationDate: "23/11/2023",
      lastConnection: "23/11/2023@11:07:03",
    },
    {
      name: "meire1932",
      status: "Activo",
      ipAddress: "193.00.00.01",
      os: "IOS",
      registrationDate: "23/11/2023",
      lastConnection: "23/11/2023@11:07:03",
    },
  ];

  const [find, setFind] = useState("");
  const [filteredActivity, setFilteredActivity] = useState(userActivityData);

  const findUserActivity = () => {
    const filterTerm = find.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    setFilteredActivity(
      userActivityData.filter(
        (user) =>
          Object.values(user).some((value) =>
            value
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase()
              .includes(filterTerm.toLowerCase())
          )
      )
    );
  };

  return (
    <>
      <HeaderMenu />
      <section className="flex">
        <NavbarAdmin activity />
        <section className="w-full min-h-screen justify-start py-20 flex flex-col gap-10 bg-gradient-to-b from-green-700 to-black">
          <h1 className="text-white text-center text-3xl font-semibold">
            Registro de actividad de usuarios
          </h1>

          <label htmlFor="" className="h-8 flex items-center justify-center gap-5">
            <input
              type="text"
              className="w-3/4 border h-full border-black rounded-xl"
              placeholder="¿En qué podemos ayudarte?"
              onChange={(e) => setFind(e.target.value)}
            />
      
          <button className="h-full  bg-[url(/src/images/search.svg)] bg-center" onClick={findUserActivity}></button>

          </label>

          <table className="w-3/4 mx-auto table-fixed border-separate border-spacing-3">
            <thead>
              <tr>
                <th className="text-white">Name</th>
                <th className="text-white">Status</th>
                <th className="text-white">Dirección IP</th>
                <th className="text-white">Sistema Operativo</th>
                <th className="text-white">Fecha de registro</th>
                <th className="text-white ">Ultima conexión</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {filteredActivity.map((user, index) => (
                <tr key={index}>
                  <td className="text-white">{user.name}</td>
                  <td className="text-white">{user.status}</td>
                  <td className="text-white">{user.ipAddress}</td>
                  <td className="text-white">{user.os}</td>
                  <td className="text-white">{user.registrationDate}</td>
                  <td className="text-white">{user.lastConnection}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </section>
    </>
  );
};

export default UserActivity;
