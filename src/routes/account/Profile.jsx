import { useAuth0 } from "@auth0/auth0-react";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Avatar, Button, Chip, Typography } from "@material-tailwind/react";
import {
  ArrowRightIcon,
  ChevronDownIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading && !isAuthenticated && user) {
    return <LoadingSpinner opacity='100' />;
  }
  return (
    <div className='w-full lg:px-12'>
      <div>
        <Typography
          variant='h3'
          color='blue-gray'
          className='mb-2 tracking-tight'>
          Account
        </Typography>
        <Typography variant='paragraph' color='gray' className=' font-medium'>
          Manage your account information
        </Typography>
        <div className='mt-12 w-full space-y-10'>
          <div>
            <Typography
              variant='h5'
              color='blue-gray'
              className='w-full border-b border-blue-gray-50 tracking-tight'>
              Profile
            </Typography>
            <div className='px-2 py-3'>
              <div className='group/card flex flex-row items-center justify-between rounded-xl p-3 transition ease-in-out hover:cursor-pointer hover:bg-blue-gray-50/30'>
                <div className='flex flex-row items-center gap-4'>
                  <Avatar size='md' src={user?.picture} />
                  <span className='font-semibold tracking-tight text-blue-gray-900'>
                    Antonio E.
                  </span>
                </div>
                <ArrowRightIcon
                  className='hidden h-4 w-4 text-blue-gray-400 group-hover/card:block'
                  strokeWidth={2}
                />
              </div>
            </div>
          </div>
          <div>
            <Typography
              variant='h5'
              color='blue-gray'
              className='w-full border-b border-blue-gray-50 tracking-tight'>
              Business name
            </Typography>
            <div className='p-2'>
              <div className='group/card flex flex-row items-end justify-between rounded-xl p-3 transition ease-in-out hover:cursor-pointer hover:bg-blue-gray-50/30 md:items-center'>
                <div className='flex w-full flex-col items-start gap-2 md:flex-row md:items-center md:justify-between'>
                  <span className='text-lg font-medium tracking-tight text-blue-gray-900'>
                    SwiftShip Philippines
                  </span>
                  <ArrowRightIcon
                    className='hidden h-4 w-4 text-blue-gray-400 md:group-hover/card:block'
                    strokeWidth={2}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <Typography
              variant='h5'
              color='blue-gray'
              className='w-full border-b border-blue-gray-50 tracking-tight'>
              Email Addresses
            </Typography>
            <div className='p-2'>
              <div className='group/card flex flex-row items-end justify-between rounded-xl p-3 transition ease-in-out hover:cursor-pointer hover:bg-blue-gray-50/30 md:items-center'>
                <div className='flex flex-col-reverse items-start gap-2 md:flex-row md:items-center'>
                  <span className='text-sm font-semibold tracking-tight text-blue-gray-900'>
                    {user?.email}
                  </span>
                  <Chip variant='ghost' value='primary' />
                </div>
                <ChevronDownIcon
                  className='hidden h-4 w-4 text-blue-gray-400 md:block'
                  strokeWidth={2}
                />
              </div>
              <div className='group/add mt-1 flex items-center gap-3 rounded-lg p-2 hover:cursor-pointer hover:bg-blue-50'>
                <PlusIcon
                  className='h-4 w-4 text-blue-500 group-hover/add:text-blue-600'
                  strokeWidth={2}
                />
                <Typography
                  color='blue'
                  className='text-sm font-semibold tracking-tight group-hover/add:text-blue-600'>
                  Add an email address
                </Typography>
              </div>
            </div>
          </div>
          <div>
            <Typography
              variant='h5'
              color='blue-gray'
              className='w-full border-b border-blue-gray-50 tracking-tight'>
              Account Deletion
            </Typography>
            <div className='px-2 py-3'>
              <div className='flex flex-col items-start gap-4 rounded-xl p-3 transition ease-in-out md:flex-row md:items-center md:justify-between'>
                <div>
                  <span className='text-sm font-bold tracking-tight text-blue-gray-900'>
                    Delete Account
                  </span>
                  <p className='text-sm tracking-tight text-gray-600'>
                    Delete your account and all its associated data
                  </p>
                </div>
                <Button variant='filled' color='red'>
                  Delete account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
