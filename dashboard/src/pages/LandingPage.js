import React from 'react';

// ----------------------------------------------------------------------



const redirect = () => {
  window.location.href = "https://saas-listapp-dashboard.vercel.app/auth/login-unprotected";
}

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <>
     {redirect()}
    </>
  );
}
