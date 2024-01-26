import Navbar from '../../templates/Navbar'
import HeaderMenu from '../../templates/HeaderMenu'
import React from 'react'
import AccountsForm from '../../organisms/AccountsForm'

const AccountsUser = ():React.JSX.Element => {
  return (
    <>
    <HeaderMenu />

    <section className='flex'>
    <Navbar cuentas/>
    <AccountsForm />
    </section>
    </>
  )
}

export default AccountsUser;