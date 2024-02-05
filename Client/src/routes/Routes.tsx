import { createBrowserRouter } from "react-router-dom";
import PasswordMasterForm from "../components/pages/User/PasswordMasterForm";
import Root from "./Root";
import NotificationMailbox from "../components/pages/User/NotificationMailbox";
import PasswordGenerator from "../components/pages/User/PasswordGenerator";
import LoginAdmin from "../components/pages/Admin/LoginAdmin";
import RootAdmin from "./RootAdmin";
import DashboardAdmin from "../components/pages/Admin/DashboardAdmin";
import UserActivity from "../components/pages/Admin/UserActivity";
import DashboardIncidents from "../components/pages/Admin/DashboardIncidents";
import NotificationAdmin from "../components/pages/Admin/NotificationAdmin";
import Help from "../components/pages/User/Help";
import HowUse from "../components/pages/User/HowUse";
import UserProfile from "../components/pages/User/UserProfile";
import ConnectedDevices from "../components/pages/User/ConnectedDevices";
import React from "react";
import { servicesApp } from "../services/services";
import RecoverPasswordForm from "../components/pages/User/RecoverPasswordForm";
import AccountsUser from "../components/pages/User/AccountsUser";
import Terms from "../components/pages/User/Terms";
import RegisterLogin from "../components/pages/User/RegisterLogin";
import RecoverPassword from "../components/pages/User/RecoverPassword";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <RegisterLogin />
            },
            {
                path: '/password-master',
                element: <PasswordMasterForm />
            },
            {
                path: 'terms',
                element: <Terms />
            },
            {
                path: '/help',
                element: <Help/>
            },
            {
                path:'/how-use',
                element: <HowUse/>
            },
            {
                path: 'user-profile',
                element: <UserProfile />,
                loader: servicesApp.getProfile
            },
            {
                path: 'connected-devices',
                element: <ConnectedDevices />
											  
            },
            {
                path: 'notification-mailbox',
                element: <NotificationMailbox />,
                loader: servicesApp.getNotifications
            },
            {
                path: 'password-generator/:id?',
                element: <PasswordGenerator/>,
            },
            {
                path: 'recovery-password',
                element: <RecoverPasswordForm />
            },
            {
                path:'accounts-user',
                element: <AccountsUser />,
                 loader: servicesApp.getAccountsUser
            },
            {
                path: 'recover',
                element: <RecoverPassword />
            }
        ],
    },
    {
        path: '/',
        element: <RootAdmin/>,
        children: [
            {
                path: '/login-admin',
                element: <LoginAdmin />
            },
            {
                path:'/dashboard-admin',
                element: <DashboardAdmin />
													 
            },
            {
                path: '/user-activity',
                element: <UserActivity />
												   
            },
            {
                path: 'dashboard-incidents',
                element: <DashboardIncidents />
														 
            },
            {
                path: '/notification-admin',
                element: <NotificationAdmin />
														 
            }
        ]
    }
]) 