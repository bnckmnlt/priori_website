import { Spinner } from "@material-tailwind/react";

export default function LoadingSpinner({ component, opacity }) {
  return (
    <div
      className={`fixed inset-0 z-[999] flex h-auto w-full flex-col items-center justify-center bg-opacity-${opacity} bg-white`}>
      <Spinner className='h-12 w-12 text-blue-500/10' />
      {component}
    </div>
  );
}
