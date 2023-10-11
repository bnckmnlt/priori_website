import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useShowLoader, useNewRequest } from "../../hooks/util-hooks";
import { useErrorAlert } from "../../hooks/useErrorAlert";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Button, Card, Input, Typography } from "@material-tailwind/react";

const Signup = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, isLoading } = useAuth0();
  const [formValues, setFormValues] = React.useState({
    firstName: "",
    lastName: "",
    businessName: "",
  });
  const [error, setError] = React.useState({ auth: null });
  const showLoader = useShowLoader(isLoading, 200);
  const newAxiosRequest = useNewRequest();

  const AuthErrorAlert = useErrorAlert({
    error: error.auth,
    clearError: () => {
      setError((prevError) => ({ ...prevError, auth: null }));
    },
    hideAfterMs: 4500,
  });

  React.useEffect(() => {
    async function checkUserRecord() {
      try {
        const response = await newAxiosRequest.get(`/auth/${user?.sub}`);

        if (response.status === 200) {
          navigate("/");
        }
      } catch (e) {
        console.error(e.code);
      }
    }

    if (user && isAuthenticated && !isLoading) {
      checkUserRecord();
    }
  }, [user, isAuthenticated, isLoading]);

  async function STORE_USER_DETAILS() {
    console.log(user?.sub);
    try {
      const response = await newAxiosRequest.post(
        `/auth/${user?.sub}`,
        JSON.stringify({
          name: `${formValues.firstName} ${formValues.lastName}`,
          email: user?.email,
        })
      );

      if (response.status === 201) {
        navigate("/");
      } else {
        setError((prevError) => ({
          ...prevError,
          auth: `${response.status}: ${response.data}`,
        }));
      }
    } catch (e) {
      setError((prevError) => ({ ...prevError, auth: e.response.data }));
    }
  }

  function handleInputChange(event) {
    const { name, value } = event.target;

    const regex = /^[A-Za-z\s]+$/;

    if (!regex.test(value)) {
      setError((prevError) => ({
        ...prevError,
        auth: "Input cannot contain special characters or digits.",
      }));
    } else {
      setError((prevError) => ({ ...prevError, [name]: null }));
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [name]: value,
      }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formValues.firstName || !formValues.lastName) {
      setError({ auth: "Please fill in the required fields." });
      return;
    }

    STORE_USER_DETAILS();
  }

  if (showLoader && !isAuthenticated && !user) {
    return <LoadingSpinner opacity='100' />;
  }
  return (
    <div className='relative mx-auto flex justify-center py-32 lg:py-24'>
      {error.auth && (
        <div className='absolute inset-x-0 right-3 top-3'>
          <AuthErrorAlert />
        </div>
      )}
      <div className='shadow-blue-gray-900/50 md:rounded-2xl md:bg-white/70 md:px-12 md:py-28 md:shadow-md'>
        <Card color='transparent' shadow={false}>
          <Typography
            variant='h3'
            color='blue-gray'
            className='text-center font-extrabold tracking-tight'>
            Let&apos;s get started!
          </Typography>
          <form
            className='mt-8 w-80 max-w-sm sm:w-full'
            onSubmit={handleSubmit}>
            <div className='mb-4 flex flex-col gap-3.5'>
              <Input
                size='lg'
                label='First name'
                name='firstName'
                value={formValues.firstName}
                onChange={handleInputChange}
              />
              <Input
                size='lg'
                label='Last name'
                name='lastName'
                value={formValues.lastName}
                onChange={handleInputChange}
              />
              <Input
                size='lg'
                label='Business name (Optional)'
                name='businessName'
                value={formValues.businessName}
                onChange={handleInputChange}
              />
            </div>
            <Button
              variant='filled'
              size='lg'
              type='submit'
              className='mt-6'
              fullWidth>
              continue
            </Button>
            <Typography
              color='gray'
              variant='small'
              className='mt-8 text-center font-normal tracking-tight text-gray-700'>
              By clicking &quot;Continue&quot;, you agree to our{" "}
              <Link
                to='/auth/terms-and-condition'
                className='inline-block text-blue-500 underline underline-offset-2'>
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to='/auth/privacy-policy'
                className='text-blue-500 underline underline-offset-2'>
                Privacy Policy
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
