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
import TokenAccess from "../TokenAccess";
import RecoverPasswordForm from "../components/pages/User/RecoverPasswordForm";
import AccountsUser from "../components/pages/User/AccountsUser";
import Terms from "../components/pages/User/terms";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/password-master',
                element: <TokenAccess><PasswordMasterForm /></TokenAccess>
            },
            {
                path: 'terms',
                element: <Terms />
            },
            {
                path: '/help',
                element: <TokenAccess><Help/></TokenAccess>
            },
            {
                path:'/how-use',
                element: <TokenAccess><HowUse/></TokenAccess>
            },
            {
                path: 'user-profile',
                element: <TokenAccess><UserProfile /></TokenAccess>,
                loader: servicesApp.getProfile
            },
            {
                path: 'connected-devices',
                element: <TokenAccess><ConnectedDevices /></TokenAccess>
            },
            {
                path: 'notification-mailbox',
                element: <TokenAccess><NotificationMailbox /></TokenAccess>,
                loader: servicesApp.getNotifications
            },
            {
                path: 'password-generator/:id?',
                element: <TokenAccess><PasswordGenerator/></TokenAccess>,
                loader: servicesApp.getAplications
            },
            {
                path: 'recovery-password',
                element: <RecoverPasswordForm />
            },
            {
                path:'accounts-user',
                element: <AccountsUser />,
                 loader: servicesApp.getAplications
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
