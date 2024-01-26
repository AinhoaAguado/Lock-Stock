import React from "react";
import HeaderLogin from "../../templates/HeaderLogin";
import {Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';


const LoginAdmin = (): React.JSX.Element => {

  const { handleSubmit, register, formState: { errors }} = useForm()

  const postLoginAdmin =()=>{

  }


  return (
    <>
      <HeaderLogin />
      <section className="bg-gradient-to-b from-green-700 to-black min-h-screen flex flex-col justify-center items-center gap-10">
        <h1 className="text-white font-semibold">Admin Login</h1>
        <form onSubmit={handleSubmit(postLoginAdmin)} className="flex flex-col gap-5 w-2/5">
          <label htmlFor="name">
            <input
              type="text"
              className="w-full h-12 text-center text-3xl bg-gray-300"
              id="name"
              placeholder="👤" {...register('name')}
            />
          </label>
          <label htmlFor="passwordAdmin">
            <input
              type="text"
              className="w-full h-12 text-black text-center text-3xl bg-gray-300"
              placeholder="***"
              id="passwordAdmin"
              {...register('passwordAdmin')}
            />
          </label>

          <Link to={'/dashboard-admin'}>
          <input
            type="submit"
            value="Login"
            className="w-full bg-primary text-white font-semibold h-12 text-2xl "
          />
          </Link>
        </form>
      </section>
    </>
  );
};

export default LoginAdmin;
