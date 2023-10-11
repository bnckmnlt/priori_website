import React from "react";
import { Link } from "react-router-dom";
import { Button, Chip, Typography } from "@material-tailwind/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useMobileSize } from "../../hooks/util-hooks";

export default function Download() {
  const { isMobile } = useMobileSize();

  return (
    <React.Fragment>
      <HeaderSection isMobile={isMobile} />
      <DownloadBanner isMobile={isMobile} />
      <UsageSection />
      <BannerSection />
    </React.Fragment>
  );
}

function HeaderSection({ isMobile }) {
  return (
    <section className='px-8 py-10 lg:px-0 lg:py-32'>
      <div className='container mx-auto flex flex-col gap-y-14 lg:flex-row '>
        <div className='flex w-full flex-col items-center justify-center text-left lg:w-1/2 lg:items-start lg:pl-8 lg:pr-12'>
          <Typography
            variant={isMobile ? "h2" : "h1"}
            className='w-full text-left tracking-tight'>
            Get Priori POS for Windows
          </Typography>
          <div className='flex flex-col gap-5 lg:gap-8'>
            <Typography
              variant='lead'
              color='blue-gray'
              className='w-full pt-4 tracking-tight'>
              Discover the ultimate choice for businesses seeking a
              sophisticated and effortless Point of Sale (POS) solution.
              Download now and experience efficiency and simplicity.
            </Typography>
            <Typography
              variant='paragraph'
              color='gray'
              className='w-full tracking-tight'>
              To begin the installation and activation process, please follow
              the steps outlined below. If you do not have an existing account,
              kindly proceed{" "}
              <Link
                to='/pricing'
                className='underline decoration-1 underline-offset-2 hover:text-blue-500'>
                <span>here</span>
              </Link>
              .
            </Typography>
            <div className='text-base'>
              <div className='mb-4'>
                <p></p>
              </div>
            </div>
            <div className='flex flex-shrink-0 justify-center md:justify-start'>
              <Button
                variant='gradient'
                ripple={true}
                size='lg'
                className='rounded-full '>
                download priori pos
              </Button>
            </div>
          </div>
        </div>
        <div className='flex h-auto w-full flex-col items-center justify-center lg:w-1/2'>
          <div className='relative mx-auto h-[172px] max-w-[301px] rounded-t-xl border-[8px] border-gray-800 bg-gray-800 dark:border-gray-800 md:h-[294px] md:max-w-[512px]'>
            <div className='h-[156px] overflow-hidden rounded-lg bg-white dark:bg-gray-800 md:h-[278px]'>
              <img
                src='https://flowbite.s3.amazonaws.com/docs/device-mockups/laptop-screen.png'
                className='h-[156px] w-full rounded-xl dark:hidden md:h-[278px]'
                alt=''
              />
              <img
                src='https://flowbite.s3.amazonaws.com/docs/device-mockups/laptop-screen-dark.png'
                className='hidden h-[156px] w-full rounded-lg dark:block md:h-[278px]'
                alt=''
              />
            </div>
          </div>
          <div className='relative mx-auto h-[17px] w-full max-w-[351px] rounded-b-xl rounded-t-sm bg-gray-900 dark:bg-gray-700 md:h-[21px] md:max-w-[597px]'>
            <div className='absolute left-1/2 top-0 h-[5px] w-[56px] -translate-x-1/2 rounded-b-xl bg-gray-800 md:h-[8px] md:w-[96px]'></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DownloadBanner({ isMobile }) {
  return (
    <React.Fragment>
      <section className='container mx-auto px-4 py-8 md:px-0'>
        <div className='mx-auto space-y-6 text-center font-semibold lg:max-w-3xl'>
          <Typography
            variant={isMobile ? "h4" : "h2"}
            className='tracking-tight'>
            Download Priori POS software
          </Typography>
        </div>
      </section>
      <section className='container mx-auto px-4 py-8 md:px-0'>
        <div className='mx-auto space-y-6 text-center font-semibold lg:max-w-3xl'>
          <div className='flex justify-center gap-2 md:gap-4'>
            <Button variant='text' className='flex flex-col items-center gap-3'>
              <img
                src='https://i.ibb.co/8rzdPRf/windows.png'
                alt=''
                className='h-5 w-5'
              />{" "}
              download for windows
            </Button>
            <Button
              variant='text'
              className='flex flex-col items-center gap-3 border-black text-black'>
              <img
                src='https://i.ibb.co/pjfGF54/apple.png'
                alt=''
                className='h-5 w-5'
              />{" "}
              download for mac os
            </Button>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

function UsageSection() {
  return (
    <section className='px-8 py-10 lg:py-32'>
      <div className='container mx-auto flex flex-col items-center'>
        <Typography
          variant='h3'
          color='blue-gray'
          className='mb-8 w-full text-center tracking-tight sm:mb-16'>
          How to activate and use the Priori POS app
        </Typography>
        <div className='grid justify-center gap-8 md:grid-flow-col xl:gap-20'>
          <div className='relative flex max-w-[23rem] flex-col items-start gap-4'>
            <Chip variant='ghost' size='lg' value='Step 1' />
            <div className='w-full text-left'>
              <Typography
                variant='h5'
                color='blue-gray'
                className='mb-1.5 tracking-tight'>
                Download the compatible application
              </Typography>
              <Typography variant='paragraph' color='gray'>
                In the section above, choose the application that is compatible
                with the operating system installed on your computer or machine.
                Ensure that you have already subscribed to a specific plan in
                order to use the software.
              </Typography>
            </div>
          </div>
          <div className='relative flex max-w-[23rem] flex-col items-start gap-4'>
            <Chip variant='ghost' size='lg' value='Step 2' />
            <div className='w-full text-left'>
              <Typography
                variant='h5'
                color='blue-gray'
                className='mb-1.5 tracking-tight'>
                Install the Priori POS software
              </Typography>
              <Typography variant='paragraph' color='gray'>
                Once you have installed the Priori POS app, please open it and
                navigate to the user settings. If you haven&apos;t copied the
                license key, you can find it in your Account Billing settings.
              </Typography>
            </div>
          </div>
          <div className='relative flex max-w-[23rem] flex-col items-start gap-4'>
            <Chip variant='ghost' size='lg' value='Step 3' />
            <div className='w-full text-left'>
              <Typography
                variant='h5'
                color='blue-gray'
                className='mb-1.5 tracking-tight'>
                Activate your license
              </Typography>
              <Typography variant='paragraph' color='gray'>
                After obtaining the license key, paste it into the designated
                input field and click on the &quot;Activate&quot; button to
                proceed with the activation process.
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BannerSection() {
  return (
    <section className='bg-gradient-to-tr from-light-blue-700 via-blue-800  to-indigo-900 px-8 py-10 text-white lg:px-0 lg:py-14'>
      <div className='container mx-auto flex max-w-7xl flex-col items-center justify-center py-16 xl:py-24'>
        <Typography variant='h2' className='mb-8 text-center tracking-tight'>
          Efficient and streamlined transactions for your business with Priori
          POS
        </Typography>
        <Link to='/pricing'>
          <Button
            variant='gradient'
            size='lg'
            className='mb-7 rounded-full'
            ripple={true}>
            Get Priori POS
          </Button>
        </Link>
        <div className='grid w-full grid-flow-row justify-center gap-4 md:grid-flow-col'>
          <div className='flex items-center gap-2'>
            <CheckIcon strokeWidth={2} className='h-4 w-4 text-cyan-500' />
            <Typography className='text-sm'>User-friendly</Typography>
          </div>
          <div className='flex items-center gap-2'>
            <CheckIcon strokeWidth={2} className='h-4 w-4 text-cyan-500' />
            <Typography className='text-sm'>Customer Support</Typography>
          </div>
          <div className='flex items-center gap-2'>
            <CheckIcon strokeWidth={2} className='h-4 w-4 text-cyan-500' />
            <Typography className='text-sm'>Documentation</Typography>
          </div>
          <div className='flex items-center gap-2'>
            <CheckIcon strokeWidth={2} className='h-4 w-4 text-cyan-500' />
            <Typography className='text-sm'>
              30 day money-back guarantee
            </Typography>
          </div>
        </div>
      </div>
    </section>
  );
}
