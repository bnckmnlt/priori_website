import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton, SignupButton } from "../../components/AuthButton";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Typography } from "@material-tailwind/react";

export default function Signin() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (user && isAuthenticated) {
      navigate("/");
    }
  }, []);

  if (user && isAuthenticated) {
    return <LoadingSpinner opacity={100} />;
  }
  return (
    <>
      <div className='flex h-screen w-full flex-col items-center justify-center'>
        <div className='mx-auto flex w-full flex-auto flex-col items-center justify-center gap-5 text-center'>
          <div>
            <div className='m-auto h-24 w-24'>
              <img
                src='/logo.png'
                className='my-auto h-full max-h-full w-full max-w-full bg-cover'
              />
            </div>
            <Typography variant='h5' color='blue-gray'>
              Priori Systems
            </Typography>
            <Typography variant='paragraph' color='gray' className='mt-1.5 '>
              Log in using your Priori Systems account to proceed
            </Typography>
          </div>
          <div className='space-x-5'>
            <LoginButton size='md' value='Signin' />
            <SignupButton size='md' value='Signup' />
          </div>
        </div>
      </div>
    </>
  );
}
