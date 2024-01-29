import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
// import { vi } from "vitest";
import Terms from "../src/components/pages/User/terms";
import HowUse from "../src/components/pages/User/HowUse";
import HeaderMenu from "../src/components/templates/HeaderMenu";
import Help from "../src/components/pages/User/Help";
import AccountsUser from "../src/components/pages/User/AccountsUser";
import NotificationMailbox from "../src/components/pages/User/NotificationMailbox";
import PasswordGenerator from "../src/components/pages/User/PasswordGenerator";
import PasswordMasterForm from "../src/components/pages/User/PasswordMasterForm";
import RecoverPasswordForm from "../src/components/pages/User/RecoverPasswordForm";
import UserProfile from "../src/components/pages/User/UserProfile";
import ConnectedDevices from "../src/components/pages/User/ConnectedDevices";
import DashboardAdmin from "../src/components/pages/Admin/DashboardAdmin";
import DashboardIncidents from "../src/components/pages/Admin/DashboardIncidents";
import LoginAdmin from "../src/components/pages/Admin/LoginAdmin";
import NotificationAdmin from "../src/components/pages/Admin/NotificationAdmin";
import UserActivity from "../src/components/pages/Admin/UserActivity";

  
  describe('rendering User', () => { 
  

    //USER
      test('render Terms', () => { 
           const { asFragment } = render(<Terms />);
           expect(asFragment()).toMatchSnapshot()
       })
  
       test('render HeaderMenu', () => {
         const { asFragment } = render(<HeaderMenu />);
         expect(asFragment()).toMatchSnapshot()
       })
  
       test('render HowUse', () => { 
          const { asFragment } = render(<HowUse />);
          expect(asFragment()).toMatchSnapshot()
        })
  
        test('render Help', () => { 
          const { asFragment } = render(<Help />);
          expect(asFragment()).toMatchSnapshot()
         })

        test('render AccountsUser', () => { 
            const {  asFragment } = render(<AccountsUser />)
            expect(asFragment()).toMatchSnapshot()
         })


         test('render NotificationMailBox', () => { 
            const { asFragment } = render(<NotificationMailbox />);
            expect(asFragment()).toMatchSnapshot()
          })

        test('render PassswordGenerator', () => { 
            const { asFragment } = render(<PasswordGenerator />);
            expect(asFragment()).toMatchSnapshot()
         })

         test('render PasswordMaster', () => { 
            const { asFragment } = render(<PasswordMasterForm />);
            expect(asFragment()).toMatchSnapshot()
          })

        test('render RecoveryPassword', () => { 
            const { asFragment } = render(<RecoverPasswordForm />);
            expect(asFragment()).toMatchSnapshot();
         })

        test('render UserProfile', () => { 
            const { asFragment } = render(<UserProfile />);
            expect(asFragment()).toMatchSnapshot();
         });

        test('render ConectedDevices', () => { 
            const { asFragment } = render(<ConnectedDevices />);
            expect(asFragment()).toMatchSnapshot()
         })
  
  })
  



  describe('rendering Admin', () => { 
    test('render ', () => { 
        const { asFragment } = render(<DashboardAdmin />);
        expect(asFragment()).toMatchSnapshot()
     })

     test('render DashboardAdmin', () => { 
        const { asFragment } = render(<DashboardIncidents />);
        expect(asFragment()).toMatchSnapshot()
     })

     test('render LoginAdmin', () => { 
        const { asFragment } = render(<LoginAdmin />);
        expect(asFragment()).toMatchSnapshot()
     })

     test('render NotificationAdmin', () => { 
        const { asFragment } = render(<NotificationAdmin />);
        expect(asFragment()).toMatchSnapshot()
     })


     test('render UserActivity', () => { 
        const { asFragment } = render(<UserActivity />);
        expect(asFragment()).toMatchSnapshot()
     })
   })