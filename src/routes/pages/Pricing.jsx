import { createElement, useState, Fragment } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../components/LoadingSpinner";
import {
  useMobileSize,
  useNewRequest,
  useShowLoader,
} from "../../hooks/util-hooks";
import {
  CheckCircleIcon,
  CheckIcon,
  CurrencyDollarIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Avatar,
  Button,
  Chip,
  Tab,
  Tabs,
  TabsBody,
  TabsHeader,
  TabPanel,
  Typography,
} from "@material-tailwind/react";

export default function Pricing() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth0();
  const subscriptionPlans = useLoaderData();
  const { isMobile } = useMobileSize();
  const newAxiosRequest = useNewRequest();
  const showLoader = useShowLoader(isLoading, 200);
  const currentUser = useSelector((state) => state.auth.currentUser);

  async function STORE_SELECTED_PLAN(payload) {
    if (user && isAuthenticated) {
      try {
        const response = await newAxiosRequest.post(
          `/transaction/${user?.sub}`,
          JSON.stringify(payload)
        );

        if (response.status === 500) {
          return null;
        }
        navigate("/checkout/payment/");
      } catch (error) {
        console.error(error);
      }
    } else {
      navigate("/auth/signin/");
    }
  }

  if (showLoader && !subscriptionPlans && !isAuthenticated) {
    return <LoadingSpinner opacity={100} />;
  }
  return (
    <div className='isolate overflow-hidden bg-inherit'>
      <PricingSection
        isMobile={isMobile}
        subscriptionPlans={subscriptionPlans}
        STORE_SELECTED_PLAN={STORE_SELECTED_PLAN}
        currentUser={currentUser}
      />
      <BannerSection isMobile={isMobile} />
      <TestimonialSection isMobile={isMobile} />
      <AccordionSection isMobile={isMobile} />
    </div>
  );
}

function PricingSection({
  isMobile,
  subscriptionPlans,
  STORE_SELECTED_PLAN,
  currentUser,
}) {
  const [activeTab, setActiveTab] = useState("monthly");

  const pricingList = [
    {
      label: "Monthly",
      value: "monthly",
      element: createElement(PriceCard, {
        label: "Monthly",
        subscriptionPlans: subscriptionPlans?.monthly,
        STORE_SELECTED_PLAN: STORE_SELECTED_PLAN,
        currentUser: { currentUser },
      }),
    },
    {
      label: "Annual",
      value: "annual",
      element: createElement(PriceCard, {
        label: "Annual",
        subscriptionPlans: subscriptionPlans?.annual,
        STORE_SELECTED_PLAN: STORE_SELECTED_PLAN,
        currentUser: { currentUser },
      }),
    },
  ];

  return (
    <section className='relative'>
      <div className='hero-wrapper'>
        <div className='absolute inset-0 top-0 -z-[9999] bg-[url("/hero-pattern.svg")] bg-cover blur-2xl' />
        <div className='mx-auto mb-16 w-full px-6 lg:max-w-7xl lg:px-8'>
          <div className='mx-auto mb-6 flex max-w-xs flex-row justify-center gap-4 md:gap-8'>
            <div className='flex flex-row items-center gap-2'>
              <img
                src='https://i.ibb.co/8rzdPRf/windows.png'
                alt='Windows OS'
                loading='lazy'
                className='h-5 w-5'
              />
              <span className='text-xs text-blue-500 md:text-sm'>Windows</span>
            </div>
            <div className='min-h-full w-px border-l border-gray-100 md:block'></div>
            <div className='flex flex-row items-center gap-2'>
              <img
                src='https://i.ibb.co/pjfGF54/apple.png'
                alt='Macintosh OS'
                loading='lazy'
                className='h-5 w-5'
              />
              <span className='text-xs md:text-sm'>Mac</span>
            </div>
          </div>
          <div className='flex items-start justify-center gap-2 md:items-center'>
            <CheckIcon strokeWidth={2} className='h-4 w-4 text-emerald-500' />
            <Typography className='text-center text-xs'>
              30-day money-back guarantee. One month free for annual contracts.
            </Typography>
          </div>
          <Typography
            variant={isMobile ? "h2" : "h1"}
            color='blue-gray'
            className='mb-6 mt-4 text-center font-manrope font-extrabold tracking-tight'>
            Honest pricing, no surprises
          </Typography>
          <p className='md:text-md mr-auto mt-3 max-w-2xl text-center font-light leading-relaxed tracking-tight text-blue-gray-500 dark:text-blue-gray-400 md:mx-auto'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab porro
            minima, ratione quibusdam dolorum tempore.
          </p>
        </div>
        <div className='mx-auto w-full max-w-3xl items-center px-6 lg:px-8'>
          <Tabs value='monthly' className='w-full'>
            <TabsHeader
              className='mx-auto w-full max-w-[250px] rounded-full border border-blue-gray-50 bg-inherit'
              indicatorProps={{
                className: "bg-blue-400 shadow-none text-white rounded-full",
              }}>
              {pricingList.map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  onClick={() => setActiveTab(value)}
                  className={`py-1.5 text-sm font-semibold transition-colors delay-0 duration-0 ease-in-out ${
                    activeTab === value ? "text-white" : "text-blue-gray-700"
                  }`}>
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody
              animate={{
                initial: { y: 250 },
                mount: { y: 0 },
                unmount: { y: 250 },
              }}>
              {pricingList.map(({ value, element }) => (
                <TabPanel key={value} value={value} className='p-0'>
                  <div className='mt-8 grid grid-cols-1 items-center gap-4 md:grid-cols-2 md:gap-8'>
                    {element}
                  </div>
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </div>
        <div className='mt-6'>
          <div className='mx-auto flex w-full max-w-xs items-center justify-between gap-3 md:max-w-3xl'>
            <div className='flex w-full flex-col items-center gap-6 md:w-auto md:flex-row'>
              <div className='flex w-full items-center justify-between md:w-auto'>
                <Typography
                  variant='h4'
                  color='blue-gray'
                  className='block whitespace-nowrap uppercase italic md:hidden'>
                  priori pos
                </Typography>
                <Link to='/download'>
                  <Button
                    variant='outlined'
                    size='sm'
                    className='block md:hidden'>
                    <span className='text-xs md:text-sm'>download</span>
                  </Button>
                </Link>
              </div>
              <div className='grid w-full flex-col gap-4 md:flex md:w-auto md:flex-row'>
                <div className='flex items-center gap-2'>
                  <CheckIcon
                    strokeWidth={2}
                    className='h-4 w-4 text-emerald-500'
                  />
                  <Typography className='text-xs'>
                    Documentation provided
                  </Typography>
                </div>
                <div className='flex items-center gap-2'>
                  <CheckIcon
                    strokeWidth={2}
                    className='h-4 w-4 text-emerald-500'
                  />
                  <Typography className='text-xs'>Customer Support</Typography>
                </div>
                <div className='flex items-center gap-2'>
                  <CheckIcon
                    strokeWidth={2}
                    className='h-4 w-4 text-emerald-500'
                  />
                  <Typography className='text-xs'>No ads</Typography>
                </div>
              </div>
            </div>
            <Link to='/download'>
              <Button variant='outlined' size='sm' className='hidden md:block'>
                <span className='text-xs md:text-sm'>download</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function BannerSection({ isMobile }) {
  return (
    <section className='relative'>
      <div className='absolute inset-0 -z-[9999] bg-[url("/features-pattern.svg")] bg-cover opacity-30' />
      <div className='mx-auto max-w-7xl px-8 py-36 lg:py-48'>
        <div className='mb-14 md:mb-20'>
          <Typography
            variant={isMobile ? "h4" : "h3"}
            color='blue-gray'
            className='text-left tracking-tight lg:text-center'>
            Reliable Solutions for Streamlined Point-of-Sale (POS)
          </Typography>
        </div>
        <div className='mx-auto flex flex-col justify-between gap-y-14 md:gap-x-12 lg:flex-row '>
          <div className='items-left flex w-full flex-col justify-center lg:w-1/2 lg:text-left'>
            <div>
              <Typography
                variant={isMobile ? "h5" : "h4"}
                className='tracking-tight'>
                No sneaky charges, what you see is what you get
              </Typography>
              <Typography
                variant='paragraph'
                className='max-w-md pt-4 tracking-tight text-gray-700'>
                We believe in transparency and honesty. That is why our pricing
                is straightforward with no hidden fees or charges. What you see
                is what you get.
              </Typography>
            </div>
            <div className='mt-6'>
              <Typography
                variant={isMobile ? "h5" : "h4"}
                className='tracking-tight'>
                A money back guarantee, if ever you regret
              </Typography>
              <Typography
                variant='paragraph'
                className='max-w-md pt-4 tracking-tight text-gray-700'>
                For any reason you are not completely satisfied with your
                purchase, we offer a no-questions-asked money-back guarantee to
                ensure a risk-free transaction.
              </Typography>
            </div>
          </div>
          <div className='relative flex w-full items-center justify-center rounded-lg lg:w-1/2'>
            <img
              src='https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
              loading='lazy'
              className='h-full w-full rounded-lg bg-cover shadow-sm'
            />
            <div className='to-bg-black-10 absolute inset-0 h-full w-full rounded-lg bg-gradient-to-tr from-transparent via-transparent to-black/60 ' />
            <Chip
              size='sm'
              icon={<CheckCircleIcon />}
              value='30-day money-back guarantee'
              className='absolute right-4 top-4'
            />
            {/* <div className='to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/10 via-black/20' /> */}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialSection({ isMobile }) {
  const testimonial = [
    {
      author: "Juan Dela Cruz",
      handle: "@juandelacruzyo",
      image:
        "https://images.unsplash.com/photo-1642060603505-e716140d45d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGlub3l8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      body: "Our experience has been exceptional. The platform provides a seamless and intuitive interface, allowing us to manage our point-of-sale operations with ease. The range of features offered is impressive, catering to our diverse needs as a business.",
    },
    {
      author: "John Doe",
      handle: "@johndoe",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      body: "With its user-friendly interface and comprehensive features, managing transactions has never been easier.",
    },
    {
      author: "James",
      handle: "@jamesceo",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      body: "I'm truly impressed by the user-friendly interface and extensive features that have made transaction management a breeze. It's been a game-changer for our business!",
    },
    {
      author: "Sarah",
      handle: "@sarahowner",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      body: "Priori Systems has simplified our transaction management process with its intuitive interface and powerful features. It's an invaluable tool for our team!",
    },
    {
      author: "Michael",
      handle: "@michaelnice",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      body: "As a seasoned entrepreneur, I can confidently say that Priori Systems offers the most seamless transaction management experience. Highly recommended!",
    },
    {
      author: "Emily",
      handle: "@emilyig",
      image:
        "https://plus.unsplash.com/premium_photo-1670002383626-10c63bbe67d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      body: "Priori Systems provides a refreshing approach to transaction management with its easy-to-use interface and a wide range of features. A must-have for any business.",
    },
    {
      author: "David",
      handle: "@davidg",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      body: "Since using Priori Systems, handling transactions has become a pleasure. The platform's user-friendly design and comprehensive tools have significantly boosted our efficiency.",
    },
  ];

  return (
    <section className='relative mx-auto flex w-full max-w-7xl flex-col items-center justify-center bg-opacity-30 px-8 py-24 font-manrope lg:py-28'>
      <div className='absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl'>
        <svg
          className='relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] scale-125 opacity-30 sm:left-[calc(50%-30rem)] sm:h-[42.375rem]'
          viewBox='0 0 1155 678'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            fill='url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)'
            fillOpacity='.3'
            d='M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z'
          />
          <defs>
            <linearGradient
              id='45de2b6b-92d5-4d68-a6a0-9b9b2abad533'
              x1='1155.49'
              x2='-78.208'
              y1='.177'
              y2='474.645'
              gradientUnits='userSpaceOnUse'>
              <stop stopColor='#26c6da'></stop>
              <stop offset='1' stopColor='#1e88e5'></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className='flex flex-col items-center justify-center text-center'>
        <Typography
          variant='h6'
          color='blue'
          className='mb-4 rounded-full bg-blue-50/50 tracking-tight'
          textGradient>
          Testimonials
        </Typography>
        <Typography
          variant={isMobile ? "h4" : "h3"}
          color='blue-gray'
          className='mb-8 max-w-5xl text-center font-manrope tracking-tight md:mb-16 '>
          At Priori, our pricing is like a trustworthy mate. Open and sincere,
          never leaving you in a state
        </Typography>
        <div className='grid grid-flow-dense grid-cols-1 grid-rows-[masonry] gap-8 text-left text-sm leading-6 text-gray-900 sm:grid-cols-2 xl:grid-cols-4'>
          {testimonial.map(({ body, author, image, handle }) => (
            <div
              className='group/item transition duration-200 ease-in-out hover:scale-105 first:sm:col-span-2 first:xl:col-start-2'
              key={handle}>
              <div className='container mx-auto h-full'>
                <figure className='flex h-full flex-col justify-center space-y-6 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5 transition group-first/item:bg-blue-500 group-first/item:text-white lg:space-y-8 lg:p-10'>
                  <blockquote className='tracking-tight group-first/item:lg:text-xl group-first/item:lg:font-medium'>
                    <p>&quot;{body}&quot;</p>
                  </blockquote>
                  <figcaption className='flex items-center gap-x-4'>
                    <Avatar size='sm' src={image} />
                    <div className='flex-auto'>
                      <div className='!text-sm font-semibold'>{author}</div>
                      <div className='!text-sm text-gray-600 group-first/item:text-gray-200'>
                        {handle}
                      </div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AccordionSection({ isMobile }) {
  const [accordionOpen, setAccordionOpen] = useState(0);

  const toggleAccordion = (value) =>
    setAccordionOpen(accordionOpen === value ? 0 : value);

  const accordionItems = [
    {
      id: 1,
      header: "What’s the difference between Retail and Restaurant POS?",
      desc: "We're not always in the position that we want to be at. We're constantly growing. We're constantly making mistakes. We're constantly trying to express ourselves and actualize our dreams.",
    },
    {
      id: 2,
      header: "What payment methods are accepted?",
      desc: "We offer a range of convenient and secure payment methods for your convenience. Our accepted payment options include Google Pay, GCash, Grab Pay, and PayPal.",
    },
    {
      id: 3,
      header: " How do I request for a refund if I change my mind?",
      desc: "To initiate a refund, we kindly request that you reach out to our dedicated customer support team, the button conveniently located in the lower-right side of your screen. It is important to note that the refund process may vary depending on your bank or payment provider, ensuring a smooth and efficient return of funds.",
    },
  ];

  return (
    <section className='relative'>
      <div className='hero-wrapper flex flex-col gap-8 px-6 md:flex-row lg:px-8'>
        <div className='w-full md:w-1/2 md:px-4'>
          <Typography
            variant='h6'
            color='blue'
            className='mb-4 rounded-full bg-blue-50/50 tracking-tight'
            textGradient>
            Frequently Asked Questions
          </Typography>
          <Typography
            variant='h2'
            color='blue-gray'
            className='mb-5 font-extrabold tracking-tight'>
            Top customer questions
          </Typography>
          <Typography
            variant='paragraph'
            color='gray'
            className='font-medium tracking-tight'>
            We will do our best to answer your most frequently asked questions
            based on users experience.
          </Typography>
          <div className='mr-auto mt-8 flex w-full max-w-sm flex-col items-center gap-4 rounded-xl bg-white px-5 py-7 shadow-sm ring-1 ring-blue-gray-50 md:mt-10'>
            <div className='flex flex-col items-start gap-4 sm:flex-row sm:items-center'>
              <div className='flex h-min w-min items-center justify-center rounded-xl bg-blue-gray-900 p-3'>
                <QuestionMarkCircleIcon
                  className='h-8 w-8 text-white'
                  strokeWidth={2}
                />{" "}
              </div>
              <div>
                <Typography
                  variant='h6'
                  color='blue-gray'
                  className='tracking-tight'>
                  Still have questions?
                </Typography>
                <Typography
                  variant='small'
                  color='gray'
                  className='tracking-tight'>
                  Can&apos;t find the answer you&apos;re looking for? Please
                  chat our customer service team for more info.
                </Typography>
              </div>
            </div>
            <div className='mt-2 w-full'>
              <Button size='md' fullWidth>
                Get in touch
              </Button>
            </div>
          </div>
        </div>
        <div className='mx-auto flex w-full flex-col items-center justify-center gap-3 md:w-1/2 md:px-4'>
          {accordionItems &&
            accordionItems.map(({ id, header, desc }) => (
              <Accordion
                key={header}
                open={accordionOpen === id}
                className='mb-2 rounded-lg px-4 shadow-sm md:px-6'>
                <AccordionHeader
                  onClick={() => toggleAccordion(id)}
                  className={`border-b-0 py-4 text-base font-bold tracking-tight text-blue-gray-900 transition-colors md:py-6 ${
                    accordionOpen === id
                      ? "text-blue-500 hover:!text-blue-700"
                      : ""
                  }`}>
                  {header}
                </AccordionHeader>
                <AccordionBody className='pt-0 text-sm font-normal tracking-tight md:text-base'>
                  <Typography variant='paragraph' color='gray'>
                    {desc}
                  </Typography>
                </AccordionBody>
              </Accordion>
            ))}
        </div>
      </div>
    </section>
  );
}

function PriceCard({
  subscriptionPlans,
  STORE_SELECTED_PLAN,
  label,
  currentUser,
}) {
  const vat = 0;

  return (
    <Fragment>
      {subscriptionPlans &&
        subscriptionPlans.map((plan, key) => (
          <div
            key={key}
            className='h-full rounded-2xl bg-inherit bg-white ring-1 ring-inset ring-blue-gray-50'>
            <div className='flex h-full flex-col p-8'>
              <div className='mb-5 w-min self-end text-center md:self-start'>
                {label === "Annual" && (
                  <Chip
                    className='rounded-full bg-emerald-300 text-sm font-extrabold text-blue-gray-900'
                    color='green'
                    size='lg'
                    variant='filled'
                    value={plan.value === 510 ? "15% OFF" : "10% OFF"}
                  />
                )}
              </div>
              <div className='flex flex-col-reverse items-start gap-y-2 md:flex-row md:items-center md:justify-between md:gap-0'>
                <Typography
                  variant='lead'
                  color='blue-gray'
                  className='text-left font-semibold tracking-tight'>
                  {plan.planName}
                </Typography>
                <div>
                  <Chip
                    variant='ghost'
                    size='sm'
                    value={`${label} Plan`}
                    className='rounded-full normal-case'
                  />
                </div>
              </div>
              <div className='py-5'>
                <div className='text-left'>
                  <Typography
                    variant='h2'
                    color='blue-gray'
                    className='whitespace-nowrap font-bold uppercase'>
                    ${plan.value}.00
                    <span className='text-sm font-semibold normal-case text-gray-800'>
                      {label === "Annual" ? "/yearly" : "/month"}
                    </span>
                  </Typography>
                </div>
              </div>
              <div>
                <Typography
                  variant='paragraph'
                  color='blue-gray'
                  className='tracking-tight'>
                  {plan.value === 50
                    ? "Everything you need to create your store, ship products, and process payments"
                    : "Level up your business with professional reporting and more staff accounts"}
                </Typography>
              </div>
              <div>
                <Button
                  variant='filled'
                  color='blue'
                  size='md'
                  onClick={() =>
                    STORE_SELECTED_PLAN({
                      planId: plan.planId,
                      planName: plan.planName,
                      value: plan.value,
                      duration: plan.duration,
                      total: plan.value - vat,
                    })
                  }
                  className='mt-8 shadow-none hover:shadow-sm'
                  fullWidth>
                  <span className='text-xs normal-case md:text-sm'>
                    {currentUser.role === "paid"
                      ? "Purchase plan"
                      : "Upgrade plan"}
                  </span>
                </Button>
              </div>
              {plan.itemList.map(({ standard_list, additional_list }, key) => (
                <div key={key} className='my-8 flex h-full flex-grow flex-col'>
                  {standard_list.map((item, key) => (
                    <ul role='list' className='mt-3.5 first:mt-0' key={key}>
                      <li key={key} className='flex items-center gap-4 text-sm'>
                        <CheckIcon
                          className='h-5 w-5 text-blue-500'
                          strokeWidth={2}
                        />
                        <span className='text-blue-gray-900'>{item}</span>
                      </li>
                    </ul>
                  ))}
                  {additional_list.map((item, key) => (
                    <ul role='list' className='mt-3.5' key={key}>
                      <li key={key} className='flex items-center gap-4 text-sm'>
                        <CheckIcon
                          className='h-5 w-5 text-blue-500'
                          strokeWidth={2}
                        />
                        <span className='text-blue-gray-900'>{item}</span>
                      </li>
                    </ul>
                  ))}
                </div>
              ))}
              <div className='mt-4 flex items-center justify-center gap-2'>
                <CurrencyDollarIcon
                  className='h-5 w-5 text-emerald-500'
                  strokeWidth={1}
                />
                <span className='whitespace-nowrap text-sm text-emerald-500'>
                  30-day money-back guarantee
                </span>
              </div>
              <div className='mt-2 text-center md:mt-1'>
                <span className='text-xs text-gray-700'>
                  *Billed at USD {plan.value}.00{" "}
                  {plan.duration === "annually" ? "one time" : "every month"}
                </span>
              </div>
            </div>
          </div>
        ))}
    </Fragment>
  );
}
