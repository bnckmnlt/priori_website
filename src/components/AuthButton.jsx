import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { signoutUser } from "../redux/authReducer";

export function LoginButton({ value, size }) {
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();

  const handleLogin = () => {
    loginWithRedirect();
  };

  return (
    !user &&
    !isAuthenticated && (
      <Button size={size} onClick={handleLogin}>
        {value}
      </Button>
    )
  );
}

export function SignupButton({ value, size }) {
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();

  async function handleSignup() {
    await loginWithRedirect({
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  }

  return (
    !user &&
    !isAuthenticated && (
      <Button size={size} onClick={handleSignup}>
        {value}
      </Button>
    )
  );
}

export function LogoutButton({ size, value, variant, classname, color }) {
  const { logout, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();

  async function handleSignout() {
    dispatch(signoutUser());
    logout();
  }

  return (
    isAuthenticated && (
      <Button
        variant={variant}
        size={size}
        color={color}
        onClick={handleSignout}
        className={classname}>
        {value}
      </Button>
    )
  );
}
