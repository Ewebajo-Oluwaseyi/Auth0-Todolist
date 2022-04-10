import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "../Spinner";

const Auth = () => {
  const { loginWithRedirect } = useAuth0();

  const [loading, setLoading] = useState(false);

  const handleRedirect = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      loginWithRedirect();
    }, 2000);
  };
  return (
    <>
      <main className="bg-white rounded overflow-hidden mx-6 xs:mx-auto my-20 max-w-md">
        <div className="px-6 py-8 md:px-8 md:py-10 text-center">
          <h1 className="text-3xl">Auth ToDo</h1>
          <button
            className="btn bg-primary w-full h-12 mt-8 hover:bg-white hover:border-primary border-2 hover:text-primary hover:outline-none"
            type="submit"
            onClick={handleRedirect}
          >
            {loading ? <Spinner /> : "Log In"}
          </button>
        </div>
      </main>
    </>
  );
};

export default Auth;
