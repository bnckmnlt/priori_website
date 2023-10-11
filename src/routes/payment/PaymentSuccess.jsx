import React from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useNewRequest, formatDate } from "../../hooks/util-hooks";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  ComputerDesktopIcon,
  ClockIcon,
  CurrencyDollarIcon,
  CreditCardIcon,
  BanknotesIcon,
  PaperClipIcon,
  ArrowDownTrayIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

export default function PaymentSuccess() {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [userTransaction, setUserTransaction] = React.useState();
  const { transactionId } = useParams();
  const location = useLocation();
  const newAxiosRequest = useNewRequest();
  const [redirected, setRedirected] = React.useState(null);

  async function GET_USER_INVOICE() {
    try {
      const response = await newAxiosRequest.get(
        `/billing/invoice/${user?.sub}/${transactionId}`
      );

      if (response.status === 200 && response.data) {
        setUserTransaction(response.data);
      } else {
        navigate("/error");
      }
    } catch (error) {
      console.error(error);
      navigate("/error");
    }
  }

  const handleUnauthenticatedUser = () => {
    navigate("/");
  };

  React.useEffect(() => {
    if (location.state && location.state.fromRedirect) {
      setRedirected(true);
    }
  }, [location.state]);

  React.useEffect(() => {
    if (user && isAuthenticated && !userTransaction) {
      GET_USER_INVOICE();
    } else {
      if (!redirected) {
        handleUnauthenticatedUser();
      }
    }
  }, [user, isAuthenticated, navigate, transactionId, redirected]);

  return (
    redirected &&
    userTransaction && (
      <>
        <section className='relative isolate overflow-hidden py-16 '>
          <div className='mx-auto w-full max-w-7xl px-6 lg:px-8'>
            <div className='flex flex-col items-start gap-20 lg:flex-row lg:gap-8'>
              <CardComponentOne userTransaction={userTransaction} user={user} />
              <CardComponentTwo />
            </div>
          </div>
        </section>
      </>
    )
  );
}

function CardComponentOne({ userTransaction, user }) {
  const paymentCaptions = [
    {
      id: 1,
      label: "Transaction ID",
      icon: React.createElement(CubeTransparentIcon, {
        strokeWidth: 2,
        className: "text-emerald-500",
      }),
      value: userTransaction?.transactionId,
    },
    {
      id: 2,
      label: "Selected Plan",
      icon: React.createElement(ComputerDesktopIcon, {
        strokeWidth: 2,
        className: "text-emerald-500",
      }),
      value: userTransaction?.planName,
    },
    {
      id: 3,
      label: "Price",
      icon: React.createElement(CurrencyDollarIcon, {
        strokeWidth: 2,
        className: "text-emerald-500",
      }),
      value: `$${userTransaction?.value}.00`,
    },
    {
      id: 4,
      label: "Total Price",
      icon: React.createElement(BanknotesIcon, {
        strokeWidth: 2,
        className: "text-emerald-500",
      }),
      value: `$${userTransaction?.total}.00`,
    },
    {
      id: 5,
      label: "Payment Method",
      icon: React.createElement(CreditCardIcon, {
        strokeWidth: 2,
        className: "text-emerald-500",
      }),
      value: userTransaction?.paymentMethod?.merchantName,
    },
    {
      id: 6,
      label: "Date & Time",
      icon: React.createElement(ClockIcon, {
        strokeWidth: 2,
        className: "text-emerald-500",
      }),
      value: formatDate(userTransaction?.createdAt),
    },
  ];

  return (
    <div className='w-full lg:w-1/2'>
      <div className='w-full max-w-xl text-center md:text-left'>
        <Typography
          color='blue'
          variant='h1'
          textGradient
          className='mb-4 font-extrabold tracking-tight'>
          Great! Everything is ready!
        </Typography>
        <Typography
          color='blue-gray'
          variant='paragraph'
          className='mx-auto max-w-md font-normal tracking-tight md:mx-0'>
          You will receive a confirmation email soon with your transaction
          details.
        </Typography>
      </div>
      <div className='mt-14 flex flex-col lg:mt-20'>
        <div className='grid grid-cols-2 gap-6 md:gap-8'>
          {paymentCaptions.map((item) => (
            <div
              className='flex flex-col items-center gap-2 text-center md:flex-row md:gap-4 md:text-left'
              key={item.id}>
              <div className='h-12 w-12 rounded-full bg-emerald-100/70 p-3.5'>
                {item.icon}
              </div>
              <div>
                <span className='block text-sm font-semibold tracking-tight text-blue-gray-200'>
                  {item.label}
                </span>
                <span className='text-md font-bold text-blue-gray-700'>
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className='mt-12 self-center md:self-start'>
          <Link to='/'>
            <Button
              variant='filled'
              size='lg'
              className='rounded-full normal-case'>
              Go to homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function CardComponentTwo() {
  return (
    <div className='relative mb-auto mt-7 h-full w-full lg:block lg:w-1/2'>
      <div className='absolute -left-4 top-0 h-72 w-72 rotate-6 animate-blob rounded-3xl bg-light-blue-100 opacity-70 mix-blend-multiply blur-xl filter'></div>
      <div className='animation-delay-2000 absolute -right-4 top-0 h-72 w-72 rotate-12 animate-blob rounded-3xl bg-cyan-100 opacity-70 mix-blend-multiply blur-xl filter'></div>
      <div className='animation-delay-4000 absolute -bottom-8 left-20 h-72 w-72 rotate-45 animate-blob rounded-3xl bg-blue-100 opacity-70 mix-blend-multiply blur-xl filter'></div>
      <div className='relative space-y-4 sm:m-10'>
        <div className='mb-8'>
          <Typography
            variant='h4'
            className='text-center font-extrabold tracking-tight text-blue-gray-800'>
            You can start using all the features included in your plan by simply
            activating your license
          </Typography>
        </div>
        <div className='flex items-center justify-between space-x-8 rounded-lg bg-white p-5 drop-shadow-sm'>
          <span className='text-sm font-semibold tracking-tight text-blue-gray-700'>
            Download Priori POS software
          </span>
          <div>
            <IconButton size='md' color='light-blue'>
              <ArrowDownTrayIcon strokeWidth={2} className='h-4 w-4' />
            </IconButton>
          </div>
        </div>
        <div className='flex items-center justify-between space-x-8 rounded-lg bg-white p-5 drop-shadow-sm'>
          <span className='text-sm font-semibold tracking-tight text-blue-gray-700'>
            Download Invoice
          </span>
          <div>
            <IconButton size='md' color='blue'>
              <PaperClipIcon strokeWidth={2} className='h-4 w-4' />
            </IconButton>
          </div>
        </div>
        <div className='flex items-center justify-between space-x-8 rounded-lg bg-white p-5 drop-shadow-sm'>
          <span className='text-sm font-semibold tracking-tight text-blue-gray-700'>
            Manage Sales and Reports
          </span>
          <div>
            <IconButton size='md' color='cyan'>
              <ArrowRightIcon strokeWidth={2} className='h-4 w-4' />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
}
