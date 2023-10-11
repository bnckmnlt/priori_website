import GooglePayButton from "@google-pay/button-react";
import { PayPalButtons } from "@paypal/react-paypal-js";

export function GooglePayButtonComponent({
  setProcessing,
  setPaymentStatus,
  user,
  price,
}) {
  const googlePayConfiguration = {
    environment: "TEST",
    paymentRequest: {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: "CARD",
          parameters: {
            allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
            allowedCardNetworks: ["MASTERCARD", "VISA"],
          },
          tokenizationSpecification: {
            type: "PAYMENT_GATEWAY",
            parameters: {
              gateway: "example",
              gatewayMerchantId: "exampleGatewayMerchantId",
            },
          },
        },
      ],
      merchantInfo: {
        merchantId: "12345678901234567890",
        merchantName: "Priori Systems",
      },
      transactionInfo: {
        totalPriceStatus: "FINAL",
        totalPriceLabel: "Total",
        totalPrice: `${price}.00`,
        currencyCode: "USD",
        countryCode: "US",
      },
      callbackIntents: ["PAYMENT_AUTHORIZATION"],
    },
    onLoadPaymentData: (paymentRequest) => {
      console.log(paymentRequest);
      setProcessing(false);
      setPaymentStatus({ status: "success", payload: paymentRequest });
    },
    onPaymentAuthorized: (paymentData) => {
      console.log(paymentData);
      return { transactionState: "SUCCESS" };
    },

    onClick: () => {
      if (!user) {
        return;
      }
      setProcessing(true);
    },
    onError: (error) => {
      if (error instanceof Error) {
        setProcessing(false);
        setPaymentStatus(error.statusCode);
      } else {
        setProcessing(false);
        setPaymentStatus(error.statusCode);
      }
    },
    onCancel: () => {
      setProcessing(false);
    },
  };

  return (
    <GooglePayButton
      environment={googlePayConfiguration.environment}
      paymentRequest={googlePayConfiguration.paymentRequest}
      onLoadPaymentData={googlePayConfiguration.onLoadPaymentData}
      onPaymentAuthorized={googlePayConfiguration.onPaymentAuthorized}
      onClick={googlePayConfiguration.onClick}
      onError={googlePayConfiguration.onError}
      onCancel={googlePayConfiguration.onCancel}
    />
  );
}

export function PayPalButtonComponent({ setPaymentStatus, price, planName }) {
  const createOrder = async (data) => {
    return await fetch(
      `${
        import.meta.env.VITE_APP_BACKENDAPI_URI
      }/api/paypal/create-paypal-order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item: {
            description: planName,
            price: price,
          },
        }),
      }
    )
      .then((response) => response.json())
      .then((order) => order.id);
  };

  const onApprove = async (data) => {
    return await fetch(
      `${
        import.meta.env.VITE_APP_BACKENDAPI_URI
      }/api/paypal/capture-paypal-order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID: data.orderID,
        }),
      }
    )
      .then((response) => response.json())
      .then((details) => {
        setPaymentStatus({ status: details.status, payload: details });
      });
  };

  return (
    <PayPalButtons
      style={{ color: "blue", tagline: false }}
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  );
}
