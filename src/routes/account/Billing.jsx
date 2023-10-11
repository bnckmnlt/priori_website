import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useNewRequest, formatDate, getDaysLeft } from "../../hooks/util-hooks";
import {
  XMarkIcon,
  InformationCircleIcon,
  CheckIcon,
  ClockIcon,
  ArrowDownLeftIcon,
  ChevronRightIcon,
  KeyIcon,
  Square2StackIcon,
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
  DocumentIcon,
  CheckCircleIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  Chip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Input,
  Typography,
  Tooltip,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

export default function Billing() {
  const newAxiosRequest = useNewRequest();
  const { isAuthenticated, user } = useAuth0();
  const [userSubscription, setUserSubscription] = useState(null);
  const billingRecords = useLoaderData();

  async function GET_USER_SUBSCRIPTION() {
    try {
      const response = await newAxiosRequest.get(`/auth/${user?.sub}`);

      if (response.status === 200) {
        setUserSubscription(response.data.subscription);
      } else {
        console.error(response.data);
      }
    } catch (e) {
      console.error(e.code);
    }
  }

  useEffect(() => {
    if (!userSubscription) {
      GET_USER_SUBSCRIPTION();
    }
  }, [user, isAuthenticated, billingRecords, userSubscription]);

  return userSubscription && billingRecords ? (
    <div className='w-full lg:px-12'>
      <div className='flex flex-col items-start'>
        <Typography
          variant='h3'
          color='blue-gray'
          className='mb-2 tracking-tight'>
          Billing and Invoices
        </Typography>
        <Typography
          variant='paragraph'
          color='gray'
          className='font-medium tracking-tight'>
          Manage your transactions and view your current subscription
        </Typography>
      </div>
      <SubscriptionSection userSubscription={userSubscription} />
      <LicenseCard userSubscription={userSubscription} />
      <TransactionSection billingRecords={billingRecords} />
    </div>
  ) : (
    <div className='flex h-auto w-full items-center justify-center'>
      <Typography variant='h4' color='blue-gray' className='tracking-tight'>
        Nothing to display here
      </Typography>
    </div>
  );
}

function SubscriptionSection({ userSubscription }) {
  const [cancelSubscription, setCancelSubscription] = useState(false);

  const handleOpen = () => setCancelSubscription(!cancelSubscription);

  return (
    <>
      <Dialog open={cancelSubscription} handler={handleOpen} size='xs'>
        <DialogHeader>
          <div className='relative flex w-full items-center justify-center'>
            <Typography variant='h6' color='blue-gray'>
              Cancel Subscription
            </Typography>
            <div className='absolute right-0'>
              <IconButton variant='text' color='blue-gray' onClick={handleOpen}>
                <XMarkIcon className='h-5 w-5' strokeWidth={2} />
              </IconButton>
            </div>
          </div>
        </DialogHeader>
        <DialogBody>
          <div className='flex flex-col justify-center gap-3'>
            <Typography
              variant='paragraph'
              color='gray'
              className='text-sm tracking-tight'>
              Kindly be advised that canceling your subscription will cease all
              future billing and restrict access to paid features. It is
              important to note that you may forfeit specific benefits and
              content upon cancellation.
            </Typography>
            <div></div>
            <span className='text-sm font-medium tracking-tight text-blue-gray-800'>
              To confirm, please enter your account password below:
            </span>
            <Input label='Password' />
            <div className='flex flex-row items-start gap-2'>
              <InformationCircleIcon className='h-5 w-5 text-blue-500' />
              <span className='text-xs font-medium tracking-tight text-blue-500'>
                The refund processing time may vary based on your selected
                payment method.
              </span>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant='filled' color='red' onClick={handleOpen} disabled>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <div className='mt-16'>
        <span className='text-lg font-bold tracking-tight text-blue-gray-800'>
          Current Plan
        </span>
      </div>
      <div className='mt-6 flex flex-col gap-6 md:flex-row md:px-4'>
        <div className='relative flex h-auto w-full flex-col justify-center rounded-md border-2 border-blue-500 bg-blue-50/20 px-5 py-7 md:w-1/2'>
          <div>
            <div className='absolute -right-3 -top-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 p-1'>
              <CheckIcon className='h-3 w-3 text-white' strokeWidth={3} />
            </div>
            <div className='flex flex-col justify-between gap-8 md:flex-row'>
              <div>
                <Typography
                  variant='h5'
                  color='blue-gray'
                  className='tracking-tight'>
                  {userSubscription.currentPlan.planName}
                </Typography>
                <div className='flex flex-row items-center gap-1'>
                  <ClockIcon
                    className='h-4 w-4 text-gray-500'
                    strokeWidth={2}
                  />
                  <span className='text-sm tracking-tight text-gray-500'>
                    Duration:{" "}
                    {userSubscription.currentPlan.duration === "monthly"
                      ? "30 Days"
                      : "1 Year"}
                  </span>
                </div>
              </div>
              <div>
                <Typography
                  variant='small'
                  color='blue-gray'
                  className='whitespace-nowrap text-left md:text-right'>
                  Billed at:
                </Typography>
                <Typography
                  variant='h4'
                  color='blue-gray'
                  className='whitespace-nowrap text-left font-bold uppercase leading-normal md:leading-6'>
                  ${userSubscription.currentPlan.value}.00
                  <span className='text-sm font-medium normal-case text-gray-600'>
                    {userSubscription.currentPlan.duration === "monthly"
                      ? "/month"
                      : "/year"}
                  </span>
                </Typography>
              </div>
            </div>
          </div>
          <div className='mt-7 flex h-fit flex-row-reverse items-center justify-between'>
            <Button
              variant='outlined'
              size='sm'
              className='bg-white/20'
              onClick={handleOpen}>
              Cancel Plan
            </Button>
            <Chip
              variant='ghost'
              size='sm'
              value={
                getDaysLeft(userSubscription?.currentPlan?.expiresAt) +
                " days left"
              }
              className='rounded-full'
            />
          </div>
        </div>
        <div className='flex h-full w-full flex-grow flex-col justify-center rounded-md bg-blue-500 px-5 py-7 md:w-1/2'>
          <div>
            <div className='flex flex-col justify-between gap-8 md:flex-row'>
              <div>
                <Typography
                  variant='h5'
                  color='white'
                  className='tracking-tight'>
                  Restaurant POS
                </Typography>
                <div className='flex flex-row items-center gap-1'>
                  <ClockIcon
                    className='h-4 w-4 text-white/75'
                    strokeWidth={2}
                  />
                  <span className='text-sm tracking-tight text-white/75'>
                    Duration: 1 year
                  </span>
                </div>
              </div>
              <div className='self-start'>
                <Typography
                  variant='small'
                  color='white'
                  className='whitespace-nowrap text-left md:text-right'>
                  Billed at:
                </Typography>
                <Typography
                  variant='h4'
                  color='white'
                  className='whitespace-nowrap text-left font-bold uppercase leading-6'>
                  $510.00
                  <span className='text-sm font-medium normal-case text-white/60'>
                    /year
                  </span>
                </Typography>
              </div>
            </div>
          </div>
          <div className='mt-7 flex flex-row items-center justify-between'>
            <Button
              variant='filled'
              color='white'
              size='sm'
              className='flex items-center gap-2'>
              <ArrowDownLeftIcon className='h-3 w-3' strokeWidth={2} />
              Upgrade plan
            </Button>
            <Link to=''>
              <div className='flex flex-row items-center justify-center gap-1 rounded-full bg-blue-600 px-4 py-1.5 shadow-sm transition-colors duration-200 ease-linear hover:bg-blue-700'>
                <span className='text-xs font-semibold tracking-tight text-white '>
                  Learn more
                </span>
                <ChevronRightIcon
                  className='h-4 w-4 text-white'
                  strokeWidth={2}
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function LicenseCard({ userSubscription }) {
  return (
    <>
      <div className='mt-16 flex flex-row items-center gap-2'>
        <span className='text-lg font-bold tracking-tight text-blue-gray-800'>
          License
        </span>
        <Tooltip
          placement='bottom'
          className='border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10'
          content={
            <div className='w-80'>
              <Typography
                variant='small'
                color='blue-gray'
                className='font-normal opacity-80'>
                For smaller screens, the license key can be copied by clicking
                the license text. The license key being displayed is an
                encrypted version which can be verified through the software.
              </Typography>
            </div>
          }>
          <InformationCircleIcon
            className='h-4 w-4 text-blue-gray-800'
            strokeWidth={2}
          />
        </Tooltip>
      </div>
      {userSubscription && (
        <div className='mt-5 flex w-auto flex-col items-center gap-4 rounded-lg p-4 shadow-sm transition-all delay-150 duration-75 ease-in-out hover:border-2 hover:border-blue-200 hover:bg-blue-50/20 hover:shadow-none md:w-fit md:flex-row md:px-6 md:py-8'>
          <div className='flex items-center justify-center self-start rounded-lg bg-amber-50 p-3.5 shadow-sm md:self-center'>
            <KeyIcon className='h-8 w-8 text-amber-700' strokeWidth={2} />
          </div>
          <div className='flex w-full flex-col gap-2 self-start md:gap-1 md:self-center'>
            <div className='flex flex-row'>
              <p className='cursor-pointer truncate text-2xl font-extrabold tracking-tight text-blue-gray-800 md:max-w-sm md:cursor-auto'>
                {userSubscription.license.key}
              </p>
              <IconButton
                onClick={() =>
                  navigator.clipboard.writeText(userSubscription.license.key)
                }
                variant='text'
                size='sm'
                color='white'
                className='hidden md:block'>
                <Square2StackIcon
                  className='h-5 w-5 text-blue-900'
                  strokeWidth={2}
                />
              </IconButton>
            </div>
            <div className='flex flex-col-reverse justify-start gap-1 md:mt-0 md:flex-row md:gap-2'>
              <Typography className='text-sm font-medium tracking-tight text-gray-500'>
                Expires on{" "}
                <span className='font-semibold text-gray-700'>
                  {formatDate(userSubscription.license.expiresAt)}
                </span>
              </Typography>
              <div className='flex items-center gap-2'>
                <div className='h-2 w-2 rounded-full bg-emerald-500'></div>
                <span className='text-sm font-semibold leading-tight tracking-tight text-gray-700'>
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function TransactionSection({ billingRecords }) {
  const initialSortedBillingRecords = [...billingRecords].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA;
  });

  const [sortedBillingRecords, setSortedBillingRecords] = useState(
    initialSortedBillingRecords
  );
  const [sortOrder, setSortOrder] = useState("desc");

  const formatDate = (createdAt) => {
    if (typeof createdAt !== "string") {
      return "";
    }

    const createdAtDate = new Date(createdAt);
    const formattedDate = createdAtDate.toLocaleDateString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });

    return formattedDate;
  };

  const handleSort = () => {
    setSortOrder((prevSortOrder) =>
      prevSortOrder === "desc" ? "asc" : "desc"
    );

    const sortedRecords =
      sortOrder === "desc"
        ? initialSortedBillingRecords.reverse()
        : initialSortedBillingRecords;
    setSortedBillingRecords(sortedRecords);
  };

  return (
    sortedBillingRecords && (
      <>
        <div className='mt-16'>
          <span className='text-lg font-bold tracking-tight text-blue-gray-800'>
            Transactions
          </span>
        </div>
        <div className='mt-5 overflow-hidden text-left text-sm tracking-tight text-blue-gray-900'>
          <div className='px-3 py-6'>
            <Typography
              variant='h6'
              color='blue-gray'
              className='text-base tracking-tight'>
              Billing Records
            </Typography>
            <Typography color='gray' className='mt-1 text-sm tracking-tight '>
              Access your past transaction receipts and explore your usage
              details.
            </Typography>
            <div className='mt-7 flex max-w-sm items-center gap-3 rounded-lg pl-3'>
              <MagnifyingGlassIcon
                className='h-5 w-5 cursor-pointer text-blue-gray-800'
                strokeWidth={2}
              />
              <Input
                className='border-none placeholder:text-blue-gray-300'
                placeholder='Search by reference ID, subscription, date, etc.'
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
          </div>
          <div className='overflow-x-auto'>
            <table className='w-full min-w-max table-auto border-collapse'>
              <thead className='bg-blue-gray-50/20 text-blue-gray-500 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th
                    scope='col'
                    className='rounded-l-lg px-6 py-3 font-medium'>
                    Reference ID
                  </th>
                  <th scope='col' className='px-6 py-3 font-medium'>
                    Status
                  </th>
                  <th scope='col' className='px-6 py-3 font-medium'>
                    Subscription
                  </th>
                  <th scope='col' className='px-6 py-3 font-medium'>
                    Payment Method
                  </th>
                  <th scope='col' className='px-6 py-3 font-medium'>
                    <div className='flex items-center'>
                      Billing date
                      <IconButton
                        variant='text'
                        color='white'
                        ripple={false}
                        className='p-0'
                        onClick={handleSort}>
                        <ChevronUpDownIcon
                          className='h-4 w-4 text-blue-gray-800 hover:text-blue-500 active:text-blue-700'
                          strokeWidth={2}
                        />
                      </IconButton>
                    </div>
                  </th>
                  <th scope='col' className='px-6 py-3 font-medium'>
                    <div className='flex items-center'>
                      Total Amount
                      <IconButton
                        variant='text'
                        color='white'
                        ripple={false}
                        className='p-0'
                        onClick={handleSort}>
                        <ChevronUpDownIcon
                          className='h-4 w-4 text-blue-gray-800 hover:text-blue-500 active:text-blue-700'
                          strokeWidth={2}
                        />
                      </IconButton>
                    </div>
                  </th>
                  <th
                    scope='col'
                    className='rounded-r-lg px-6 py-3 text-center'></th>
                </tr>
              </thead>
              <tbody>
                {sortedBillingRecords.map((item, key) => (
                  <tr
                    key={key}
                    className='bg-white transition-all delay-75 duration-150 ease-in-out last:rounded-b-lg hover:bg-blue-gray-50/20 dark:border-gray-700 dark:bg-gray-900'>
                    <th scope='row' className='px-6 py-4'>
                      <Link
                        to={`/account/billing/invoice/${item.transactionId}`}>
                        <div className='group/text flex flex-row items-center gap-2 whitespace-nowrap transition-colors duration-150 ease-in-out'>
                          <div className='flex flex-row items-center gap-2'>
                            <DocumentIcon
                              className='h-5 w-5 text-blue-gray-800 group-hover/text:text-blue-500'
                              strokeWidth={2}
                            />
                            <span className='text-blue-gray-800 group-hover/text:text-blue-500'>
                              #{item.referenceId}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </th>
                    <td className='whitespace-nowrap px-6 py-4'>
                      <div className='flex flex-row items-center gap-2'>
                        <CheckCircleIcon
                          className={`h-5 w-5 ${
                            item?.status === "completed"
                              ? "text-emerald-500"
                              : "text-pink-500"
                          }`}
                        />
                        <span className='font-medium '>
                          {item?.status === "completed" ? "Paid" : "Unpaid"}
                        </span>
                      </div>
                    </td>
                    <td className='whitespace-nowrap px-6 py-4'>
                      {item?.planName}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4'>
                      {item?.paymentMethod?.merchantName}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4'>
                      {formatDate(item?.createdAt)}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4'>
                      USD ${item?.total.toFixed(2)}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4'>
                      <Menu>
                        <MenuHandler>
                          <IconButton
                            variant='text'
                            color='blue-gray'
                            size='sm'>
                            <EllipsisHorizontalIcon
                              className='h-6 w-6'
                              strokeWidth={2}
                            />
                          </IconButton>
                        </MenuHandler>
                        <MenuList>
                          <MenuItem>
                            <Typography variant='small' className='font-medium'>
                              Download
                            </Typography>
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  );
}
