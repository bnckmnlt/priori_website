import React from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton, LogoutButton } from "../../components/AuthButton";
import {
  GooglePayButtonComponent,
  PayPalButtonComponent,
} from "../../components/PaymentButton";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useErrorAlert } from "../../hooks/useErrorAlert";
import {
  useMobileSize,
  useNewRequest,
  useShowLoader,
} from "../../hooks/util-hooks";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Typography,
  Avatar,
  Alert,
  Card,
  CardBody,
  Chip,
  Accordion,
  AccordionBody,
  AccordionHeader,
  Tooltip,
} from "@material-tailwind/react";

export default function Payment() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [error, setError] = React.useState({ other: null });
  const [processing, setProcessing] = React.useState(false);
  const userTransaction = useLoaderData();
  const [paymentStatus, setPaymentStatus] = React.useState(null);
  const navigate = useNavigate();
  const { isMobile } = useMobileSize();
  const newAxiosRequest = useNewRequest();
  const showLoader = useShowLoader(isLoading, 200);

  const NonAuthErrorAlert = useErrorAlert({
    error: error.other,
    clearError: () => {
      setError((prevError) => ({ ...prevError, other: null }));
    },
  });

  async function STORE_PAYMENT_METHOD() {
    try {
      const response = await newAxiosRequest.post(
        `/billing/${user?.sub}`,
        JSON.stringify({
          paymentMethod: {
            merchantName: "Paypal",
            paymentId: paymentStatus.payload.id,
          },
        })
      );

      if (response.status === 201) {
        console.log(userTransaction.transactionId);
        navigate(`/checkout/payment/success/${userTransaction.transactionId}`, {
          state: { fromRedirect: true },
        });
      } else {
        setError({ error: response.data });
      }
    } catch (error) {
      console.error(error);
      navigate("/error");
    }
  }

  React.useEffect(() => {
    if (paymentStatus !== null) {
      if (paymentStatus.status === "COMPLETED") {
        STORE_PAYMENT_METHOD();
      } else {
        setError({ error: paymentStatus.status });
      }
      setError({ error: "Something went wrong. Please try again" });
    }
  }, [paymentStatus]);

  React.useEffect(() => {
    if (!user && !isAuthenticated) {
      navigate("/");
    }
  }, [user, isAuthenticated, navigate]);

  const paymentOptions = [
    {
      id: 1,
      name: "Google Pay",
      button: user
        ? React.createElement(GooglePayButtonComponent, {
            setProcessing,
            setPaymentStatus,
            user,
            price: userTransaction?.value,
          })
        : React.createElement(
            Button,
            { size: isMobile ? "sm" : "md", disabled: !user },
            "Proceed to Payment"
          ),
    },
    {
      id: 2,
      name: "GCash",
      button: React.createElement(
        Button,
        { size: isMobile ? "sm" : "md", disabled: !user },
        "Proceed to Payment"
      ),
    },
    {
      id: 3,
      name: "GrabPay",
      button: React.createElement(
        Button,
        { size: isMobile ? "sm" : "md", disabled: !user },
        "Proceed to Payment"
      ),
    },
    {
      id: 4,
      name: "PayPal",
      button:
        userTransaction &&
        React.createElement(PayPalButtonComponent, {
          setPaymentStatus,
          price: userTransaction?.value,
          planName: userTransaction?.planName,
        }),
    },
  ];

  if (showLoader || !isAuthenticated || !userTransaction) {
    return <LoadingSpinner opacity='100' />;
  }
  if (processing) {
    return (
      <LoadingSpinner
        opacity='80'
        component={
          <>
            {error.other && <NonAuthErrorAlert />}
            <Typography variant='h5' color='blue-gray' className='mt-4'>
              Order processing...
            </Typography>
            <Typography
              variant='small'
              color='blue-gray'
              className='mt-1 whitespace-pre-wrap'>
              This may take a few seconds, do not close this window.
            </Typography>
          </>
        }
      />
    );
  }
  return (
    <>
      <main className='mx-auto h-max w-full max-w-7xl'>
        <section className='relative mx-auto grid grid-cols-1 gap-x-5 gap-y-12 px-4 pb-4 pt-6 md:grid-cols-12 md:pb-12 lg:gap-x-12'>
          <AccountCardComponent user={user} isMobile={isMobile} />
          <OrderCardComponent user={user} userTransaction={userTransaction} />
          <PaymentMethodCardComponent
            user={user}
            setProcessing={setProcessing}
            setPaymentStatus={setPaymentStatus}
            paymentOptions={paymentOptions}
          />
        </section>
      </main>
    </>
  );
}

function AccountCardComponent({ user, isMobile }) {
  return (
    <div className='col-span-full md:col-span-7'>
      <Typography variant='h5' color='blue-gray' className='md:md-6 mb-4'>
        Account
      </Typography>
      <div className='py-4'>
        {!user && (
          <div>
            <Typography
              variant='small'
              color='blue-gray'
              className='text-center'>
              Please sign in to your existing account or create a new one if you
              haven&apos;t already.
            </Typography>
            <div className='mt-3 flex items-center justify-center gap-4'>
              <LoginButton value='Sign in' size='md' />
            </div>
          </div>
        )}
        {user && (
          <div className='flex flex-col items-center justify-between gap-3 rounded-lg border bg-inherit p-4 text-center sm:flex-row sm:text-left'>
            <div className='flex flex-col items-center gap-4 sm:flex-row '>
              <Avatar src={user?.picture} size='lg' />
              <div>
                <Typography
                  variant='h6'
                  color='blue-gray'
                  className='tracking-tight'>
                  {user?.nickname}
                </Typography>
                <Typography
                  variant='small'
                  color='gray'
                  className='font-normal tracking-tight'>
                  {user?.email}
                </Typography>
              </div>
            </div>
            <div>
              <LogoutButton
                value='not you?'
                size='sm'
                variant='text'
                classname='whitespace-nowrap'
              />
            </div>
          </div>
        )}
        <div className='mt-4 border-t pt-4'>
          <Alert
            icon={
              <InformationCircleIcon strokeWidth={2} className='h-6 w-6' />
            }>
            <ul className='list-inside list-disc'>
              <Typography
                color='blue-gray'
                className='inline-block text-xs leading-normal text-white'>
                By submitting your information and continuing to purchase, you
                agree to our{" "}
                <Link to='/terms-of-service'>
                  <span className='underline underline-offset-2'>
                    Terms of Service
                  </span>
                </Link>{" "}
                and{" "}
                <Link to='/privacy-policy'>
                  <span className='underline underline-offset-2'>
                    Privacy Policy
                  </span>
                  .
                </Link>
              </Typography>
            </ul>
          </Alert>
        </div>
      </div>
    </div>
  );
}

function OrderCardComponent({ user, userTransaction }) {
  return (
    <>
      {user && userTransaction && (
        <div className='top-3 col-span-full row-span-2 h-auto md:sticky md:col-span-5'>
          <Typography variant='h5' color='blue-gray' className='md:md-6 mb-4'>
            Order Summary
          </Typography>
          <Card className='h-auto rounded-lg'>
            <CardBody>
              <div className='space-y-2'>
                <Typography
                  variant='h5'
                  color='blue-gray'
                  className='flex items-center gap-x-2 uppercase'>
                  <Chip value='POS' />
                  {userTransaction.planName}
                </Typography>

                <div className='flex items-center justify-between'>
                  <Typography className='small' color='gray'>
                    {userTransaction.duration === "annually"
                      ? "Annual"
                      : "Monthly"}{" "}
                    Plan (USD {userTransaction.value}
                    .00/
                    {userTransaction.duration === "annually" ? "yr" : "mo"})
                  </Typography>
                  <Typography variant='h6' color='blue-gray'>
                    ${userTransaction.value}.00
                  </Typography>
                </div>
              </div>
              <div className='mt-4 border-t pt-4'>
                <div className='flex items-center space-x-2'>
                  <Typography variant='small' color='gray'>
                    Tax country:
                  </Typography>
                  <Button
                    variant='text'
                    color='blue-gray'
                    className='inline-block p-0 underline underline-offset-2 hover:bg-inherit'>
                    Philippines
                  </Button>
                </div>
                <div className='flex items-center justify-between'>
                  <Typography variant='small' color='gray'>
                    VAT 0%
                  </Typography>
                  <Typography variant='h6' color='blue-gray'>
                    $0.00
                  </Typography>
                </div>
                <div className='mt-6 flex items-center justify-between'>
                  <Typography variant='h6' color='blue-gray'>
                    Total
                  </Typography>
                  <Typography variant='h4' color='blue-gray'>
                    ${userTransaction.total}.00
                  </Typography>
                </div>
              </div>
              <div className='mt-4 border-t pt-4'>
                <button className='text-xs font-semibold uppercase text-light-blue-500 underline decoration-1 underline-offset-2 transition-colors duration-150 ease-in-out hover:text-blue-600'>
                  Got a coupon?
                </button>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </>
  );
}

function Icon({ id, showOption }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={`${
        id === showOption ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}>
      <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
    </svg>
  );
}

function PaymentMethodCardComponent({
  user,
  setProcessing,
  setPaymentStatus,
  paymentOptions,
}) {
  const [showOption, setShowOption] = React.useState(0);

  const toggleOption = (value) => {
    setShowOption(showOption === value ? 0 : value);
  };

  return (
    <div className='col-span-full md:col-span-7'>
      <Typography variant='h5' color='blue-gray' className='md:md-6 mb-4'>
        Payment method
      </Typography>
      <div className='space-y-4 py-4'>
        {paymentOptions.map(({ id, name, button }) => (
          <Accordion
            key={id}
            open={showOption === id}
            icon={<Icon id={id} showOption={showOption} />}>
            <AccordionHeader
              onClick={() => toggleOption(id)}
              className={`text-md text-blue-gray-800 ${
                showOption === id ? "text-blue-500 hover:text-blue-600" : ""
              }`}>
              {name}
            </AccordionHeader>
            <AccordionBody className='py-4 sm:py-6'>
              <Typography variant='small' className='mt-3'>
                Services are subscription-based and will automatically renew
                until you cancel. See subscription and cancellation{" "}
                <Link
                  to='/terms-of-service'
                  className='underline underline-offset-2 hover:text-blue-600'>
                  terms
                </Link>
                .
              </Typography>
              <Typography variant='small' className='mt-3'>
                Payments are charged in PHP. Payment provider fees may apply.
              </Typography>
              <Typography variant='small' className='mt-3'>
                You will be redirected to {name} to complete your purchase
                securely.
              </Typography>
              <div className='mt-5 flex items-center gap-3'>
                {!user && (
                  <Tooltip
                    className='border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10'
                    content={
                      <div className='w-80'>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal opacity-80'>
                          You must be logged in to proceed with your payment.
                        </Typography>
                      </div>
                    }
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}>
                    <InformationCircleIcon
                      strokeWidth={2}
                      className='h-6 w-6 text-blue-500'
                    />
                  </Tooltip>
                )}
                {button}
              </div>
            </AccordionBody>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
