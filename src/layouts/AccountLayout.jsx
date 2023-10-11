import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import useMobileSize from "../hooks/useMobileSize";
import { LogoutButton } from "../components/AuthButton";
import { Breadcrumbs, IconButton, Typography } from "@material-tailwind/react";
import {
  ArrowLeftOnRectangleIcon,
  BellIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  HomeIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

export default function AccountLayout() {
  const { user, isAuthenticated } = useAuth0();
  const { isMobile } = useMobileSize();

  return (
    <>
      <TopBar
        user={user}
        isAuthenticated={isAuthenticated}
        isMobile={isMobile}
      />
      <section className='mx-auto w-full max-w-7xl px-4 py-10'>
        <div className='mb-6'>
          <Breadcrumbs className='bg-inherit p-0 print:hidden md:px-4'>
            <Link to='/' className='w-auto opacity-60'>
              <HomeIcon className='h-4 w-4 text-black' />
            </Link>
            <span>Account Profile</span>
            <Link to='/account/profile'>Profile</Link>
          </Breadcrumbs>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-4'>
          <SettingsSidebar isMobile={isMobile} />
          <div className='col-span-3 mt-12 md:mt-0'>
            <Outlet />
          </div>
        </div>
      </section>
    </>
  );
}

function SettingsSidebar({ isMobile }) {
  const location = useLocation();

  const sidebardList = [
    {
      label: "Account",
      icon: UserCircleIcon,
      ref: "/account/profile",
    },
    {
      label: "Security",
      icon: ShieldCheckIcon,
      ref: "/account/security",
    },
    {
      label: "Notification",
      icon: BellIcon,
      ref: "/account/notification",
    },
    {
      label: "Billing",
      icon: CreditCardIcon,
      ref: "/account/billing",
    },
    {
      label: "Settings",
      icon: Cog6ToothIcon,
      ref: "/account/settings",
    },
  ];

  return (
    <div className='col-span-1 h-full w-full overflow-hidden border-blue-gray-50'>
      <div className='mt-2 flex flex-auto snap-x overflow-x-scroll pb-1 lg:flex-col lg:gap-2 lg:pl-4'>
        {sidebardList.map((item, key) => (
          <Link to={item.ref} key={key} className='snap-center'>
            <div
              className={`flex flex-row items-center justify-center gap-2 px-8 py-3 md:justify-start ${
                location.pathname === item.ref
                  ? "border-b-4 border-blue-500 font-semibold text-blue-500 lg:border-none"
                  : "text-blue-gray-800"
              }`}>
              <item.icon
                className={`h-6 w-6 ${
                  location.pathname === item.ref
                    ? "text-blue-500"
                    : "text-gray-800"
                }`}
                strokeWidth={2}
              />
              <span className='text-medium text-lg tracking-tight transition md:text-base'>
                {item.label}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function TopBar({ user, isAuthenticated, isMobile }) {
  return (
    <main className='mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 print:hidden lg:py-4'>
      <div className='flex flex-row items-center gap-4'>
        <img
          src='/logo.png'
          alt='Priori Systems'
          className='inline-block h-12 w-auto max-w-full'
        />
        <Typography
          variant='h6'
          color='blue'
          className='tracking-tighter'
          textGradient>
          | Account Profile
        </Typography>
      </div>
      {user &&
        isAuthenticated &&
        (!isMobile ? (
          <div>
            <LogoutButton
              variant='outlined'
              color='red'
              value='Sign out'
              size='sm'
            />
          </div>
        ) : (
          <IconButton variant='text' color='pink'>
            <ArrowLeftOnRectangleIcon
              strokeWidth={2}
              className='h-5 w-5 text-pink-500'
            />
          </IconButton>
        ))}
    </main>
  );
}
