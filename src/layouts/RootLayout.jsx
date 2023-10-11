import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../components/Navbar";
import { RootFooter } from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  Button,
  IconButton,
  SpeedDial,
  SpeedDialAction,
  SpeedDialContent,
  SpeedDialHandler,
  Tooltip,
} from "@material-tailwind/react";
import {
  ArrowUpIcon,
  CogIcon,
  EnvelopeIcon,
  EnvelopeOpenIcon,
  HomeIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";

const RootLayout = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <LoadingSpinner opacity={100} />;
  }
  return (
    <main className='relative'>
      <Navbar />
      <Outlet />
      <RootFooter />
      <CustomerSupportButton />
    </main>
  );
};

function Background() {
  return (
    <div className='absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]'>
      <svg
        className='relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] opacity-30 sm:left-[calc(50%-30rem)] sm:h-[42.375rem]'
        viewBox='0 0 1155 678'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          fill='url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)'
          fillOpacity='.3'
          d='M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z'
        />
        <defs>
          <linearGradient
            id='45de2b6b-92d5-4d68-a6a0-9b9b2abad533'
            x1='1155.49'
            x2='-78.208'
            y1='.177'
            y2='474.645'
            gradientUnits='userSpaceOnUse'>
            <stop stopColor='#26c6da'></stop>
            <stop offset='1' stopColor='#1e88e5'></stop>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function CustomerSupportButton() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  return (
    <React.Fragment>
      <div className='fixed bottom-8 right-8 z-[49]'>
        <div className='flex flex-col gap-3 md:flex-row'>
          {showTopBtn && (
            <Tooltip
              content='Scroll to the top screen'
              className='bg-white bg-opacity-80 text-sm text-blue-gray-700 shadow-sm'>
              <Button
                variant='gradient'
                color='white'
                className='relative h-12 w-12 rounded-full align-middle'
                onClick={() => goToTop()}>
                <ArrowUpIcon
                  strokeWidth={2}
                  className='absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 transform text-blue-500'
                />
              </Button>
            </Tooltip>
          )}
          <SpeedDial>
            <SpeedDialHandler>
              <IconButton variant='gradient' size='lg' className='rounded-full'>
                <EnvelopeOpenIcon className='hidden h-5 w-5 group-hover:block' />
                <EnvelopeIcon className='block h-5 w-5 group-hover:hidden' />
              </IconButton>
            </SpeedDialHandler>
            <SpeedDialContent>
              <SpeedDialAction>
                <HomeIcon className='h-5 w-5' />
              </SpeedDialAction>
              <SpeedDialAction>
                <CogIcon className='h-5 w-5' />
              </SpeedDialAction>
              <SpeedDialAction>
                <Square3Stack3DIcon className='h-5 w-5' />
              </SpeedDialAction>
            </SpeedDialContent>
          </SpeedDial>
        </div>
      </div>
    </React.Fragment>
  );
}

export default RootLayout;
