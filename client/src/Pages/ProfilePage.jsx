import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../Components/AccountNav";

const AccountPage = () => {
  const { user, ready, setuser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function Logout() {
    await axios.post("/api/auth/logout");
    setuser(null);
    setRedirect("/");
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <>
      <AccountNav />
      {subpage == "profile" && (
        <div className="text-center max-w-lg mx-auto">
          <h2 className="text-2xl my-4">Account Profile Details</h2>
          <input
            type="text"
            placeholder={"username "}
            value={user.name}
            onChange={(ev) => () => {
              ev.target.value;
            }}
          />
          <input
            type="text"
            placeholder={"email Address"}
            value={user.email}
            disabled
          />
          <br />
          <button onClick={Logout} className="primary max-w-sm mt-20">
            Logout
          </button>
        </div>
      )}

      {subpage == "places" && (
        <div className="text-center max-w-lg mx-auto">
          <PlacesPage />
        </div>
      )}

      {subpage == "bookings" && (
        <div className="text-center max-w-lg mx-auto"></div>
      )}
    </>
  );
};

export default AccountPage;
