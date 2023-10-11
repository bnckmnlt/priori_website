import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";

const currentYear = new Date().getFullYear();

export function RootFooter() {
  const footerLinks = [
    {
      label: "Company",
      items: [
        { title: "About Us", ref: "/about-us" },
        { title: "Privacy Policy", ref: "/privacy-policy" },
        { title: "Terms of Service", ref: "/terms-of-service" },
      ],
    },
    {
      label: "Help Center",
      items: [
        { title: "Facebook", ref: "https://www.facebook.com" },
        { title: "Twitter", ref: "https://www.twitter.com" },
        { title: "Instagram", ref: "https://www.instagram.com" },
        { title: "Contact Us", ref: "/contact-us" },
      ],
    },
    {
      label: "Resources",
      items: [
        { title: "Documentation", ref: "/docs" },
        { title: "Newsletter", ref: "/" },
      ],
    },
    {
      label: "Products",
      items: [{ title: "POS System", ref: "/features" }],
    },
  ];

  return (
    <footer className='relative mx-auto w-full max-w-7xl bg-inherit px-4 xl:px-0'>
      <div className='border-t pt-8 lg:pt-10'>
        <div className='grid grid-cols-1 justify-between gap-4 md:grid-cols-2'>
          <div className='flex flex-col justify-center gap-4'>
            <div className='flex flex-col gap-x-4'>
              <div className='block h-20'>
                <Link
                  to='/'
                  className='ring-none h-12 outline-none transition duration-300 ease-in-out hover:scale-110 sm:h-14 md:h-16 xl:w-40'>
                  <img
                    src='/logo.png'
                    alt='PRIORI POS'
                    className='inline-block h-auto max-h-full w-auto max-w-full'
                  />
                </Link>
              </div>
              <Typography variant='h4' textGradient color='blue'>
                PRIORI POS
              </Typography>
            </div>
            <Typography variant='small' className='max-w-sm'>
              PRIORI POS offers a comprehensive suite of features and benefits
              that help businesses of all sizes streamline their operations. Our
              system is easy to use, affordable, and offers a variety of
              subscription plans to fit your specific needs.
            </Typography>
          </div>
          <div className='mt-6 grid grid-cols-3 justify-between gap-4 md:mt-0'>
            {footerLinks.map((block) => (
              <ul key={block.label}>
                <Typography
                  variant='small'
                  color='blue-gray'
                  className='mb-3 font-medium opacity-40'>
                  {block.label}
                </Typography>
                {block.items.map((link) => (
                  <li key={link.title}>
                    <a href={link.ref}>
                      <Typography
                        color='gray'
                        variant='small'
                        className='font-small py-1.5 transition hover:scale-105 hover:text-light-blue-500 md:text-base'>
                        {link.title}
                      </Typography>
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div className='mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between'>
          <Typography
            variant='small'
            className='mb-4 text-center font-normal text-blue-gray-900 md:mb-0'>
            &copy; {currentYear}{" "}
            <a href='https://material-tailwind.com/'>PRIORI POS</a>. All Rights
            Reserved.
          </Typography>
          <div className='flex gap-4 text-blue-gray-900 sm:justify-center'>
            <Typography
              href='#'
              className='opacity-80 transition-opacity hover:opacity-100'>
              <svg
                className='h-5 w-5'
                fill='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'>
                <path
                  fillRule='evenodd'
                  d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
                  clipRule='evenodd'
                />
              </svg>
            </Typography>
            <Typography
              href='#'
              className='opacity-80 transition-opacity hover:opacity-100'>
              <svg
                className='h-5 w-5'
                fill='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'>
                <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84' />
              </svg>
            </Typography>
            <Typography
              href='#'
              className='opacity-80 transition-opacity hover:opacity-100'>
              <svg
                className='h-5 w-5'
                fill='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'>
                <path
                  fillRule='evenodd'
                  d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z'
                  clipRule='evenodd'
                />
              </svg>
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function AuthFooter() {
  return (
    <footer className='w-full bg-inherit p-8'>
      <div className='flex flex-row flex-wrap items-center justify-end gap-x-12 gap-y-6 bg-inherit text-center md:justify-between'>
        <ul className='flex w-full items-center justify-center gap-x-8 gap-y-2 md:justify-end'>
          <li>
            <Typography
              as='a'
              href='#'
              variant='small'
              color='blue-gray'
              className='whitespace-nowrap font-normal transition-colors hover:text-blue-500 focus:text-blue-500'>
              About Us
            </Typography>
          </li>
          <li>
            <Typography
              as='a'
              href='#'
              variant='small'
              color='blue-gray'
              className='whitespace-nowrap font-normal transition-colors hover:text-blue-500 focus:text-blue-500'>
              Contact Us
            </Typography>
          </li>
          <li>
            <Typography
              as='a'
              href='#'
              variant='small'
              color='blue-gray'
              className='whitespace-nowrap font-normal transition-colors hover:text-blue-500 focus:text-blue-500'>
              Terms of Service
            </Typography>
          </li>
        </ul>
      </div>
      <Typography
        color='blue-gray'
        variant='small'
        className='mt-4 border-t pt-4 text-center font-normal'>
        &copy; 2023 Priori POS. All rights reserved.
      </Typography>
    </footer>
  );
}
