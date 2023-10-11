import { Outlet } from "react-router-dom";
import { Typography } from "@material-tailwind/react";

export default function CheckoutLayout() {
  return (
    <>
      <TopBar />
      <Outlet />
    </>
  );
}

function TopBar() {
  return (
    <div className='mx-auto flex max-w-7xl items-center gap-4 px-2 py-2 lg:py-4'>
      <img
        src='/logo.png'
        alt='Priori Systems'
        className='inline-block h-12 w-auto max-w-full'
      />
      <Typography
        variant='h6'
        color='blue-gray'
        className='tracking-tighter'
        textGradient>
        | Checkout
      </Typography>
    </div>
  );
}
