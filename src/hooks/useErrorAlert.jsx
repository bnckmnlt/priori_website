import React from "react";
import { Alert, Button } from "@material-tailwind/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

function AlertComponent(props) {
  return (
    <Alert
      {...props}
      className='ml-auto mr-3 mt-3 max-w-xs md:max-w-lg'
      color='red'
      icon={<ExclamationTriangleIcon className='h-6 w-6' />}
      variant='gradient'
      animate={{
        mount: { y: 0 },
        unmount: { y: 100 },
      }}
    />
  );
}

export function ErrorAlert({ isOpen, message, onClose = () => {} }) {
  return (
    <>
      {isOpen && (
        <AlertComponent
          open={isOpen}
          action={
            <Button
              variant='text'
              color='white'
              size='sm'
              className='!absolute right-3 top-3'
              onClick={onClose}>
              Close
            </Button>
          }>
          {message}
        </AlertComponent>
      )}
    </>
  );
}

export function useErrorAlert({ error, clearError, hideAfterMs }) {
  const [showErrorAlert, setShowErrorAlert] = React.useState(false);
  const clearErrorAlert = React.useCallback(() => {
    clearError();
    setShowErrorAlert(false);
  }, [clearError]);

  React.useEffect(() => {
    if (error) {
      setShowErrorAlert(true);
      if (hideAfterMs) {
        const timeout = setTimeout(() => {
          clearErrorAlert();
        }, hideAfterMs);
        return () => {
          clearTimeout(timeout);
        };
      }
    } else {
      setShowErrorAlert(false);
    }
  }, [error, clearErrorAlert, hideAfterMs]);

  return () => (
    <ErrorAlert
      isOpen={showErrorAlert}
      message={error}
      onClose={() => {
        clearErrorAlert();
      }}
    />
  );
}
