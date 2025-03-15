// import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../Context/ContextProvider';

const PrivateAdminProtector = ({ children }) => {
  const { user } = useAppContext();
  return user && user?.role === "admin" ? (
    children
  ) : (
    <div class="h-screen flex flex-col items-center justify-center bg-black text-white">
      <p class="text-lg font-semibold">
        You do not have permission to access this page.
      </p>
    </div>
  );
  //      if (!user) return <div>You need to be logged in to access this page.</div>

  //   return children
};

export default PrivateAdminProtector;