import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { LogoutButton } from "../components/AuthButton";
import { useMobileSize } from "../hooks/util-hooks";
import {
  XMarkIcon,
  Bars3Icon,
  ChevronRightIcon,
  UserCircleIcon,
  ShieldCheckIcon,
  BellIcon,
  CreditCardIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import {
  Typography,
  IconButton,
  Drawer,
  Button,
  List,
  Menu,
  MenuHandler,
  Avatar,
  MenuList,
  Navbar,
  MenuItem,
} from "@material-tailwind/react";

export default function NavBar() {
  const { user, isAuthenticated } = useAuth0();
  const { isMobile } = useMobileSize();
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const currentUser = useSelector((state) => state.auth.currentUser);

  React.useEffect(() => {
    isMobile && setOpen(false);
  }, [isMobile]);

  return (
    <Navbar
      className='mx-auto max-w-7xl bg-transparent px-2 py-2 lg:py-4'
      color='white'
      blurred={false}
      shadow={false}>
      <div className='font-inter flex items-center justify-between'>
        <div className='flex h-12 items-center'>
          <Link
            to='/'
            className='ring-none h-12 outline-none transition duration-300 ease-in-out hover:scale-110 sm:h-14 md:h-16 xl:w-40'>
            <img
              src='/logo.png'
              alt='Priori Systems'
              className='inline-block h-auto max-h-full w-auto max-w-full'
            />
          </Link>
          <div className='hidden md:block'>
            <Navlist />
          </div>
        </div>
        <div>
          <div className='flex flex-row items-center gap-2'>
            {isAuthenticated && user && currentUser && (
              <div className='h-full self-center'>
                <ProfileButton user={user} currentUser={currentUser} />
              </div>
            )}
            <IconButton
              variant='text'
              color='blue-gray'
              className='md:hidden'
              ripple={true}
              onClick={openDrawer}>
              {open ? (
                <XMarkIcon className='h-6 w-6' strokeWidth={2} />
              ) : (
                <Bars3Icon className='h-6 w-6' strokeWidth={2} />
              )}
            </IconButton>
          </div>
          <Drawer open={open} placement='right' onClose={closeDrawer}>
            <div className='flex h-full flex-col gap-8'>
              <div className='m-2 flex justify-end'>
                <IconButton
                  variant='text'
                  color='blue-gray'
                  onClick={closeDrawer}
                  fullWidth>
                  <XMarkIcon strokeWidth={2} className='h-5 w-5' />
                </IconButton>
              </div>
              <Navlist />
              <div className='border-slate-100 flex flex-wrap justify-center gap-4 border-t p-5'>
                {isAuthenticated && user ? (
                  <LogoutButton
                    value='sign out account'
                    size='md'
                    variant='text'
                  />
                ) : (
                  <>
                    <Link to='/auth/signin'>
                      <Button size='sm'>Sign in</Button>
                    </Link>
                    <Link to='/auth/signin'>
                      <Button size='sm'>Sign up</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </Drawer>
        </div>
        {!user && (
          <div className='hidden items-center gap-4 md:block'>
            <Link to='/auth/signin'>
              <Button value='Get started' size='sm'>
                Get started
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Navbar>
  );
}

function Navlist() {
  const location = useLocation();

  const menuItems = [
    { path: "", label: "Home" },
    { path: "features", label: "Features" },
    { path: "pricing", label: "Pricing" },
    { path: "download", label: "Download" },
  ];

  return (
    <List className='flex flex-grow flex-col gap-x-8 gap-y-8 px-10 md:flex-row'>
      {menuItems.map((menuItem, index) => (
        <Link to={menuItem.path} key={index}>
          <Typography
            variant='small'
            color='blue-gray'
            className={`flex items-center ${
              location.pathname === `/${menuItem.path}` ? "text-blue-500" : ""
            } justify-between font-semibold decoration-2 transition duration-150 ease-in-out  hover:text-blue-500`}>
            {menuItem.label}
            <ChevronRightIcon className='block h-5 w-5 md:hidden' />
          </Typography>
        </Link>
      ))}
    </List>
  );
}

function ProfileButton({ user, currentUser }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuList = [
    {
      location: "/account/profile",
      icon: React.createElement(UserCircleIcon, {
        strokeWidth: 2,
        className: "h-4 w-4",
      }),
      label: React.createElement(
        Typography,
        {
          variant: "small",
          className: "font-normal",
        },
        "Profile"
      ),
    },
    {
      location: "/account/security",
      icon: React.createElement(ShieldCheckIcon, {
        strokeWidth: 2,
        className: "h-4 w-4",
      }),
      label: React.createElement(
        Typography,
        {
          variant: "small",
          className: "font-normal",
        },
        "Security"
      ),
    },
    {
      location: "/account/notification",
      icon: React.createElement(BellIcon, {
        strokeWidth: 2,
        className: "h-4 w-4",
      }),
      label: React.createElement(
        Typography,
        {
          variant: "small",
          className: "font-normal",
        },
        "Notification"
      ),
    },
    {
      location: "/account/billing",
      icon: React.createElement(CreditCardIcon, {
        strokeWidth: 2,
        className: "h-4 w-4",
      }),
      label: React.createElement(
        Typography,
        {
          variant: "small",
          className: "font-normal",
        },
        "Billing"
      ),
    },
    {
      location: "/account/settings",
      icon: React.createElement(Cog6ToothIcon, {
        strokeWidth: 2,
        className: "h-4 w-4",
      }),
      label: React.createElement(
        Typography,
        {
          variant: "small",
          className: "font-normal",
        },
        "Settings"
      ),
    },
  ];

  return (
    user &&
    currentUser && (
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement='bottom-end'>
        <MenuHandler>
          <div className='flex flex-row items-center gap-1.5 rounded-full border px-1.5 py-1 shadow-sm'>
            <div className='flex items-center gap-4'>
              <Avatar src={user.picture} size='xs' alt='avatar' />
            </div>
            <ChevronDownIcon
              strokeWidth={2}
              className={`hidden h-5 w-5 text-blue-gray-700 transition-transform md:block ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </MenuHandler>
        <MenuList>
          {menuList.map((item) => (
            <Link to={item.location} key={item.location}>
              <MenuItem className='flex items-center gap-2'>
                {item.icon}
                {item.label}
              </MenuItem>
            </Link>
          ))}
          <div className='my-2 border-t border-gray-50' />
          <LogoutButton
            value='sign out'
            size='sm'
            variant='text'
            color='red'
            classname='w-full'
          />
        </MenuList>
      </Menu>
    )
  );
}
