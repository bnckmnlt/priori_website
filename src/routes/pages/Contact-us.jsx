import { Link } from "react-router-dom";
import { AuthFooter } from "../../components/Footer";
import {
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  HomeIcon,
  PaperAirplaneIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import {
  Typography,
  Button,
  Input,
  Select,
  Option,
  Textarea,
  Card,
  CardBody,
  CardHeader,
} from "@material-tailwind/react";

export default function ContactUs() {
  async function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <>
      <TopBar />
      <main className='relative isolate mx-auto max-w-7xl overflow-hidden bg-inherit pb-8 pt-14 sm:py-14'>
        <div className='grid h-full w-full gap-6 px-4 md:grid-cols-2 lg:gap-14 lg:px-8'>
          <div className='flex flex-col items-start justify-center py-6 sm:px-8 md:px-3 md:py-10'>
            <Typography
              variant='h2'
              color='blue-gray'
              className='text-left tracking-tight'>
              We&apos;d love to help!
            </Typography>
            <Typography
              variant='paragraph'
              color='blue-gray'
              className='mt-2 tracking-tight'>
              Need help with something? Reach out to our customer service team
              and we&apos;ll get in touch within 24 hours.
            </Typography>
            <div className='mt-8 flex w-full flex-col gap-3'>
              <div className='flex flex-col items-center gap-3 lg:flex-row'>
                <Button
                  size='sm'
                  className='flex items-center justify-center gap-3'
                  fullWidth>
                  <ChatBubbleLeftRightIcon
                    className='h-5 w-5'
                    strokeWidth={2}
                  />
                  via chat
                </Button>
                <Button
                  size='sm'
                  className='flex items-center justify-center gap-3'
                  fullWidth>
                  <PhoneIcon className='h-5 w-5' strokeWidth={2} />
                  via call
                </Button>
              </div>
              <a href='https://mail.google.com/mail/?view=cm&fs=1&to=help@priorihq.com'>
                <Button
                  variant='outlined'
                  size='sm'
                  className='flex w-full items-center justify-center gap-3'>
                  <EnvelopeIcon className='h-5 w-5' strokeWidth={2} />
                  via email form
                </Button>
              </a>
            </div>
            <div className='mt-8 flex w-full items-center gap-x-4'>
              <div className='h-px flex-auto bg-blue-gray-50'></div>
              <h4 className='flex-none text-sm font-semibold leading-6 tracking-tight text-blue-600'>
                or send us a message
              </h4>
              <div className='h-px flex-auto bg-blue-gray-50'></div>
            </div>
            <div className='mt-8 w-full'>
              <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div className='flex flex-col gap-4 xl:flex-row'>
                  <Input
                    type='text'
                    variant='outlined'
                    size='lg'
                    label='First name'
                    className='placeholder:tracking-tight placeholder:text-blue-gray-400'
                    required
                  />
                  <Input
                    type='text'
                    variant='outlined'
                    size='lg'
                    label='Last name (optional)'
                    className='placeholder:tracking-tight placeholder:text-blue-gray-400'
                  />
                </div>
                <Input
                  text='email'
                  variant='outlined'
                  size='lg'
                  label='Email'
                  className='placeholder:tracking-tight placeholder:text-blue-gray-400'
                  required
                />
                <Select
                  size='lg'
                  label='Concern'
                  animate={{
                    mount: { y: 0 },
                    unmount: { y: 25 },
                  }}>
                  <Option>Account</Option>
                  <Option>Subscription</Option>
                  <Option>Payment</Option>
                  <Option>Software/Application</Option>
                  <Option>Others</Option>
                </Select>
                <Textarea
                  variant='outlined'
                  size='lg'
                  label='Leave us a message'
                  className='placeholder:tracking-tight placeholder:text-blue-gray-400'
                  rows={5}
                  required
                />
                <div></div>
                <div>
                  <Button
                    variant='filled'
                    color='blue'
                    className='flex items-center justify-center gap-2'
                    onClick={handleSubmit}
                    fullWidth>
                    <PaperAirplaneIcon className='h-5 w-5' strokeWidth={2} />
                    Send
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <Card
            shadow={false}
            className='hidden h-full w-full items-end justify-center overflow-hidden text-center md:grid'>
            <CardHeader
              floated={false}
              shadow={false}
              color='transparent'
              className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://images.unsplash.com/photo-1620434167798-c39eb8b65a79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80')] bg-cover bg-center">
              <div className='to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50 backdrop-blur-sm' />
            </CardHeader>
            <CardBody className='relative px-6 py-10 md:px-8'>
              <Typography
                variant='h5'
                color='white'
                className='mb-6 text-left font-medium leading-[1.5] tracking-tight'>
                &quot;Empowering your success is our passion. Connecting with
                you is the heart of our business.&quot;
              </Typography>
              <div className='flex flex-col items-start '>
                <Typography className='text-lg font-medium text-gray-100'>
                  Juan Dela Cruz
                </Typography>
                <Typography className='font-nomal text-sm text-gray-400'>
                  Founder & CEO
                </Typography>
              </div>
            </CardBody>
          </Card>
        </div>
      </main>
      <AuthFooter />
    </>
  );
}

function TopBar() {
  return (
    <div className='mx-auto flex max-w-7xl items-center justify-between gap-4 px-2 py-2 lg:py-4'>
      <div className='flex flex-row items-center gap-2'>
        <img
          src='/logo.png'
          alt='Priori Systems'
          className='inline-block h-12 w-auto max-w-full'
        />
        <Typography variant='h6' color='blue-gray' className='tracking-tighter'>
          | Contact us
        </Typography>
      </div>
      <Link to='/'>
        <Button variant='text' size='lg' className='flex items-center gap-2'>
          <HomeIcon className='h-4 w-4' strokeWidth={2} />
          Go back
        </Button>
      </Link>
    </div>
  );
}
