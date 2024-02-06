import { FC } from 'react';
import LoginButton from '../molecules/LoginButton';
import { useForm } from 'react-hook-form';
import { servicesApp } from '../../services/services';
import { zodResolver } from '@hookform/resolvers/zod';
import loginSchema from '../pages/User/validations/loginForm';
import { useNavigate } from 'react-router';

interface LoginCardProps {
  switchToRegister: () => void;
  isActive: boolean;
}

const LoginCard: FC<LoginCardProps> = ({ switchToRegister, isActive }) => {
  const navigate = useNavigate();

  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const handleEmailLogin = async (data: any) => {
    try {
      const response = await servicesApp.login(data);
      if (response) {
        navigate('/accounts-user');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(handleEmailLogin)}>
      <div className="card-container p-4 bg-white rounded-lg shadow-md flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-lg font-bold cursor-pointer ${!isActive ? 'text-[#1D7607]' : 'text-black'}`} onClick={switchToRegister}>Regístrate</h2>
          <h1 className={`text-lg font-bold ${isActive ? 'text-[#1D7607]' : 'text-black'}`}>Iniciar Sesión</h1>
        </div>

        <section className='flex flex-col gap-4'>
          <label htmlFor="Email_User" className="flex flex-col w-full">Email
            <input id="Email_User" type="email" className="border border-black rounded h-9" {...register('Email_User')} />
            {errors.Email_User?.message && typeof errors.Email_User.message === 'string' && (
              <p className="text-red-500 font-medium">{errors.Email_User.message}</p>
            )}
          </label>
          
          <label htmlFor="Password_User" className="flex flex-col w-full">Contraseña
            <input id="Password_User" type="password" className="border border-black rounded h-9" {...register('Password_User')} />
            {errors.Password_User?.message && typeof errors.Password_User.message === 'string' && (
              <p className="text-red-500 font-medium">{errors.Password_User.message}</p>
            )}
          </label>

          <LoginButton>Acceso</LoginButton>
        </section>

        <div className="flex justify-end">
          <a href="#" className="font-semibold text-sm text-[#1D7607] hover:underline mt-4">¿Olvidaste tu contraseña?</a>
        </div>
      </div>
    </form>
  );
};

export default LoginCard;


