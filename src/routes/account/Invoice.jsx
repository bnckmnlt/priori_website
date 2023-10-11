import { Link, useLoaderData } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { formatDate } from "../../hooks/util-hooks";
import {
  AtSymbolIcon,
  ChevronLeftIcon,
  CalendarIcon,
  CalendarDaysIcon,
  CheckIcon,
  ClockIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { Typography, Avatar, Chip, Button } from "@material-tailwind/react";

export default function Invoice() {
  const { user } = useAuth0();
  const invoice = useLoaderData();

  return (
    invoice && (
      <div className='w-full space-y-6 lg:px-12'>
        <div className='flex w-full flex-row items-center justify-between'>
          <Typography variant='h3' color='blue-gray'>
            Invoice
          </Typography>
          <Link to='/account/billing'>
            <Button
              variant='text'
              className='flex flex-row items-center gap-3.5 print:hidden'>
              <ChevronLeftIcon
                strokeWidth={2}
                className='h-5 w-5 rounded-full border border-blue-500 p-1'
              />
              Back to Billing
            </Button>
          </Link>
        </div>
        <div className='flex w-full flex-col-reverse gap-4 md:flex-col'>
          <div className='flex flex-col justify-between gap-4 md:flex-row'>
            <div className='h-full w-full rounded-md border bg-white p-4 tracking-tight drop-shadow-sm dark:bg-blue-gray-800 print:hidden md:p-7'>
              <Typography
                variant='h5'
                color='blue-gray'
                className='tracking-tight'>
                Details
              </Typography>
              <div className='mt-7 flex flex-col gap-3'>
                <div className=' flex flex-row items-center gap-3.5'>
                  <Avatar size='xs' src={user.picture} />
                  <span className='text-sm text-gray-500'>
                    {user?.nickname}
                  </span>
                </div>
                <div className='flex flex-row items-center gap-3.5'>
                  <AtSymbolIcon className='h-6 w-6 text-gray-600' />
                  <span className='text-sm text-gray-500'>{user?.email}</span>
                </div>
                <div className='flex flex-row items-center gap-3.5'>
                  <CalendarIcon className='h-6 w-6 text-gray-600' />
                  <span className='text-sm text-gray-500'>
                    {formatDate(invoice?.createdAt)}
                  </span>
                </div>
                <div className='flex flex-row items-center gap-3.5'>
                  <TagIcon className='h-6 w-6 text-gray-600' />
                  <span className='text-sm text-gray-500'>
                    {"#" + invoice?.referenceId}
                  </span>
                </div>
              </div>
              <Button variant='filled' color='green' className='mt-7' fullWidth>
                Download Invoice PDF
              </Button>
            </div>
            <div className='flex w-full flex-col rounded-md border bg-white p-4 drop-shadow-sm dark:bg-blue-gray-800 print:hidden md:p-7'>
              <div className='flex h-full flex-col justify-between gap-4'>
                <div></div>
                <div>
                  <img
                    src='/contact-us.png'
                    alt='Contact us'
                    className='h-10 w-10'
                  />
                  <Typography
                    variant='h5'
                    color='blue-gray'
                    className='mt-3.5 tracking-tight'>
                    Contact us
                  </Typography>
                  <Typography
                    variant='paragraph'
                    color='gray'
                    className='mt-2 tracking-tight'>
                    If you have any inquiries or concerns, please feel free to
                    reach out to us
                  </Typography>
                  <Link to='/contact-us'>
                    <Button
                      className='mt-7'
                      color='light-blue'
                      variant='filled'
                      fullWidth>
                      Contact us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div
            className='w-full rounded-md border bg-white drop-shadow-sm dark:bg-blue-gray-800'
            id='pdf-content'>
            <div className='flex flex-col-reverse items-center gap-3 px-4 pt-4 md:flex-row md:justify-between md:px-10 md:pt-10'>
              <div className='flex flex-row items-center gap-4 self-start overflow-x-auto'>
                <div className='hidden rounded-full bg-light-blue-100/50 p-2.5 md:block'>
                  <img src='/bill-png' alt='Invoice' className='h-8 w-8' />
                </div>
                <div className='w-full self-start text-left'>
                  <Typography
                    variant='h5'
                    color='blue-gray'
                    className='font-bold tracking-tight'>
                    Invoice #{invoice?.referenceId}
                  </Typography>
                  <Typography
                    variant='paragraph'
                    color='gray'
                    className='flex flex-row items-center gap-2 text-sm tracking-tight'
                    textGradient>
                    <CalendarDaysIcon
                      className='hidden h-4 w-4 text-gray-500/80 md:block'
                      strokeWidth={2}
                    />
                    Issued date: {formatDate(invoice?.createdAt)}
                  </Typography>
                </div>
              </div>
              <Chip
                variant='ghost'
                color={invoice?.status === "completed" ? "green" : "amber"}
                icon={
                  invoice?.status === "completed" ? (
                    <CheckIcon />
                  ) : (
                    <ClockIcon />
                  )
                }
                value={
                  invoice?.status === "completed" ? "completed" : "pending"
                }
                className='relative self-end print:hidden md:self-auto'
              />
            </div>
            <div className='mx-4 mt-5 border border-gray-100 md:mx-10'></div>
            <div className='mt-5 grid gap-4 px-4 md:grid-cols-2 md:px-10'>
              <div>
                <Typography
                  variant='h6'
                  color='blue'
                  className='text-sm tracking-tight'>
                  Billed from:{" "}
                </Typography>
                <ul className='mt-3.5 space-y-0.5'>
                  <Typography className='text-lg font-semibold tracking-tight text-blue-gray-900'>
                    Priori Systems
                  </Typography>
                  <Typography className='text-sm tracking-tight text-gray-700'>
                    Manila, Philippines
                  </Typography>
                  <Typography className='text-sm tracking-tight text-gray-700'>
                    (028)-626-0908
                  </Typography>
                </ul>
              </div>
              <div>
                <Typography
                  variant='h6'
                  color='blue'
                  className='text-sm tracking-tight'>
                  Billed to:{" "}
                </Typography>
                <ul className='mt-3.5 space-y-0.5'>
                  <Typography className='text-lg font-semibold tracking-tight text-blue-gray-900'>
                    {user?.nickname}
                  </Typography>
                  <Typography className='text-sm tracking-tight text-gray-700'>
                    Random Business
                  </Typography>
                  <Typography className='text-sm tracking-tight text-gray-700'>
                    Philippines
                  </Typography>
                </ul>
              </div>
            </div>
            <div className='mt-6 px-4 md:px-10'>
              <Typography
                variant='h6'
                color='blue-gray'
                className='tracking-tight'>
                Item Detail
              </Typography>
            </div>
            <div className='mt-4 w-full px-2 text-left text-sm tracking-tight text-gray-500 dark:text-gray-400 md:px-5'>
              <div className='overflow-x-auto rounded-md border'>
                <table className='min-w-full border-collapse overflow-hidden rounded-lg border'>
                  <thead className='whitespace-nowrap border-b text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
                    <tr className='snap-x'>
                      <th scope='col' className='snap-center px-6 py-3'>
                        Description
                      </th>
                      <th scope='col' className='snap-center px-6 py-3'>
                        Plan Term
                      </th>
                      <th scope='col' className='snap-center px-6 py-3'>
                        Payment Method
                      </th>
                      <th scope='col' className='snap-center px-6 py-3'>
                        Price
                      </th>
                      <th scope='col' className='snap-center px-6 py-3'>
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='bg-white dark:border-gray-700 dark:bg-gray-900'>
                      <th
                        scope='row'
                        className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'>
                        {invoice?.planName}
                      </th>
                      <td className='px-6 py-4 uppercase'>
                        {invoice?.duration}
                      </td>
                      <td className='px-6 py-4'>
                        {invoice?.paymentMethod?.merchantName}
                      </td>
                      <td className='px-6 py-4'>${invoice?.value}.00</td>
                      <td className='px-6 py-4'>USD ${invoice?.total}.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className='flex justify-end px-4 pb-4 pt-4 sm:pt-5 md:px-7 md:pb-10'>
              <div className='flex w-full flex-col gap-1.5 md:max-w-sm'>
                <div className='flex w-full items-center justify-between'>
                  <Typography
                    variant='h6'
                    color='gray'
                    className='text-sm tracking-tight'>
                    Sub Total
                  </Typography>
                  <Typography
                    variant='h6'
                    color='blue-gray'
                    className=' tracking-tight'>
                    ${invoice?.total}.00
                  </Typography>
                </div>
                <div className='flex w-full items-center justify-between'>
                  <Typography
                    variant='h6'
                    color='gray'
                    className='text-sm tracking-tight'>
                    Total Tax
                  </Typography>
                  <Typography
                    variant='h6'
                    color='blue-gray'
                    className=' tracking-tight'>
                    $0.00
                  </Typography>
                </div>
                <div className='flex w-full items-center justify-between'>
                  <Typography
                    variant='h6'
                    color='gray'
                    className='text-sm tracking-tight'>
                    Discount
                  </Typography>
                  <Typography
                    variant='h6'
                    color='blue-gray'
                    className=' tracking-tight'>
                    $0.00
                  </Typography>
                </div>
                <div className='mt-7 flex w-full items-center justify-between border-t pt-4'>
                  <Typography
                    variant='h5'
                    color='gray'
                    className='text-sm tracking-tight'>
                    Total Amount
                  </Typography>
                  <Typography
                    variant='h5'
                    color='blue-gray'
                    className='tracking-tight'>
                    ${invoice?.total}.00
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
