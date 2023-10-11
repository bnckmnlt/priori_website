import useMobileSize from "../hooks/useMobileSize";
import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const { isMobile, isLoaded } = useMobileSize();

  return (
    <section className='px-8 py-10 xl:px-0 xl:py-32'>
      <div className='mx-auto flex max-w-7xl flex-col-reverse gap-y-14 lg:flex-row'>
        <div className='flex w-full flex-col items-center justify-center text-left lg:w-1/2 lg:items-start lg:pl-8 lg:pr-12'>
          <Typography
            variant={isMobile ? "h3" : "h1"}
            className='w-full text-center tracking-tight lg:text-left '>
            Oops! Page Not Found
          </Typography>
          <div className='flex flex-col gap-5 lg:gap-8'>
            <Typography
              variant={isMobile ? "paragraph" : "lead"}
              color='gray'
              className='w-full pt-4 text-center tracking-tight lg:text-left'>
              Sorry, but it seems like the page you are looking for doesn&apos;t
              exist. Please check the URL or navigate back to the homepage to
              continue your journey.
            </Typography>
            <div className='text-base'>
              <div className='mb-4'>
                <p></p>
              </div>
            </div>
            <div className='flex flex-shrink-0 justify-center lg:justify-start'>
              <Link to='/'>
                <Button variant='gradient' ripple={true} size='lg'>
                  back to homepage
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className='w-full lg:w-1/2'>
          <img
            className='h-full w-full bg-transparent'
            src='/notfound.svg'
            alt='Page not found'
          />
        </div>
      </div>
    </section>
  );
};

export default NotFound;
