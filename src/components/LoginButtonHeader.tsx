import { useState, useEffect } from "react";
//@ts-ignore
import Avatar from "/src/assets/svgs/Avatar"; // Assuming Avatar is a default export from the given path
import { LogoutOutlined } from '@ant-design/icons';
// @ts-ignore
import { logout } from "../api"; // Importing API function

function LoginButtonHeader({userData, at}: {userData: any, at:any}) {

  const [loginStatus, setLoginStatus] = useState(false);
  // const [userPicture, setUserPicture] = useState("");

  const [hover, setHover] = useState(false); // State to track hover status

  useEffect(() => {
    // Fetch and set the login status and user details from localStorage
    const storedLoginStatus = localStorage.getItem("loginStatus") === "true";
    // const userDetailsString = localStorage.getItem("userDetails");
    // const userDetails = userDetailsString ? JSON.parse(userDetailsString) : {};

    setLoginStatus(storedLoginStatus);
    // setUserPicture(userDetails.photo_url || "");
  }, []);

  const handleLogout = () => {
    console.log('Logging out...');
    logout(at)
      .then((response:any) => {
        console.log(response);
        // Clear local storage
        localStorage.clear();

        // Clear session storage if needed
        sessionStorage.clear();

        // Clear all cookies
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i];
          var eqPos = cookie.indexOf("=");
          var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }

        // Optionally, redirect to login page or home page
        window.location.href = "/"; // Update the URL as per your routing
      })
      .catch((error:any) => {
        console.error("There was a problem with the Axios request:", error);
      });
  };
  

  const displayName = userData?.first_name ? (userData?.first_name
    ?.length > 8 ? `${userData?.first_name
      .slice(0, 8)}...` : userData?.first_name
    ) : "Login";


  return (
    <div

      style={{
        position: "relative",
        display: "inline-block",
        borderRadius: "12px",
        overflow: "hidden",
        transition: "height 0.3s ease",
        height: userData?.first_name && hover ? "120px" : "61px", // Conditional height based on loginStatus and hover
        width: "158px",
        boxShadow: "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
        backgroundColor: "#FFF",
        cursor: "pointer",
        textAlign: "center"
      }}
      onMouseEnter={() => userData?.first_name && setHover(true)}
      onMouseLeave={() => userData?.first_name && setHover(false)}
    >
      <div
        style={{
          textAlign: "center",
          lineHeight: "61px",
          height: "61px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "#EDEDED",
            textAlign: "center"
          }}
        >
          {userData?.photo_url ? (
            <img
              src={userData?.photo_url}
              alt="User Avatar"
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
          ) : (
            <Avatar
              src="placeholder_avatar_url_here" // Placeholder or actual avatar URL
              alt="Default Avatar"
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
          )}
        </div>
        <span
          style={{
            position: "absolute",
            left: "68px",
            top: "50%",
            transform: "translateY(-50%)",
            fontFamily: "Scandia-Regular",
            fontSize: "16px",
            color: "#232D42",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            maxWidth: "calc(100% - 90px)",
            textAlign: "center"
          }}
        >
          {displayName}
        </span>
        {loginStatus && (
          <span style={{ position: "absolute", right: "10px", top: "52%", transform: "translateY(-50%)" }}>
            {/* <DownOutlined /> */}
          </span>
        )}
      </div>
      {userData?.first_name && hover && (
        <div
        onClick= {handleLogout}
          style={{
            position: "absolute",
            top: "61px",
            width: "100%",
            textAlign: "center",
            lineHeight: "61px",
            borderTop: "1px solid #EDEDED", // Visual separation
          }}
        >
          <LogoutOutlined onClick={handleLogout} style={{ marginRight: "10px" }} />Logout
        </div>
      )}
    </div>
  );
}

export default LoginButtonHeader;
