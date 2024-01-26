import React from "react";

const HeaderLogin = (): React.JSX.Element => {
  return (
    <>
      <header className="w-screen bg-black h-32 flex items-center">
        <img src="/src/images/logo.svg" alt="logo" className="h-2/4 m-4"/>
      </header>
    </>
  );
};

export default HeaderLogin;
