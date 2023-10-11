import "./index.css";
import React from "react";
import { Helmet } from "react-helmet";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useNewRequest } from "./hooks/util-hooks";
import LoadingSpinner from "./components/LoadingSpinner";

import RootLayout from "./layouts/RootLayout";
import AccountLayout from "./layouts/AccountLayout";
import CheckoutLayout from "./layouts/CheckoutLayout";
import Home from "./routes/pages/Home";
import Features from "./routes/pages/Features";
import Pricing from "./routes/pages/Pricing";
import Download from "./routes/pages/Download";
import Signin from "./routes/auth/Signin";
import Signup from "./routes/auth/Signup";
import Checkout from "./routes/checkout/Checkout";
import Payment from "./routes/checkout/Payment";
import PaymentSuccess from "./routes/payment/PaymentSuccess";
import Profile from "./routes/account/Profile";
import Billing from "./routes/account/Billing";
import Invoice from "./routes/account/Invoice";
import ContactUs from "./routes/pages/Contact-us";
import NotFound from "./routes/NotFound";
import { signinUser } from "./redux/authReducer";
import { useDispatch, useSelector } from "react-redux";

const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth0();

  return user && isAuthenticated ? element : navigate("/signin");
};

const CheckValidUserRoute = ({ element }) => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const newAxiosRequest = useNewRequest();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  async function checkUserRecord() {
    try {
      if (isAuthenticated) {
        if (!currentUser) {
          const response = await newAxiosRequest.get(`/auth/${user?.sub}`);

          if (response.status === 201) {
            navigate("/auth/signup");
          }
          const { name, email, role } = response.data;
          dispatch(signinUser({ name: name, email: email, role: role }));
        }
      }
    } catch (e) {
      console.error(e.code);
    }
  }

  React.useEffect(() => {
    if (isAuthenticated) {
      checkUserRecord();
    }
  }, [isAuthenticated, currentUser]);

  return element;
};

export default function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const newAxiosRequest = useNewRequest();

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Helmet>
            <title>Professional Point of Sale Solutions | Priori Systems</title>
          </Helmet>
          <CheckValidUserRoute element={<RootLayout />} />
        </>
      ),
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "features",
          element: (
            <>
              <Helmet>
                <title>Features | Priori Systems</title>
              </Helmet>
              <Features />
            </>
          ),
        },
        {
          path: "pricing",
          loader: async () => {
            const response = await newAxiosRequest.get(`/subscription`);
            return response.data;
          },
          element: (
            <>
              <Helmet>
                <title>Pricing | Priori Systems</title>
              </Helmet>
              <Pricing />
            </>
          ),
        },
        {
          path: "download",
          element: (
            <>
              <Helmet>
                <title>
                  Download Priori POS for Windows/Mac | Priori Systems
                </title>
              </Helmet>
              <Download />
            </>
          ),
        },
        {
          path: "*",
          element: (
            <>
              <Helmet>
                <title>Error 404 | Page not found</title>
              </Helmet>
              <NotFound />
            </>
          ),
        },
      ],
    },
    {
      path: "contact-us",
      element: (
        <>
          <Helmet>
            <title>Contact us | Priori Systems</title>
          </Helmet>
          <ContactUs />
        </>
      ),
    },
    {
      path: "auth",
      children: [
        {
          path: "signin",
          element: <Signin />,
        },
        {
          path: "signup",
          element: <ProtectedRoute element={<Signup />} />,
        },
        {
          path: "*",
          element: (
            <>
              <Helmet>
                <title>Error 404 | Page not found</title>
              </Helmet>
              <NotFound />
            </>
          ),
        },
      ],
    },
    {
      path: "checkout",
      element: <ProtectedRoute element={<CheckoutLayout />} />,
      children: [
        {
          path: "",
          element: (
            <>
              <Helmet>
                <title>Checkout | Priori Systems Checkout</title>
              </Helmet>
              <Checkout />
            </>
          ),
        },
        {
          path: "payment",
          loader: async () => {
            const result = await newAxiosRequest.get(
              `/transaction/${user?.sub}`
            );
            if (result.status === 404) {
              throw new Response("Not Found", { status: 404 });
            }
            return result.data;
          },
          element: (
            <>
              <Helmet>
                <title>Payment| Priori Systems Checkout</title>
              </Helmet>
              <Payment />
            </>
          ),
        },
        {
          path: "payment/success/:transactionId",
          element: <PaymentSuccess />,
        },
        {
          path: "*",
          element: (
            <>
              <Helmet>
                <title>Error 404 | Page not found</title>
              </Helmet>
              <NotFound />
            </>
          ),
        },
      ],
    },
    {
      path: "account",
      element: <ProtectedRoute element={<AccountLayout />} />,
      children: [
        {
          path: "profile",
          element: (
            <>
              <Helmet>
                <title>Profile | Priori Systems</title>
              </Helmet>
              <Profile />
            </>
          ),
        },
        {
          path: "billing",
          loader: async () => {
            const result = await newAxiosRequest.get(
              `/billing/invoices/${user.sub}`
            );

            if (Array.isArray(result.data)) {
              return result.data;
            } else {
              console.error(result.data);
            }
          },
          element: (
            <>
              <Helmet>
                <title>Billing | Priori Systems</title>
              </Helmet>
              <Billing />
            </>
          ),
        },
        {
          path: "billing/invoice/:transactionId",
          loader: async ({ params }) => {
            const result = await newAxiosRequest.get(
              `/billing/invoice/${user?.sub}/${params.transactionId}`
            );

            if (result.status === 200) {
              return result.data;
            } else {
              console.error(result.data);
            }
          },
          element: (
            <>
              <Helmet>
                <title>Invoice | Priori Systems</title>
              </Helmet>
              <Invoice />
            </>
          ),
        },
        {
          path: "*",
          element: (
            <>
              <Helmet>
                <title>Error 404 | Page not found</title>
              </Helmet>
              <NotFound />
            </>
          ),
        },
      ],
    },
  ]);

  if (isLoading && !isAuthenticated) {
    return <LoadingSpinner opacity={100} />;
  }
  return <RouterProvider router={router} />;
}
