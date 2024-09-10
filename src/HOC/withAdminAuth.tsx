import jwtDecode from "jwt-decode";
import { decode } from "querystring";
import { SD_Roles } from "../Utility/SD";

// a higer order component that returns the new component with props.
const withAdminAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const accessToken = localStorage.getItem("token");

    if (accessToken) {
      const decode: { role: string } = jwtDecode(accessToken);

      if (decode.role !== SD_Roles.ADMIN) {
        window.location.replace("/accessDenied");
      }
    }
    else{
      window.location.replace("/login");
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAdminAuth;
