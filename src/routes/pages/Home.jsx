import React from "react";
import { useMobileSize } from "../../hooks/util-hooks";
import {
  ArrowLongRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowDownTrayIcon,
  CheckCircleIcon,
  ShoppingCartIcon,
  BeakerIcon,
  BuildingStorefrontIcon,
  MusicalNoteIcon,
  WrenchScrewdriverIcon,
  ShoppingBagIcon,
  TvIcon,
  RocketLaunchIcon,
  ChevronRightIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  Typography,
  Carousel,
  IconButton,
  Chip,
  Popover,
  PopoverHandler,
  PopoverContent,
  Card,
  CardBody,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function Home() {
  const { isMobile } = useMobileSize();

  return (
    <>
      <main className='relative isolate overflow-hidden bg-inherit'>
        <HeaderSection isMobile={isMobile} />
        <CarouselSection isMobile={isMobile} />
        <ComparisonSection />
        <PlansSection />
        <ServicesSection isMobile={isMobile} />
        <BannerSection />
      </main>
    </>
  );
}

function HeaderSection({ isMobile }) {
  return (
    <section className='hero-wrapper px-6 lg:px-8'>
      <div className='flex w-full flex-col items-center justify-center text-center'>
        <div>
          <Link to='/pricing' className='hover:animate-pulse'>
            <div className='mb-5 flex flex-row items-center gap-2 sm:gap-3 md:justify-center'>
              <div className='rounded-full border border-blue-500 p-2'>
                <RocketLaunchIcon
                  className='h-4 w-4 text-blue-500'
                  strokeWidth={2}
                />
              </div>
              <Typography
                color='blue'
                className='font-medium tracking-tight md:text-lg'
                textGradient>
                Explore a 30 day{" "}
                <span className='font-bold text-blue-600'>free trial</span>{" "}
              </Typography>
              <ChevronRightIcon
                className='h-4 w-4 text-blue-500'
                strokeWidth={2}
              />
            </div>
          </Link>
          <Typography
            variant={isMobile ? "h2" : "h1"}
            color='blue-gray'
            className='mb-4 max-w-6xl text-left font-extrabold leading-tight tracking-tight md:text-center'>
            Simplify Operations, Optimize Sales, and a Seamless POS Solutions
          </Typography>
          <p className='mb-6 mr-auto max-w-2xl text-left font-light leading-relaxed tracking-tight text-blue-gray-500 dark:text-blue-gray-400 md:mx-auto md:text-center md:text-lg'>
            Unlock the full potential of your business with Priori POS—a
            management solution designed to streamline operations, and foster
            continuous growth.
          </p>
        </div>
        <div className='flex w-full items-center gap-4 pt-4 md:justify-center md:pt-8'>
          <Link to='pricing'>
            <Button
              variant='filled'
              size={isMobile ? "sm" : "lg"}
              color='blue'
              className='whitespace-nowrap'
              ripple={true}>
              get started
            </Button>
          </Link>
          <Link to='download'>
            <Button
              variant='outlined'
              size={isMobile ? "sm" : "lg"}
              color='blue'
              className='flex items-center gap-1 md:gap-2'
              ripple={true}>
              download
              <ArrowDownTrayIcon
                strokeWidth={2}
                className='hidden h-4 w-4 md:block'
              />
            </Button>
          </Link>
        </div>
      </div>
      <div className='hero flex flex-col items-center justify-center pt-20'>
        <div className='text-center'>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            className='block'
            color='blue-gray'
            textGradient>
            Features
          </Typography>
          <Typography
            variant={isMobile ? "small" : "paragraph"}
            color='blue-gray'
            className='md:text-md mr-auto mt-3 max-w-2xl text-left font-light leading-relaxed tracking-tight text-blue-gray-500 dark:text-blue-gray-400 md:mx-auto md:text-center'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus cumque ab magni reprehenderit repudiandae eaque
            temporibus non accusamus nulla explicabo.
          </Typography>
        </div>
        <div className='mx-auto grid max-w-4xl grid-cols-2 justify-center gap-4 pt-10 md:grid-cols-3'>
          {featuresList.map((feature, key) => (
            <Popover key={key}>
              <PopoverHandler>
                <Button
                  variant='outlined'
                  size={isMobile ? "sm" : "lg"}
                  color='gray'
                  className='flex items-center justify-center gap-2 whitespace-break-spaces hover:border-blue-600 hover:text-blue-600 md:whitespace-normal'>
                  <CheckCircleIcon
                    strokeWidth={2}
                    className='h-4 w-4 md:h-5 md:w-5'
                  />
                  {feature.title}
                </Button>
              </PopoverHandler>
              <PopoverContent className='z-40 flex w-[18rem] flex-col overflow-hidden p-0 md:w-[28rem] md:flex-row'>
                <div className='w-full p-4 md:w-1/2'>
                  <Typography color='blue-gray' className='mb-2 font-medium'>
                    {feature.title}
                  </Typography>
                  <Typography
                    variant='small'
                    color='gray'
                    className='mb-4 font-normal'>
                    {feature.desc}
                  </Typography>
                  <a href='#' className='inline-block'>
                    <Button
                      size='sm'
                      variant='text'
                      className='flex items-center gap-1 capitalize'>
                      Learn More
                      <ArrowLongRightIcon
                        strokeWidth={2}
                        className='h-3.5 w-3.5'
                      />
                    </Button>
                  </a>
                </div>
                <div className='w-full md:w-1/2'>
                  <img
                    src={feature.handle}
                    alt={feature.name}
                    loading='lazy'
                    className='mx-auto my-auto h-full w-full object-contain'
                  />
                </div>
              </PopoverContent>
            </Popover>
          ))}
        </div>
      </div>
    </section>
  );
}

function CarouselSection({ isMobile }) {
  return (
    <section className='hero-wrapper'>
      <div className='mx-auto flex max-w-7xl flex-col gap-8 px-6 lg:flex-row lg:px-8'>
        <div className='flex w-full flex-col items-center text-center md:justify-center lg:w-1/2 lg:items-start lg:pl-24 lg:pr-16 lg:text-left'>
          <div className='mb-4 flex w-full flex-row items-center gap-3'>
            <div className='rounded-full border border-teal-500 p-1.5'>
              <TvIcon className='h-4 w-4 text-teal-500' strokeWidth={2} />
            </div>
            <Typography
              variant='lead'
              color='teal'
              className='text-md font-semibold tracking-tight'
              textGradient>
              User-friendly interface
            </Typography>
          </div>
          <Typography variant='h1' className='w-full text-left'>
            SIMPLE. EASY. MODERN.
          </Typography>
          <Typography
            variant='paragraph'
            color='blue-gray'
            className='mr-auto max-w-md pt-4 text-left text-blue-gray-700'>
            It’s the perfect choice for businesses who wants a powerful yet
            simple POS. Say ‘goodbye’ to the complicated POS system and ‘hello’
            to a sleek and easy-to-use solution.
          </Typography>
          <div className='flex self-start pt-6'>
            <Link to='/auth/signin'>
              <Button size={isMobile ? "sm" : "lg"}>Get started </Button>
            </Link>
          </div>
        </div>
        <div className='justify relative my-auto hidden h-full w-full items-center md:flex lg:w-1/2'>
          <Carousel
            className='relative h-full w-full rounded-md shadow-xl shadow-blue-gray-900/50'
            prevArrow={({ handlePrev }) => (
              <IconButton
                variant='text'
                color='white'
                size='lg'
                onClick={handlePrev}
                className='!absolute left-4 top-2/4 -translate-y-2/4'>
                <ArrowLeftIcon strokeWidth={2} className='h-6 w-6' />
              </IconButton>
            )}
            nextArrow={({ handleNext }) => (
              <IconButton
                variant='text'
                color='white'
                size='lg'
                onClick={handleNext}
                className='!absolute !right-4 top-2/4 -translate-y-2/4'>
                <ArrowRightIcon strokeWidth={2} className='h-6 w-6' />
              </IconButton>
            )}>
            {images.map((src, key) => (
              <img
                key={key}
                src={src}
                loading='lazy'
                className='h-full w-full rounded-md bg-cover'
              />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  return (
    <section className='bg-white'>
      <div className='hero-wrapper relative'>
        <div>
          <Typography
            variant='h2'
            color='blue-gray'
            className='mb-2 text-center font-medium tracking-tight lg:mb-6'>
            Why use Priori POS?
          </Typography>
          <Typography
            variant='paragraph'
            color='gray'
            className='mx-auto mb-6 max-w-2xl text-center text-base tracking-tight md:text-xl'>
            Designed to elevate your business operations and customer
            experience. The additional features empower you to simplify
            transactions, optimize inventory management, and enhance
            decision-making.
          </Typography>
        </div>
        <div className='mx-4 mt-14 flex justify-start overflow-x-auto overscroll-x-none px-0 md:justify-center lg:px-6'>
          <table>
            <thead>
              <tr>
                <th></th>
                <th className='w-52 whitespace-nowrap px-5 pt-5 leading-7 text-blue-gray-800 md:pb-3 md:text-lg'>
                  Free Softwares
                </th>
                <th className='w-52 whitespace-nowrap px-5 pt-5 leading-7 text-blue-gray-800 md:pb-3 md:text-lg'>
                  Companies
                </th>
                <th className='w-52 whitespace-nowrap rounded-t-lg bg-blue-50 px-5 pt-5 leading-7 text-blue-gray-800 md:pb-3 md:text-lg'>
                  Priori POS
                </th>
              </tr>
            </thead>
            {datalist.map(({ element }, key) => (
              <tbody key={key}>{element}</tbody>
            ))}
          </table>
        </div>
      </div>
    </section>
  );
}

function ServicesSection({ isMobile }) {
  return (
    <section className='hero-wrapper'>
      <div className='relative flex flex-col gap-y-12 px-6 lg:px-8'>
        <div>
          <Typography variant={isMobile ? "h5" : "h3"} className='max-w-xl'>
            WE GOT YOU AND YOUR BUSINESS
          </Typography>
          <Typography
            variant={isMobile ? "small" : "paragraph"}
            className='mt-2 max-w-xl'>
            Priori Point of Sale (POS) is perfect for Retail and Service-based
            business
          </Typography>
        </div>
        <div className='flex w-full flex-col justify-center gap-8 lg:flex-row'>
          <div className='relative hidden items-center lg:block lg:w-2/5'>
            <img
              src='https://cdn.pixabay.com/photo/2015/09/04/23/28/wordpress-923188_1280.jpg'
              alt='Supported services for Priori POS'
              loading='lazy'
              className='h-full rounded-lg object-cover'
            />
            <div className='to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50' />
          </div>
          <div className='grid grid-cols-1 items-center rounded-lg bg-blue-500 px-3 py-8 md:grid-cols-2 md:px-5 md:py-12 lg:w-3/5'>
            {applicationList.map((application, key) => (
              <Card
                color='transparent'
                shadow={false}
                className='w-full max-w-[26rem]'
                key={key}>
                <CardBody>
                  <div className='flex h-14 w-14 flex-shrink-0 justify-start rounded-xl bg-blue-50/30 p-3'>
                    {application.icon}
                  </div>
                  <Typography variant='h5' color='white' className='mb-2 mt-6'>
                    {application.name}
                  </Typography>
                  <Typography variant='small' color='white'>
                    {application.desc}
                  </Typography>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PlansSection() {
  return (
    <section className='hero-wrapper'>
      <div className='px-6 lg:px-8'>
        <div className='relative flex w-full flex-col'>
          <div className='flex items-center justify-between'>
            <Typography variant='h4'>Featured Plans</Typography>
            <Link to='/pricing'>
              <div className='flex w-min flex-row items-center gap-2 decoration-blue-500 decoration-2 underline-offset-4 transition duration-150 ease-linear hover:underline'>
                <Typography
                  variant='h6'
                  color='blue'
                  className='whitespace-nowrap'>
                  Explore all
                </Typography>
                <ChevronRightIcon
                  className='h-4 w-4 text-blue-500'
                  strokeWidth={2}
                />
              </div>
            </Link>
          </div>
          <div className='flex flex-wrap gap-8 pt-8 sm:flex-nowrap'>
            {planList.map((plan, key) => (
              <div
                className='flex w-full max-w-none flex-col rounded-lg bg-white p-8 shadow-blue-500 ring-1 ring-blue-gray-50 drop-shadow-xl md:max-w-sm'
                key={key}>
                <div className='flex flex-grow flex-col border-b border-gray-200 pb-6'>
                  <div className='flex flex-shrink-0 justify-start'>
                    <Chip variant='ghost' value='PLANS' className='flex' />
                  </div>
                  <Typography variant='h4' className='pt-4 uppercase'>
                    {plan.name}
                  </Typography>
                  <Typography variant='small' className='pt-2'>
                    {plan.desc}
                  </Typography>
                </div>
                <div className='flex flex-wrap items-center justify-between gap-y-4 pt-4 lining-nums'>
                  <div>
                    <span className='block font-semibold text-blue-gray-500'>
                      30 Days
                    </span>
                    <span className='inline-block text-xl font-semibold text-blue-gray-800'>
                      USD ${plan.price}.00
                    </span>
                  </div>
                  <div className='flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 p-2 text-white transition duration-150 ease-in-out hover:bg-blue-600 sm:w-auto'>
                    <span className='inline-block font-semibold uppercase sm:hidden'>
                      Continue
                    </span>
                    <Link to='/pricing'>
                      <ArrowLongRightIcon className='h-6 w-6 md:h-8 md:w-8' />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BannerSection() {
  return (
    <section className='hero-wrapper sm:px-6 lg:px-8'>
      <div className='w-full bg-[url("/overlay.svg")] px-4 py-14 sm:rounded-xl md:px-16 md:py-32'>
        <div className='mx-auto flex flex-col items-center justify-between gap-4 sm:text-center md:max-w-none lg:flex-row'>
          <div className='max-w-lg md:self-start'>
            <h2 className='mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-left'>
              Sign up for our newsletter
            </h2>
            <p className='mx-auto mb-8 max-w-2xl font-light tracking-tight text-gray-400 sm:text-xl md:mb-0 md:text-left'>
              Stay informed about our announcements, and exclusive discounts by
              signing up with your email.
            </p>
          </div>
          <form action='#' className='md:self-start'>
            <div className='mx-auto mb-3 max-w-screen-md items-center space-y-4 sm:flex sm:space-y-0'>
              <div className='relative w-full'>
                <label
                  htmlFor='email'
                  className='mb-2 hidden text-sm font-medium text-gray-900 dark:text-gray-300'>
                  Email address
                </label>
                <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                  <svg
                    className='h-5 w-5 text-gray-500 dark:text-gray-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z'></path>
                    <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z'></path>
                  </svg>
                </div>
                <input
                  className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:rounded-none sm:rounded-l-lg'
                  placeholder='Enter your email'
                  type='email'
                  id='email'
                  required=''
                />
              </div>
              <div>
                <button
                  type='submit'
                  className='w-full cursor-pointer rounded-lg border border-blue-600 bg-blue-700 px-5 py-3 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:rounded-none sm:rounded-r-lg'>
                  Subscribe
                </button>
              </div>
            </div>
            <div className='newsletter-form-footer mx-auto max-w-screen-sm text-left text-sm text-gray-500 dark:text-gray-300'>
              We care about the protection of your data.{" "}
              <a
                href='#'
                className='font-medium text-blue-600 hover:underline dark:text-blue-500'>
                Read our Privacy Policy
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

const featuresList = [
  {
    title: "Cloud-Based",
    handle: "https://i.ibb.co/gwZcQTw/cloud-based.png",
    desc: "Access your data anytime, anywhere with secure, cloudbased technology.",
  },
  {
    title: "Supply Inventory",
    handle: "https://i.ibb.co/nR1YXKF/supply-inventory.png",
    desc: "Seamlessly manage recipes and raw materials for accurate stock control and waste reduction.",
  },
  {
    title: "Product Expiry",
    handle: "https://i.ibb.co/KwDy64C/product-expiry.png",
    desc: "Keep stocks fresh and customers happy with detailed insights on expiring products.",
  },
  {
    title: "User Access",
    handle: "https://i.ibb.co/2ghgw7W/user-access.png",
    desc: "Optimize task delegation and collaboration with customizable user access for your team.",
  },
  {
    title: "Manage Inventory",
    handle: "https://i.ibb.co/4V61dxj/manage-inventory.png",
    desc: "Track your stock levels and make informed decisions about your inventory.",
  },
  {
    title: "Generate Reports",
    handle: "https://i.ibb.co/k9LJC56/generate-reports.png",
    desc: "Stay on top of your business with comprehensive and user-friendly reports.",
  },
];

const images = [
  "https://i.ibb.co/fqrrcP9/pos-settings-1.png",
  "https://i.ibb.co/v1vY2NY/pos-settings-2.png",
  "https://i.ibb.co/XzLw100/pos-settings-4.png",
  "https://i.ibb.co/Z6XDXPR/pos-settings-3.png",
  "https://i.ibb.co/vjRx1fD/pos-settings-5.png",
  "https://i.ibb.co/gdYLT8J/pos-settings-6.png",
  "https://i.ibb.co/Lkp28VN/pos-settings-7.png",
  "https://i.ibb.co/SwNjZD7/pos-settings-8.png",
  "https://i.ibb.co/KmVRX51/pos-settings-9.png",
];

const planList = [
  {
    name: "Retail POS",
    desc: "Track inventory, manage customer data, and process payments.",
    price: "45",
  },
  {
    name: "Restaurant POS",
    desc: "Speed up the order-taking process, and improve customer service.",
    price: "50",
  },
];

const applicationList = [
  {
    name: "Grocery",
    icon: React.createElement(ShoppingCartIcon, {
      strokeWidth: 2,
      className: "text-white/90",
    }),
    desc: "Streamline inventory management and enhance efficiency with our secure, cloud-based technology for your grocery store.",
  },
  {
    name: "Pharmacy",
    icon: React.createElement(BeakerIcon, {
      strokeWidth: 2,
      className: "text-white/90",
    }),
    desc: "Achieve precise stock control and minimize waste by effortlessly managing prescriptions and raw materials using our advanced POS solution.",
  },
  {
    name: "Restaurant",
    icon: React.createElement(BuildingStorefrontIcon, {
      strokeWidth: 2,
      className: "text-white/90",
    }),
    desc: "Ensure customer satisfaction and reduce product wastage by gaining valuable insights into expiring items with our comprehensive restaurant POS system.",
  },
  {
    name: "Restobar",
    icon: React.createElement(MusicalNoteIcon, {
      strokeWidth: 2,
      className: "text-white/90",
    }),
    desc: "Optimize collaboration and streamline task delegation within your team using our customizable user access feature, tailored for your unique restobar needs.",
  },
  {
    name: "Hardware",
    icon: React.createElement(WrenchScrewdriverIcon, {
      strokeWidth: 2,
      className: "text-white/90",
    }),
    desc: "Make informed inventory decisions and maintain optimal stock levels with our intuitive POS software designed specifically for the hardware industry.",
  },
  {
    name: "Supermarket",
    icon: React.createElement(ShoppingBagIcon, {
      strokeWidth: 2,
      className: "text-white/90",
    }),
    desc: "Stay ahead in the competitive market with our user-friendly reports, offering comprehensive insights to effectively manage your supermarket business.",
  },
];

const datalist = [
  {
    element: (
      <tr>
        <td className='group px-4 py-2 text-center leading-7 first:text-left md:text-lg md:first:w-auto md:first:max-w-sm'>
          Price
        </td>
        <td className='min-w-52 bg-comparison-row group px-4 py-2 text-center text-lg leading-7 first:pl-8 first:text-left md:first:w-auto md:first:max-w-sm md:first:pl-4'>
          <div className='flex justify-center'>
            <CheckIcon
              className='h-6 w-6 rounded-full bg-green-500 p-1 text-white'
              strokeWidth={2}
            />
          </div>
        </td>
        <td className='min-w-52 bg-comparison-row group px-4 py-2 text-center text-lg leading-7 first:pl-8 first:text-left md:first:w-auto md:first:max-w-sm md:first:pl-4'>
          <div className='flex justify-center'>
            <XMarkIcon
              className='h-6 w-6 rounded-full bg-red-500 p-1 text-white'
              strokeWidth={2}
            />
          </div>
        </td>
        <td className='min-w-52 bg-comparison-row group bg-blue-50 px-4 py-2 text-center text-lg leading-7 first:pl-8 first:text-left md:first:w-auto md:first:max-w-sm md:first:pl-4'>
          <div className='flex justify-center'>
            <CheckIcon
              className='h-6 w-6 rounded-full bg-green-500 p-1 text-white'
              strokeWidth={2}
            />
          </div>
        </td>
      </tr>
    ),
  },
  {
    element: (
      <tr>
        <td className='group px-4 py-2 text-center leading-7 first:text-left md:text-lg md:first:w-auto md:first:max-w-sm'>
          Intuitive
        </td>
        <td className='min-w-52 bg-comparison-row group px-4 py-2 text-center text-lg leading-7 first:pl-8 first:text-left md:first:w-auto md:first:max-w-sm md:first:pl-4'>
          <div className='flex justify-center'>
            <XMarkIcon
              className='h-6 w-6 rounded-full bg-red-500 p-1 text-white'
              strokeWidth={2}
            />
          </div>
        </td>
        <td className='min-w-52 bg-comparison-row group px-4 py-2 text-center text-lg leading-7 first:pl-8 first:text-left md:first:w-auto md:first:max-w-sm md:first:pl-4'>
          <div className='flex justify-center'>
            <XMarkIcon
              className='h-6 w-6 rounded-full bg-red-500 p-1 text-white'
              strokeWidth={2}
            />
          </div>
        </td>
        <td className='min-w-52 bg-comparison-row group bg-blue-50 px-4 py-2 text-center text-lg leading-7 first:pl-8 first:text-left md:first:w-auto md:first:max-w-sm md:first:pl-4'>
          <div className='flex justify-center'>
            <CheckIcon
              className='h-6 w-6 rounded-full bg-green-500 p-1 text-white'
              strokeWidth={2}
            />
          </div>
        </td>
      </tr>
    ),
  },
  {
    element: (
      <tr>
        <td className='group px-4 py-2 text-center leading-7 first:text-left md:text-lg md:first:w-auto md:first:max-w-sm'>
          Backups
        </td>
        <td className='min-w-52 bg-comparison-row group px-4 py-2 text-center text-lg leading-7 first:pl-8 first:text-left md:first:w-auto md:first:max-w-sm md:first:pl-4'>
          <div className='flex justify-center'>
            <XMarkIcon
              className='h-6 w-6 rounded-full bg-red-500 p-1 text-white'
              strokeWidth={2}
            />
          </div>
        </td>
        <td className='min-w-52 bg-comparison-row group px-4 py-2 text-center text-lg leading-7 first:pl-8 first:text-left md:first:w-auto md:first:max-w-sm md:first:pl-4'>
          <div className='flex justify-center'>
            <CheckIcon
              className='h-6 w-6 rounded-full bg-green-500 p-1 text-white'
              strokeWidth={2}
            />
          </div>
        </td>
        <td className='min-w-52 bg-comparison-row group bg-blue-50 px-4 py-2 text-center text-lg leading-7 first:pl-8 first:text-left md:first:w-auto md:first:max-w-sm md:first:pl-4'>
          <div className='flex justify-center'>
            <CheckIcon
              className='h-6 w-6 rounded-full bg-green-500 p-1 text-white'
              strokeWidth={2}
            />
          </div>
        </td>
      </tr>
    ),
  },
  {
    element: (
      <tr>
        <td className='group px-4 py-2 text-center leading-7 first:text-left md:text-lg md:first:w-auto md:first:max-w-sm'>
          Responsive
        </td>
        <td className='min-w-52 bg-comparison-row group px-4 py-2 text-center text-lg leading-7 first:pl-8 first:text-left md:first:w-auto md:first:max-w-sm md:first:pl-4'>
          <div className='flex justify-center'>
            <CheckIcon
              className='h-6 w-6 rounded-full bg-green-500 p-1 text-white'
              strokeWidth={2}
            />
          </div>
        </td>
        <td className='min-w-52 bg-comparison-row group px-4 py-2 text-center text-lg leading-7 first:pl-8 first:text-left md:first:w-auto md:first:max-w-sm md:first:pl-4'>
          <div className='flex justify-center'>
            <CheckIcon
              className='h-6 w-6 rounded-full bg-green-500 p-1 text-white'
              strokeWidth={2}
            />
          </div>
        </td>
        <td className='min-w-52 bg-comparison-row group rounded-b-lg bg-blue-50 px-4 py-2 pb-5 text-center text-lg leading-7 first:pl-8 first:text-left md:first:w-auto md:first:max-w-sm md:first:pl-4'>
          <div className='flex justify-center'>
            <CheckIcon
              className='h-6 w-6 rounded-full bg-green-500 p-1 text-white'
              strokeWidth={2}
            />
          </div>
        </td>
      </tr>
    ),
  },
];
