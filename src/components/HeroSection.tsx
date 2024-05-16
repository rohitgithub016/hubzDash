import { Flex, Button, Typography } from "antd";
// @ts-ignore
import Logo from "../assets/svgs/Logo";
import LoginButtonHeader from "./LoginButtonHeader";
import { Grid } from "antd";

const { useBreakpoint } = Grid;
function HeroSection({userData, at}: {userData: any, at :any}) {

  

  // Define the horizontal position of the logo

  // Define the vertical position of each paragraph
  const hubz_url = import.meta.env.VITE_HUBZ_BOT_URL;
  const screens = useBreakpoint();

  const handleClick = () => {
    window.open(hubz_url, "_blank");
  };

  return (
    <>
      <Flex
        style={{
          backgroundImage:
            "url('https://s3-hubz-dashboard-images.s3.ap-southeast-1.amazonaws.com/Rectangle.jpg')",
          backgroundRepeat: "round",
        }}
        justify="space-between"
        align="center"
        vertical
      >
        <div
          style={{ marginLeft: "70px", marginRight: "70px", marginTop: "30px" }}
        >
          <Flex justify="space-between" style={{ width: "100%" }}>
            <a href="/">
              <Logo />
            </a>

            <LoginButtonHeader userData={userData} at = {at}  />
          </Flex>
          <Flex
            align="center"
            style={{ flex: 1, marginTop: screens?.xs ? "50px" : "20px" }}
          >
            <Flex style={{ flex: 1, paddingTop: 0 }} vertical>
              <Typography.Title
                style={{
                  color: "#007BFE",
                  fontSize: "50px",
                  fontFamily: "Scandia-Medium",
                  fontWeight: 500,
                  marginTop: 0,
                }}
              >
                Hubz Chat Analytics
              </Typography.Title>
              <Typography.Title
                level={3}
                style={{
                  color: "#35373B",
                  margin: 0,
                  fontSize: "33px",
                  fontFamily: "Scandia-Medium",
                }}
              >
                Access a wealth of onchain data about your users.
              </Typography.Title>
              <Typography.Text
                type="secondary"
                style={{
                  color: "#35373B",
                  fontSize: "22px",
                  fontFamily: "Scandia-Regular",
                  fontWeight: 400,
                }}
              >
                Analyze essential data and metrics about your Hubz chat to understand your users better and improve their experience.
              </Typography.Text>
              <Button
                onClick={handleClick}
                type="primary"
                size="large"
                style={{
                  marginTop: "60px",
                  width: screens?.md ? "25vw" : "100%",
                  borderRadius: "10px",
                  background: "#3B63F6",
                  height: "61px",
                  fontSize: "24px",
                  fontFamily: "Scandia-Medium",
                }}
              >
                Get Started for free
              </Button>
            </Flex>
            {screens?.md && (
              <Flex style={{ flex: 1 }} align="flex-end" justify="flex-end">
                <img
                  src="https://s3-hubz-dashboard-images.s3.ap-southeast-1.amazonaws.com/Graphs.gif"
                  width={"70%"}
                  height={"70%"}
                />
              </Flex>
            )}
          </Flex>
        </div>
      </Flex>
    </>
  );
}

export default HeroSection;
