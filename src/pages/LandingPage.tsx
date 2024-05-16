import HeroSection from "../components/HeroSection";
import Cards from "../components/Cards";
import { Row, Col, Card, Flex, Typography, Divider } from "antd";
// @ts-ignore
import User from "../assets/svgs/User";
// @ts-ignore
import Diamond from "../assets/svgs/Diamond";
// @ts-ignore
import Box from "../assets/svgs/Box";
// @ts-ignore
import Compass from "../assets/svgs/Compass";
import TelegramLogin from "../components/TelegramLogin";
import Footer from "../components/Footer";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import UserDetails from "../components/UserDetails";
import { useEffect, useState } from "react";
// @ts-ignore
import {
  loginUserDetails,
  landingPageStats,
  getCreatorStats,
  getCreatorEarnings,
  RatesConversion,
  getCreatorJettons,
  getCreatorWalletActivity
  //@ts-ignore
} from "../api"; // Importing API function
import { Grid } from "antd";
// @ts-ignore
import Information from "../assets/svgs/Information";
import CardTooltip from "../components/CardTooltip";
import AboutAnalytics from "../components/AboutAnalytics";
import Banner from "../components/Banner";

const { useBreakpoint } = Grid;
const options = {
  credits: {
    enabled: false,
  },
  chart: {
    type: "pie",
    backgroundColor: "transparent",
    height: 210,
    spacing: [0, 0, 0, 0],
    margin: [0, 0, 0, 0],
  },
  title: {
    text: "",
  },
  plotOptions: {
    pie: {
      colors: ["#007BFE", "#08C1FD", "#ECECEF", "#8246F5"],
      dataLabels: {
        enabled: false,
      },
    },
  },
  series: [
    {
      data: [
        { name: "USDT", y: 7 },
        { name: "jUSDT", y: 4 },
        { name: "stTON", y: 2 },
      ],
    },
  ],
};

const tooltip3 =
  "The total number of outgoing transactions (sending activity) done by all wallets connected to Hubz over the last 24 hours, and the percentage split across 4 transaction types: Jetton, Swap, NFT, and TON.";
const walletHoldingTooltip =
  "The percentage of all wallets connected to Hubz that hold select tokens. Note: Not every token in a wallet’s portfolio is included; therefore, the total percentage may not add up to 100%.";
const walletActivityTooltip =
  "The total activity of all wallets connected to the Admin's groups over the last 24 hours, including the percentage split between sending and receiving transactions.";

function LandingPage() {
  const screens = useBreakpoint();
  const bot_name = import.meta.env.VITE_BOT_NAME;
  const auth_url = import.meta.env.VITE_AUTH_URL;

  const [loginStatus, setLoginStatus] = useState(false);
  const [groupDetails, setgroupDetails] = useState("");
  const [totalSubscribers, setTotalSubscribers] = useState(0);
  const [weeklyActiveSubscribers, setweeklyActiveSubscribers] = useState(0);
  const [totalHubzUsers, settotalHubzUsers] = useState("0");
  const [positiveBalanceUser, setpositiveBalanceUser] = useState(0);
  const [lastWeekTransaction, setlastWeekTransaction] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [meanBalance, setMeanBalance] = useState(0);
  const [tonEarnings, setTonEarnings] = useState(0);
  const [usdtEarnings, setUSDTEarnings] = useState(0);
  const [pieChartOptions, setPieChartOptions] = useState(options);
  const [jettonOptions, setJettonOptions] = useState("");
  const [tontoUSD, setTonToUSD] = useState("");
  const [usdttoUSD, setUSDTToUSD] = useState("");
  const [calculatedPercentage, setCalculatedPercentage] = useState<any>([]);

  const [sendTransaction, setSendTransaction] = useState<any>("");
  const [receiveTransaction, setReceiveTransaction] = useState<any>("");
  const [totalTransaction, setTotalTransaction] = useState("");
  // console.log(Number(calculatedPercentage));

  const bridged_jUSDT = Number(calculatedPercentage["Bridged jUSDT"]).toFixed(
    2
  );
  const TetherUSD = Number(calculatedPercentage["TetherUSD₮"]).toFixed(2);
  const STON = Number(calculatedPercentage["STON"]).toFixed(2);

  console.log(jettonOptions);

  // Calculate the total count of tokens

  const percentages = {};

  useEffect(() => {
    //@ts-ignore
    const totalCount = Object.values(jettonOptions).reduce(
      (acc, count) => acc + count,
      0
    );

    // Calculate the percentage for each token along with its name
    for (const [key, count] of Object.entries(jettonOptions)) {
      const [name] = key.split(":").slice(-1); // Extract the last part after the colon
      //@ts-ignore
      percentages[name] = (count / totalCount) * 100;
    }
    console.log(percentages);
    //@ts-ignore
    const tetherUSDValue = percentages["TetherUSD₮"] || 0;
    //@ts-ignore
    const bridgedJUSDTValue = percentages["Bridged jUSDT"] || 0;
    //@ts-ignore

    const stonValue = percentages["STON"] || 0;
    //@ts-ignore
    const sumOthers =
      //@ts-ignore
      Object.values(percentages).reduce((acc, value) => acc + value, 0) -
      tetherUSDValue -
      bridgedJUSDTValue -
      stonValue;

    const updatedPercentagesData = {
      "TetherUSD₮": tetherUSDValue,
      "Bridged jUSDT": bridgedJUSDTValue,
      STON: stonValue,
      Others: sumOthers,
    };
    console.log(updatedPercentagesData);
    setCalculatedPercentage(updatedPercentagesData);
  }, [jettonOptions]);

  console.log(calculatedPercentage);

  // setbridgeUSDT(percentages["Bridged jUSDT"])

  useEffect(() => {
    if (screens.xxl) {
      setPieChartOptions({
        ...pieChartOptions,
        chart: {
          ...pieChartOptions?.chart,
          height: 280,
        },
      });
    }
  }, [screens]);

  useEffect(() => {
    if (calculatedPercentage) {
      const keys = Object.keys(calculatedPercentage);
      console.log(keys);

      const newD = keys.map((key) => ({
        name: key,
        y: parseFloat(calculatedPercentage[key].toFixed(2)),
      }));

      setPieChartOptions({
        ...pieChartOptions,
        series: [
          {
            data: newD,
          },
        ],
      });
    }
  }, [calculatedPercentage]);

  const totalValue = (totalHubzUsers as any)?.data?.data;
  const percentage =
    (totalValue / (totalHubzUsers as any)?.data?.totalHubzUsers) * 100;

  const [at, setAt] = useState("");

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("loginStatus") === "true";
    setLoginStatus(storedLoginStatus);

    if (!storedLoginStatus) {
      const fetchData = async () => {
        try {
          const stats = await landingPageStats();
          settotalHubzUsers(stats);
        } catch (error) {
          console.error("Error fetching landing page statistics:", error);
        }
      };

      fetchData();
    }
  }, []);

  useEffect(() => {
    if (loginStatus) {
      const userDetails = localStorage.getItem("userDetails");

      if (userDetails) {
        const userDetailsJSON = JSON.parse(userDetails);

        // Call the API function from api.js
        loginUserDetails(userDetailsJSON)
          .then((response: any) => {
            // console.log("API response:", response.data.access.token);

            localStorage.setItem("accessToken", response.data.access.token);
            setAt(response.data.access.token);
            // Handle response data here
          })
          .catch((error: any) => {
            // explicitly typing error as 'Error'
            console.error("There was a problem with the Axios request:", error);
            // Handle error here
          });

        RatesConversion()
          .then((response: any) => {
            console.log(
              "API response from Rates Conversion:",
              response.data.rates
            );
            console.log(
              "API response from Rates Conversion:",
              response.data.rates["TON"].prices.USD
            );
            console.log(
              "API response from Rates Conversion:",
              response.data.rates["USDT"].prices.USD
            );
            setTonToUSD(response.data.rates["TON"].prices.USD);
            setUSDTToUSD(response.data.rates["USDT"].prices.USD);

            // Handle response data here
          })
          .catch((error: any) => {
            // explicitly typing error as 'Error'
            console.error("There was a problem with the Axios request:", error);
            // Handle error here
          });
      }

      // Call getTokens if user is logged in
    }
  }, [loginStatus]); // Dependency array includes loginStatus

  useEffect(() => {
    if (at) {
      getCreatorStats(at)
        .then((data: any) => {
          // console.log("data:", data);
          // console.log(data.data.groups.slice(-2));
          console.log(data.data);

          const groupData = data.data.creatorGroupStats[0].groups.slice(-2);
          const TotalSubscribers =
            data.data.creatorGroupStats[0].totalAllSubscribers;
          const weeklySubscribers =
            data.data.tonWalletData.weeklyActiveSubscribers;
          const positiveBalance = data.data.tonWalletData.positiveBalanceUser;
          const previousweekTransaction =
            data.data.tonWalletData.lastWeekTransaction;
          const totalMemberBalance = data.data.tonWalletData.totalBalance;
          const avgTONBalance = data.data.tonWalletData.meanBalance;
          setMeanBalance(avgTONBalance);
          setTotalBalance(totalMemberBalance);
          setlastWeekTransaction(previousweekTransaction);
          setpositiveBalanceUser(positiveBalance);
          setgroupDetails(groupData);
          setTotalSubscribers(TotalSubscribers);
          setweeklyActiveSubscribers(weeklySubscribers);

          // Handle tokens here
        })
        .catch((error: any) => {
          console.error("Error fetching tokens:", error);
          // Handle error here
        });
      getCreatorEarnings(at)
        .then((data: any) => {
          console.log("creatorEarnings", data.data);
          // Sort the array by _id property
          const sortedData = data.data.sort((a: any, b: any) => {
            if (a._id === "TON") return -1; // "TON" comes first
            if (b._id === "TON") return 1; // "TON" comes first
            return 0;
          });

          setTonEarnings(sortedData[0].totalAmount);
          setUSDTEarnings(sortedData[1].totalAmount);
          // Handle tokens here
        })
        .catch((error: any) => {
          console.error("Error fetching tokens:", error);
          // Handle error here
        });
      getCreatorJettons(at)
        .then((data: any) => {
          console.log("getCreatorJettons", typeof data.data.jettonHoldings);
          console.log("getCreatorJettons", data.data.jettonHoldings);
          setJettonOptions(data.data.jettonHoldings);
          // Sort the array by _id property
        })
        .catch((error: any) => {
          console.error("Error fetching tokens:", error);
          // Handle error here
        });

        getCreatorWalletActivity(at)
      .then((data: any) => {
       console.log(data);
       console.log(data.data.data);
       const send = data.data.data["send"]
       const receive = data.data.data["receive"]
       const Total_Transaction_Values = send + receive
       setTotalTransaction(Total_Transaction_Values)
       console.log(Total_Transaction_Values);
       const sendPercentage = Number(send/Total_Transaction_Values)*100
       const receivePercentage = Number(receive/Total_Transaction_Values)*100

       setSendTransaction(sendPercentage)
       setReceiveTransaction(receivePercentage)

       // Sort the array by _id property
      })
      .catch((error: any) => {
        console.error("Error fetching tokens:", error);
        // Handle error here
      });
    }
  }, [at]);

  const [userData, setUserData] = useState<any>();

  const handleUserData = (data: any) => {
    setUserData(data)
  }

  return (
    <>
      <HeroSection at = {at} userData={userData}/>
      {loginStatus && (
        <Flex
          vertical
          justify="center"
          gap={"large"}
          style={{ marginTop: "60px" }}
        >
          <Flex
            justify="center"
            gap={"large"}
            vertical={!screens?.md}
            align="center"
          >
            <Cards
              text="Number of Users Holding TON"
              svg={<User />}
              value={positiveBalanceUser}
              tooltipTitle="Calculated as the total number of unique wallets with a balance greater than 0 TON connected to the Admin's groups."
            />

            <Cards
              text="Total TON balance held by all users"
              svg={<Diamond />}
              value={totalBalance}
              tooltipTitle="Represents the total TON balance across all unique wallets connected to the Admin's groups."
            />
          </Flex>
          <Flex
            justify="center"
            gap={"middle"}
            vertical={!screens?.md}
            align="center"
          >
            <Cards
              text="Weekly Average TON Balance"
              svg={<Box />}
              value={meanBalance}
              tooltipTitle="Calculated as the average total TON balance held in all unique wallets connected to the Admin's groups over the past 7 days."
            />

            <Cards
              text="Percentage of Transactions in the past 7 days"
              svg={<Compass />}
              value={Number(lastWeekTransaction) + "%"}
              tooltipTitle="Calculated as the percentage of total transactions (either receiving or sending) conducted in the last 24 hours by all unique wallets connected to the Admin's groups, compared to all transactions made by the same wallets in the last 7 days."
            />
          </Flex>
        </Flex>
      )}
      {!loginStatus && (
        <>
          <Flex
            justify="center"
            gap={"large"}
            style={{ marginTop: "60px" }}
            align="center"
            vertical={!screens?.md}
          >
            <Cards
              text="Total number of Hubz users"
              svg={<User />}
              value={
                (totalHubzUsers as any)?.data?.totalHubzUsers !== undefined
                  ? (totalHubzUsers as any).data.totalHubzUsers
                  : "0"
              }
              tooltipTitle="Calculated as the total number of unique wallets connected to Hubz, including all Hubz chats, both paid and free."
            />

            <Cards
              text="Percentage of weekly active TON wallet users"
              svg={<Diamond />}
              value={(isNaN(percentage) ? "0" : percentage.toFixed(2)) + "%"}
              tooltipTitle="Calculated as the percentage of unique Hubz wallets that have conducted more than one transaction (either sending or receiving) in the last 7 days, out of the total number of unique wallets connected to Hubz."
            />
          </Flex>
        </>
      )}
      {!loginStatus && <Banner />}
      {!loginStatus ? (
        <Row
          justify="center"
          style={{ marginTop: "40px", marginBottom: "40px" }}
        >
          <Col>
            <TelegramLogin botUsername={bot_name} authUrl={auth_url} handleUserData={handleUserData} />
          </Col>
        </Row>
      ) : (
        ""
      )}
      {loginStatus && (
        <Row
          gutter={20}
          style={{
            marginTop: "60px",
            marginLeft: "70px",
            marginRight: "70px",
            marginBottom: "80px",
          }}
        >
          <Col xs={24}>
            <UserDetails
              groupDetails={groupDetails}
              totalSubscribers={totalSubscribers}
              weeklyActiveSubscribers={weeklyActiveSubscribers}
              tonEarnings={tonEarnings}
              usdtEarnings={usdtEarnings}
              tontoUSD={tontoUSD}
              usdttoUSD={usdttoUSD}
            />
          </Col>
        </Row>
      )}
      {loginStatus && (
        <>
          <Row
            gutter={[20, 60]}
            style={{
              marginLeft: "70px",
              marginRight: "70px",
              marginBottom: "60px",
            }}
          >
            <Col xs={24} lg={12}>
              <Card
                bordered={false}
                style={{ height: "100%" }}
                bodyStyle={{ height: "100%" }}
              >
                <Flex justify="space-between" style={{ height: "100%" }}>
                  <div
                    style={{
                      width: "50%",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={pieChartOptions}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <Typography.Title
                      level={5}
                      style={{
                        margin: 0,
                        color: "#2B3674",
                        fontFamily: "Scandia-Medium",
                        fontSize: "22px",
                      }}
                    >
                      Total Chat Group Wallet Holdings{" "}
                      <CardTooltip text={walletHoldingTooltip} />
                    </Typography.Title>
                    <Card
                      style={{ marginTop: "10px", padding: 0, width: "100%" }}
                      bordered={false}
                      bodyStyle={{ padding: 0 }}
                    >
                      <Flex
                        justify="space-evenly"
                        style={{
                          padding: "6px",
                          width: "100%",
                          justifyContent: "flex-start",
                        }}
                      >
                        <div>
                          <Flex vertical>
                            <Flex>
                              <span
                                style={{
                                  margin: "4px",
                                  height: "6px",
                                  width: "6px",
                                  borderColor: "#bbb",
                                  borderRadius: "50%",
                                  display: "inline-block",
                                  background: "#007BFE",
                                }}
                              ></span>
                              <p
                                style={{
                                  margin: 0,
                                  color: "#A3AED0",
                                  fontSize: "16px",
                                  fontWeight: "600",
                                  fontFamily: "Scandia-Regular",
                                }}
                              >
                                USDT
                              </p>
                            </Flex>
                            <p
                              style={{
                                margin: 0,
                                color: "#2B3674",
                                textAlign: "center",
                                fontWeight: 600,
                                fontFamily: "Scandia-Medium",
                              }}
                            >
                              {TetherUSD}
                            </p>
                          </Flex>
                        </div>
                        <Divider type="vertical" />
                        <div>
                          <Flex vertical>
                            <Flex>
                              <span
                                style={{
                                  margin: "4px",
                                  height: "6px",
                                  width: "6px",
                                  borderColor: "#bbb",
                                  borderRadius: "50%",
                                  display: "inline-block",
                                  background: "#08C1FD",
                                }}
                              ></span>
                              <p
                                style={{
                                  margin: 0,
                                  color: "#A3AED0",
                                  fontSize: "16px",
                                  fontWeight: "600",
                                  fontFamily: "Scandia-Regular",
                                }}
                              >
                                jUSDT
                              </p>
                            </Flex>
                            <p
                              style={{
                                margin: 0,
                                color: "#2B3674",
                                textAlign: "center",
                                fontWeight: 600,
                                fontFamily: "Scandia-Medium",
                              }}
                            >
                              {bridged_jUSDT}
                            </p>
                          </Flex>
                        </div>
                        <Divider type="vertical" />
                        <div>
                          <Flex vertical>
                            <Flex>
                              <span
                                style={{
                                  margin: "4px",
                                  height: "6px",
                                  width: "6px",
                                  borderColor: "#bbb",
                                  borderRadius: "50%",
                                  display: "inline-block",
                                  background: "#ECECEF",
                                }}
                              ></span>
                              <p
                                style={{
                                  margin: 0,
                                  color: "#A3AED0",
                                  fontSize: "16px",
                                  fontWeight: "600",
                                  fontFamily: "Scandia-Regular",
                                }}
                              >
                                STON
                              </p>
                            </Flex>
                            <p
                              style={{
                                margin: 0,
                                color: "#2B3674",
                                textAlign: "center",
                                fontWeight: 600,
                                fontFamily: "Scandia-Medium",
                              }}
                            >
                              {STON}
                            </p>
                          </Flex>
                        </div>
                      </Flex>
                    </Card>
                  </div>
                </Flex>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card bordered={false} style={{ height: "100%" }}>
                <Flex>
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      flexDirection: "column",
                      // alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography.Title
                      level={5}
                      style={{
                        margin: 0,
                        color: "#2B3674",
                        fontFamily: "Scandia-Medium",
                        fontSize: "22px",
                      }}
                    >
                      Wallet Activity{" "}
                      <CardTooltip text={walletActivityTooltip} />
                    </Typography.Title>
                    <Typography.Title
                      level={5}
                      style={{
                        color: "#007AFF",
                        fontWeight: 400,
                        fontSize: "28px",
                        fontFamily: "Scandia-Medium",
                      }}
                    >
                      Total: {Number(totalTransaction)}
                    </Typography.Title>
                    <Card
                      style={{ marginTop: "10px", padding: 0 }}
                      bordered={false}
                      bodyStyle={{ padding: 0 }}
                    >
                      <Flex
                        justify="space-evenly"
                        align={"center"}
                        style={{ padding: "6px" }}
                      >
                        <div>
                          <Flex vertical>
                            <Flex>
                              <p
                                style={{
                                  margin: 0,
                                  color: "#A3AED0",
                                  fontSize: "20px",
                                  fontWeight: "600",
                                  fontFamily: "Scandia-Regular",
                                }}
                              >
                                Sent
                              </p>
                            </Flex>
                            <p
                              style={{
                                margin: 0,
                                color: "#2B3674",
                                textAlign: "center",
                                fontWeight: 600,
                                fontFamily: "Scandia-Medium",
                                fontSize: "20px",
                              }}
                            >
                            {Number(sendTransaction).toFixed(2)} %
                            </p>
                          </Flex>
                        </div>
                        <Divider type="vertical" />
                        <div>
                          <Flex vertical>
                            <Flex>
                              <p
                                style={{
                                  margin: 0,
                                  color: "#A3AED0",
                                  fontSize: "20px",
                                  fontWeight: "600",
                                  fontFamily: "Scandia-Regular",
                                }}
                              >
                                Receive
                              </p>
                            </Flex>
                            <p
                              style={{
                                margin: 0,
                                color: "#2B3674",
                                textAlign: "center",
                                fontWeight: 600,
                                fontSize: "20px",
                                fontFamily: "Scandia-Medium",
                              }}
                            >
                              {Number(receiveTransaction).toFixed(2)} %
                            </p>
                          </Flex>
                        </div>
                      </Flex>
                    </Card>
                  </div>
                  <div style={{ width: "50%" }}>
                    <img
                      width="100%"
                      src="https://s3-hubz-dashboard-images.s3.ap-southeast-1.amazonaws.com/wallet.png"
                      alt="Placeholder"
                      style={{ display: "block", bottom: 0 }}
                    />
                  </div>
                </Flex>
              </Card>
            </Col>
          </Row>
          <Row
            gutter={20}
            style={{
              marginLeft: "70px",
              marginRight: "70px",
              marginBottom: "60px",
            }}
          >
            <Col span={24}>
              <Card bordered={false}>
                <Flex justify="center">
                  <svg
                    width="359"
                    height="359"
                    viewBox="0 0 359 359"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M128.607 154.795L124.163 166.246H128.734V162.209H131.857V166.246H134.218V168.976H131.857V173H128.734V168.976H119.847V168.811L125.458 154.795H128.607ZM154.874 157.74H149.39V173H146.013V157.74H140.516V154.795H154.874V157.74ZM164.016 160.025H167.431L162.149 172.873L159.991 178.434H156.589L158.95 172.505L153.821 160.025H157.211L160.639 169.28L164.016 160.025ZM172.23 178.434H168.955V160.025H172.103V162.26C172.526 161.532 173.152 160.927 173.982 160.444C174.811 159.953 175.763 159.708 176.838 159.708C178.091 159.708 179.221 160.017 180.228 160.635C181.235 161.244 182.014 162.069 182.564 163.11C183.114 164.143 183.389 165.281 183.389 166.525C183.389 167.77 183.114 168.908 182.564 169.94C182.014 170.973 181.235 171.794 180.228 172.403C179.221 173.013 178.091 173.317 176.838 173.317C175.738 173.317 174.777 173.08 173.957 172.606C173.144 172.124 172.568 171.51 172.23 170.766V178.434ZM179.009 169.433C179.746 168.646 180.114 167.676 180.114 166.525C180.114 165.374 179.746 164.401 179.009 163.605C178.281 162.81 177.342 162.412 176.191 162.412C175.082 162.412 174.143 162.793 173.373 163.555C172.611 164.316 172.23 165.307 172.23 166.525C172.23 167.744 172.611 168.73 173.373 169.483C174.143 170.237 175.082 170.613 176.191 170.613C177.342 170.613 178.281 170.22 179.009 169.433ZM188.074 167.617C188.176 168.633 188.548 169.433 189.191 170.017C189.835 170.601 190.719 170.893 191.845 170.893C192.623 170.893 193.309 170.744 193.901 170.448C194.494 170.144 194.951 169.729 195.272 169.204H198.319C197.845 170.397 197.024 171.383 195.856 172.162C194.697 172.932 193.36 173.317 191.845 173.317C189.678 173.317 187.968 172.678 186.716 171.4C185.472 170.122 184.85 168.489 184.85 166.5C184.85 164.536 185.489 162.916 186.767 161.638C188.045 160.351 189.682 159.708 191.68 159.708C193.694 159.708 195.332 160.347 196.593 161.625C197.862 162.903 198.497 164.545 198.497 166.551V167.617H188.074ZM191.743 162.057C190.719 162.057 189.881 162.361 189.229 162.971C188.586 163.572 188.193 164.401 188.049 165.459H195.374C195.272 164.435 194.9 163.614 194.257 162.996C193.614 162.37 192.776 162.057 191.743 162.057ZM202.649 169.128C202.835 170.389 203.631 171.02 205.036 171.02C205.67 171.02 206.182 170.871 206.572 170.575C206.97 170.279 207.168 169.873 207.168 169.356C207.168 168.95 207.058 168.633 206.838 168.404C206.618 168.167 206.263 167.973 205.772 167.82L203.842 167.3C202.674 166.987 201.803 166.538 201.227 165.954C200.652 165.37 200.364 164.575 200.364 163.567C200.364 162.408 200.795 161.477 201.659 160.774C202.53 160.063 203.631 159.708 204.959 159.708C206.314 159.708 207.38 160.059 208.159 160.762C208.946 161.464 209.416 162.408 209.568 163.593H206.775C206.733 163.144 206.563 162.768 206.267 162.463C205.979 162.158 205.569 162.006 205.036 162.006C204.528 162.006 204.117 162.133 203.804 162.387C203.5 162.632 203.347 162.971 203.347 163.402C203.347 163.783 203.453 164.071 203.665 164.266C203.885 164.452 204.249 164.625 204.756 164.786L207.067 165.434C209.132 166.009 210.165 167.224 210.165 169.077C210.165 169.907 209.919 170.651 209.428 171.312C208.946 171.963 208.315 172.463 207.537 172.81C206.766 173.148 205.941 173.317 205.061 173.317C203.631 173.317 202.446 172.97 201.506 172.276C200.575 171.574 200.029 170.524 199.869 169.128H202.649ZM228.117 172.34C227.016 172.992 225.747 173.317 224.308 173.317C222.869 173.317 221.6 172.992 220.5 172.34C219.399 171.688 218.57 170.854 218.011 169.839C217.461 168.815 217.186 167.71 217.186 166.525C217.186 165.637 217.351 164.786 217.681 163.974C218.011 163.153 218.473 162.425 219.065 161.79C219.657 161.155 220.406 160.652 221.312 160.279C222.226 159.898 223.225 159.708 224.308 159.708C225.391 159.708 226.386 159.898 227.292 160.279C228.206 160.652 228.959 161.155 229.551 161.79C230.144 162.425 230.605 163.153 230.935 163.974C231.265 164.786 231.43 165.637 231.43 166.525C231.43 167.71 231.151 168.815 230.592 169.839C230.042 170.854 229.217 171.688 228.117 172.34ZM226.428 163.034C225.827 162.645 225.121 162.45 224.308 162.45C223.496 162.45 222.785 162.645 222.175 163.034C221.574 163.424 221.126 163.923 220.83 164.532C220.533 165.142 220.385 165.806 220.385 166.525C220.385 167.643 220.737 168.599 221.439 169.395C222.141 170.19 223.098 170.588 224.308 170.588C225.518 170.588 226.475 170.19 227.177 169.395C227.88 168.599 228.231 167.643 228.231 166.525C228.231 165.806 228.083 165.142 227.787 164.532C227.49 163.923 227.038 163.424 226.428 163.034ZM234.401 162.679H232.243V160.025H234.401V158.616C234.401 156.966 234.795 155.734 235.582 154.922C236.369 154.109 237.605 153.703 239.289 153.703C240 153.703 240.605 153.784 241.105 153.944V156.648C240.741 156.521 240.309 156.458 239.81 156.458C239.023 156.458 238.468 156.632 238.147 156.979C237.833 157.326 237.677 157.901 237.677 158.705V160.025H240.952V162.679H237.677V173H234.401V162.679ZM116.387 191.74H110.903V207H107.526V191.74H102.029V188.795H116.387V191.74ZM124.449 197.072H123.738C122.444 197.072 121.479 197.424 120.844 198.126C120.209 198.828 119.892 199.844 119.892 201.173V207H116.616V194.025H119.79V196.78C120.027 195.79 120.569 195.049 121.415 194.559C122.262 194.068 123.273 193.822 124.449 193.822V197.072ZM139.545 194.025V207H136.409V204.766C135.994 205.493 135.368 206.103 134.53 206.594C133.692 207.076 132.74 207.317 131.674 207.317C130.421 207.317 129.291 207.013 128.284 206.403C127.277 205.794 126.498 204.973 125.948 203.94C125.398 202.908 125.123 201.77 125.123 200.525C125.123 199.281 125.398 198.143 125.948 197.11C126.498 196.069 127.277 195.244 128.284 194.635C129.291 194.017 130.421 193.708 131.674 193.708C132.774 193.708 133.743 193.953 134.581 194.444C135.427 194.927 136.02 195.532 136.358 196.26V194.025H139.545ZM129.49 197.605C128.762 198.401 128.398 199.374 128.398 200.525C128.398 201.676 128.758 202.646 129.477 203.433C130.205 204.22 131.145 204.613 132.296 204.613C133.421 204.613 134.365 204.237 135.127 203.483C135.888 202.73 136.269 201.744 136.269 200.525C136.269 199.307 135.884 198.316 135.114 197.555C134.352 196.793 133.413 196.412 132.296 196.412C131.153 196.412 130.218 196.81 129.49 197.605ZM145.893 207H142.617V194.025H145.791V196.234C146.087 195.464 146.625 194.851 147.404 194.394C148.182 193.937 149.084 193.708 150.108 193.708C151.64 193.708 152.833 194.216 153.688 195.231C154.543 196.247 154.97 197.58 154.97 199.23V207H151.695V199.776C151.695 198.803 151.466 198.029 151.009 197.453C150.552 196.869 149.854 196.577 148.914 196.577C148.017 196.577 147.289 196.873 146.731 197.466C146.172 198.058 145.893 198.82 145.893 199.751V207ZM159.795 203.128C159.981 204.389 160.776 205.02 162.181 205.02C162.816 205.02 163.328 204.871 163.717 204.575C164.115 204.279 164.314 203.873 164.314 203.356C164.314 202.95 164.204 202.633 163.984 202.404C163.764 202.167 163.409 201.973 162.918 201.82L160.988 201.3C159.82 200.987 158.948 200.538 158.373 199.954C157.797 199.37 157.509 198.575 157.509 197.567C157.509 196.408 157.941 195.477 158.804 194.774C159.676 194.063 160.776 193.708 162.105 193.708C163.459 193.708 164.526 194.059 165.304 194.762C166.092 195.464 166.561 196.408 166.714 197.593H163.921C163.878 197.144 163.709 196.768 163.413 196.463C163.125 196.158 162.715 196.006 162.181 196.006C161.674 196.006 161.263 196.133 160.95 196.387C160.645 196.632 160.493 196.971 160.493 197.402C160.493 197.783 160.599 198.071 160.81 198.266C161.03 198.452 161.394 198.625 161.902 198.786L164.213 199.434C166.278 200.009 167.31 201.224 167.31 203.077C167.31 203.907 167.065 204.651 166.574 205.312C166.092 205.963 165.461 206.463 164.682 206.81C163.912 207.148 163.087 207.317 162.207 207.317C160.776 207.317 159.592 206.97 158.652 206.276C157.721 205.574 157.175 204.524 157.014 203.128H159.795ZM183.028 194.025V207H179.892V204.766C179.477 205.493 178.851 206.103 178.013 206.594C177.175 207.076 176.223 207.317 175.156 207.317C173.904 207.317 172.774 207.013 171.767 206.403C170.76 205.794 169.981 204.973 169.431 203.94C168.881 202.908 168.606 201.77 168.606 200.525C168.606 199.281 168.881 198.143 169.431 197.11C169.981 196.069 170.76 195.244 171.767 194.635C172.774 194.017 173.904 193.708 175.156 193.708C176.257 193.708 177.226 193.953 178.064 194.444C178.91 194.927 179.503 195.532 179.841 196.26V194.025H183.028ZM172.973 197.605C172.245 198.401 171.881 199.374 171.881 200.525C171.881 201.676 172.241 202.646 172.96 203.433C173.688 204.22 174.628 204.613 175.779 204.613C176.904 204.613 177.848 204.237 178.61 203.483C179.371 202.73 179.752 201.744 179.752 200.525C179.752 199.307 179.367 198.316 178.597 197.555C177.835 196.793 176.896 196.412 175.779 196.412C174.636 196.412 173.701 196.81 172.973 197.605ZM192.423 193.708C194.132 193.708 195.588 194.182 196.79 195.13C198 196.069 198.787 197.246 199.151 198.659H195.99C195.33 197.187 194.132 196.45 192.397 196.45C191.204 196.45 190.264 196.844 189.579 197.631C188.893 198.418 188.551 199.383 188.551 200.525C188.551 201.668 188.893 202.633 189.579 203.42C190.264 204.199 191.204 204.588 192.397 204.588C194.141 204.588 195.338 203.847 195.99 202.366H199.151C198.787 203.78 198 204.96 196.79 205.908C195.588 206.848 194.132 207.317 192.423 207.317C191.026 207.317 189.782 207.017 188.69 206.416C187.598 205.815 186.761 205.003 186.177 203.979C185.593 202.946 185.301 201.795 185.301 200.525C185.301 198.579 185.961 196.958 187.281 195.663C188.601 194.36 190.315 193.708 192.423 193.708ZM202.338 190.153H205.614V194.025H208.965V196.729H205.614V202.633C205.614 203.31 205.753 203.805 206.033 204.118C206.32 204.431 206.777 204.588 207.404 204.588C207.793 204.588 208.271 204.507 208.838 204.347V206.975C208.627 207.068 208.296 207.148 207.848 207.216C207.399 207.284 206.968 207.317 206.553 207.317C205.072 207.317 203.997 206.903 203.328 206.073C202.668 205.244 202.338 204.046 202.338 202.48V196.729H199.926V194.025H202.338V190.153ZM211.073 207V194.025H214.348V207H211.073ZM210.756 189.912C210.756 189.379 210.942 188.926 211.314 188.554C211.687 188.181 212.152 187.995 212.711 187.995C213.261 187.995 213.722 188.181 214.095 188.554C214.467 188.918 214.653 189.37 214.653 189.912C214.653 190.471 214.467 190.932 214.095 191.296C213.731 191.66 213.269 191.842 212.711 191.842C212.152 191.842 211.687 191.66 211.314 191.296C210.942 190.932 210.756 190.471 210.756 189.912ZM227.654 206.34C226.553 206.992 225.284 207.317 223.845 207.317C222.406 207.317 221.137 206.992 220.036 206.34C218.936 205.688 218.107 204.854 217.548 203.839C216.998 202.815 216.723 201.71 216.723 200.525C216.723 199.637 216.888 198.786 217.218 197.974C217.548 197.153 218.009 196.425 218.602 195.79C219.194 195.155 219.943 194.652 220.849 194.279C221.763 193.898 222.762 193.708 223.845 193.708C224.928 193.708 225.923 193.898 226.828 194.279C227.743 194.652 228.496 195.155 229.088 195.79C229.681 196.425 230.142 197.153 230.472 197.974C230.802 198.786 230.967 199.637 230.967 200.525C230.967 201.71 230.688 202.815 230.129 203.839C229.579 204.854 228.754 205.688 227.654 206.34ZM225.965 197.034C225.364 196.645 224.658 196.45 223.845 196.45C223.033 196.45 222.322 196.645 221.712 197.034C221.111 197.424 220.663 197.923 220.367 198.532C220.07 199.142 219.922 199.806 219.922 200.525C219.922 201.643 220.273 202.599 220.976 203.395C221.678 204.19 222.635 204.588 223.845 204.588C225.055 204.588 226.012 204.19 226.714 203.395C227.417 202.599 227.768 201.643 227.768 200.525C227.768 199.806 227.62 199.142 227.324 198.532C227.027 197.923 226.575 197.424 225.965 197.034ZM236.503 207H233.227V194.025H236.401V196.234C236.697 195.464 237.235 194.851 238.014 194.394C238.792 193.937 239.694 193.708 240.718 193.708C242.25 193.708 243.443 194.216 244.298 195.231C245.153 196.247 245.58 197.58 245.58 199.23V207H242.305V199.776C242.305 198.803 242.076 198.029 241.619 197.453C241.162 196.869 240.464 196.577 239.524 196.577C238.627 196.577 237.899 196.873 237.341 197.466C236.782 198.058 236.503 198.82 236.503 199.751V207ZM250.405 203.128C250.591 204.389 251.386 205.02 252.791 205.02C253.426 205.02 253.938 204.871 254.327 204.575C254.725 204.279 254.924 203.873 254.924 203.356C254.924 202.95 254.814 202.633 254.594 202.404C254.374 202.167 254.019 201.973 253.528 201.82L251.598 201.3C250.43 200.987 249.558 200.538 248.983 199.954C248.407 199.37 248.119 198.575 248.119 197.567C248.119 196.408 248.551 195.477 249.414 194.774C250.286 194.063 251.386 193.708 252.715 193.708C254.069 193.708 255.136 194.059 255.914 194.762C256.702 195.464 257.171 196.408 257.324 197.593H254.531C254.488 197.144 254.319 196.768 254.023 196.463C253.735 196.158 253.325 196.006 252.791 196.006C252.284 196.006 251.873 196.133 251.56 196.387C251.255 196.632 251.103 196.971 251.103 197.402C251.103 197.783 251.209 198.071 251.42 198.266C251.64 198.452 252.004 198.625 252.512 198.786L254.823 199.434C256.888 200.009 257.92 201.224 257.92 203.077C257.92 203.907 257.675 204.651 257.184 205.312C256.702 205.963 256.071 206.463 255.292 206.81C254.522 207.148 253.697 207.317 252.817 207.317C251.386 207.317 250.202 206.97 249.262 206.276C248.331 205.574 247.785 204.524 247.624 203.128H250.405Z"
                      fill="#2B3674"
                    />
                    <mask id="path-2-inside-1_5395_1295" fill="white">
                      <path d="M337.158 93.6856C316.423 55.5899 282.594 26.2908 241.929 11.2059C201.263 -3.87904 156.511 -3.72934 115.947 11.6273C75.383 26.9839 41.7515 56.5087 21.2711 94.7422C0.790751 132.976 -5.15318 177.332 4.53843 219.609L87.2513 200.647C82.1414 178.357 85.2753 154.97 96.0736 134.811C106.872 114.653 124.604 99.0857 145.992 90.9889C167.379 82.8921 190.975 82.8132 212.416 90.7667C233.857 98.7202 251.693 114.168 262.626 134.254L337.158 93.6856Z" />
                    </mask>
                    <path
                      d="M337.158 93.6856C316.423 55.5899 282.594 26.2908 241.929 11.2059C201.263 -3.87904 156.511 -3.72934 115.947 11.6273C75.383 26.9839 41.7515 56.5087 21.2711 94.7422C0.790751 132.976 -5.15318 177.332 4.53843 219.609L87.2513 200.647C82.1414 178.357 85.2753 154.97 96.0736 134.811C106.872 114.653 124.604 99.0857 145.992 90.9889C167.379 82.8921 190.975 82.8132 212.416 90.7667C233.857 98.7202 251.693 114.168 262.626 134.254L337.158 93.6856Z"
                      stroke="#8246F5"
                      stroke-width="88"
                      mask="url(#path-2-inside-1_5395_1295)"
                    />
                    <mask id="path-3-inside-2_5395_1295" fill="white">
                      <path d="M52.5743 306.426C85.1341 338.985 128.961 357.787 174.993 358.943C221.025 360.1 265.741 343.521 299.894 312.637L242.978 249.697C224.971 265.981 201.394 274.721 177.124 274.112C152.853 273.502 129.745 263.589 112.578 246.422L52.5743 306.426Z" />
                    </mask>
                    <path
                      d="M52.5743 306.426C85.1341 338.985 128.961 357.787 174.993 358.943C221.025 360.1 265.741 343.521 299.894 312.637L242.978 249.697C224.971 265.981 201.394 274.721 177.124 274.112C152.853 273.502 129.745 263.589 112.578 246.422L52.5743 306.426Z"
                      stroke="#27B5FE"
                      stroke-width="88"
                      mask="url(#path-3-inside-2_5395_1295)"
                    />
                    <mask id="path-4-inside-3_5395_1295" fill="white">
                      <path d="M4.48978 219.396C11.9948 252.318 28.6337 282.455 52.4954 306.347L112.537 246.38C99.9555 233.783 91.1826 217.893 87.2256 200.535L4.48978 219.396Z" />
                    </mask>
                    <path
                      d="M4.48978 219.396C11.9948 252.318 28.6337 282.455 52.4954 306.347L112.537 246.38C99.9555 233.783 91.1826 217.893 87.2256 200.535L4.48978 219.396Z"
                      stroke="#54CB68"
                      stroke-width="88"
                      mask="url(#path-4-inside-3_5395_1295)"
                    />
                    <mask id="path-5-inside-4_5395_1295" fill="white">
                      <path d="M299.33 313.146C329.305 286.269 349.375 250.095 356.314 210.437C363.253 170.779 356.658 129.94 337.589 94.4817L262.853 134.674C272.907 153.369 276.384 174.902 272.725 195.812C269.067 216.721 258.485 235.794 242.68 249.965L299.33 313.146Z" />
                    </mask>
                    <path
                      d="M299.33 313.146C329.305 286.269 349.375 250.095 356.314 210.437C363.253 170.779 356.658 129.94 337.589 94.4817L262.853 134.674C272.907 153.369 276.384 174.902 272.725 195.812C269.067 216.721 258.485 235.794 242.68 249.965L299.33 313.146Z"
                      stroke="#3B63F6"
                      stroke-width="88"
                      mask="url(#path-5-inside-4_5395_1295)"
                    />
                    <path
                      d="M95.5609 80.0142C96.1342 80.9241 96.8783 81.4895 97.7931 81.7102C98.703 81.9233 99.613 81.7432 100.523 81.1698C101.464 80.577 102.035 79.8077 102.236 78.8621C102.445 77.9116 102.27 76.993 101.711 76.1062C101.172 75.2502 100.448 74.6993 99.5388 74.4533C98.6249 74.1997 97.7014 74.3669 96.7683 74.9548C95.8352 75.5428 95.2627 76.3183 95.0508 77.2813C94.8466 78.2395 95.0166 79.1505 95.5609 80.0142ZM90.4927 67.355L93.6505 65.3652L94.1062 74.1922C94.1792 73.8122 94.3878 73.4168 94.7322 73.0058C95.0794 72.5824 95.496 72.2176 95.9818 71.9114C97.4624 70.9785 99.0154 70.7163 100.641 71.1248C102.269 71.5207 103.594 72.5284 104.614 74.1477C105.105 74.9266 105.419 75.7578 105.555 76.6413C105.7 77.52 105.672 78.3828 105.474 79.2299C105.278 80.0644 104.893 80.8726 104.319 81.6544C103.745 82.4362 103.014 83.1064 102.128 83.6652C100.323 84.8023 98.5295 85.1784 96.7465 84.7937C94.9635 84.409 93.5521 83.3915 92.5122 81.7412C91.7494 80.5306 91.3268 79.2616 91.2447 77.9344L90.4927 67.355ZM102.233 67.213C101.16 65.3899 100.808 63.7043 101.18 62.1561C101.553 60.5954 102.6 59.2732 104.32 58.1897C105.916 57.1838 107.514 56.8393 109.114 57.1561C110.71 57.4652 111.962 58.3408 112.87 59.7828C113.41 60.6387 113.719 61.5052 113.797 62.3822C113.871 63.2515 113.827 64.2593 113.666 65.4058L112.665 72.9208L118.761 69.0797L120.401 71.6822L108.857 78.9563L108.77 78.8175L110.292 65.2051C110.355 64.6049 110.392 64.1507 110.403 63.8425C110.421 63.5294 110.392 63.1758 110.316 62.7819C110.243 62.3755 110.105 62.0103 109.901 61.6864C109.454 60.977 108.869 60.5371 108.148 60.3668C107.422 60.1888 106.692 60.3306 105.96 60.7922C105.088 61.3413 104.6 62.0102 104.493 62.799C104.387 63.5878 104.601 64.4493 105.136 65.3835L102.233 67.213ZM126.27 44.8106L128.873 43.1706L128.972 66.281L126.37 67.921L126.27 44.8106ZM123.69 52.2053C124.176 52.9764 124.441 53.8063 124.484 54.695C124.534 55.5789 124.334 56.4487 123.882 57.3044C123.425 58.1524 122.738 58.8656 121.82 59.4438C120.455 60.3039 119.085 60.5746 117.71 60.256C116.335 59.9374 115.271 59.1805 114.518 57.9852C113.755 56.7745 113.527 55.4802 113.833 54.1023C114.139 52.7245 114.974 51.6055 116.339 50.7454C117.257 50.1672 118.199 49.8589 119.166 49.8206C120.128 49.7745 120.999 49.9689 121.78 50.4037C122.563 50.8259 123.2 51.4264 123.69 52.2053ZM121.96 55.7681C122.113 55.0361 121.961 54.3077 121.504 53.5828C121.048 52.858 120.456 52.4066 119.73 52.2286C118.999 52.0428 118.267 52.1808 117.534 52.6424C116.802 53.104 116.365 53.7022 116.225 54.437C116.08 55.1641 116.236 55.8901 116.692 56.6149C117.149 57.3398 117.737 57.7937 118.455 57.9765C119.169 58.1517 119.892 58.0084 120.625 57.5468C121.357 57.0852 121.802 56.4923 121.96 55.7681ZM140.767 53.0961C141.525 54.2991 141.747 55.5919 141.433 56.9747C141.127 58.3526 140.284 59.4764 138.904 60.3462C137.539 61.2062 136.169 61.477 134.794 61.1584C133.419 60.8398 132.352 60.079 131.594 58.876C130.841 57.6807 130.618 56.3942 130.924 55.0163C131.23 53.6384 132.065 52.5194 133.43 51.6593C134.348 51.0811 135.29 50.7728 136.257 50.7345C137.219 50.6884 138.088 50.879 138.863 51.306C139.647 51.7283 140.281 52.325 140.767 53.0961ZM138.581 54.4736C138.134 53.7642 137.547 53.3205 136.821 53.1425C136.09 52.9568 135.358 53.0947 134.625 53.5563C133.893 54.018 133.454 54.6123 133.309 55.3394C133.164 56.0665 133.317 56.7886 133.769 57.5057C134.226 58.2306 134.816 58.6883 135.539 58.8789C136.258 59.0617 136.983 58.9224 137.716 58.4607C138.448 57.9991 138.891 57.4024 139.044 56.6704C139.192 55.9308 139.038 55.1985 138.581 54.4736Z"
                      fill="white"
                    />
                    <path
                      d="M51.6647 259.6C51.2609 261.438 50.1143 262.952 48.225 264.143C46.3358 265.333 44.4749 265.714 42.6425 265.285C40.8129 264.843 39.3004 263.674 38.1051 261.777L35.1167 257.035C33.9214 255.138 33.5218 253.273 33.9179 251.439C34.3218 249.601 35.4684 248.087 37.3576 246.896C39.2469 245.706 41.1102 245.329 42.9475 245.766C44.7799 246.195 46.2914 247.354 47.4819 249.243L50.4702 253.986C51.6656 255.883 52.0637 257.754 51.6647 259.6ZM41.2523 260.053C41.884 261.055 42.6801 261.711 43.6406 262.022C44.5963 262.325 45.5753 262.16 46.5778 261.529C47.5803 260.897 48.1512 260.085 48.2905 259.092C48.4327 258.087 48.188 257.083 47.5563 256.08L44.3347 250.968C43.703 249.965 42.9055 249.315 41.9421 249.017C40.9816 248.707 40.0001 248.867 38.9976 249.499C37.9951 250.131 37.4266 250.947 37.2922 251.947C37.1528 252.94 37.399 253.937 38.0307 254.94L41.2523 260.053ZM55.701 251.643C56.2744 252.553 57.0185 253.118 57.9333 253.339C58.8432 253.552 59.7531 253.372 60.6631 252.799C61.6039 252.206 62.1749 251.436 62.3763 250.491C62.5853 249.54 62.4105 248.622 61.8517 247.735C61.3123 246.879 60.5881 246.328 59.679 246.082C58.765 245.828 57.8415 245.996 56.9085 246.584C55.9754 247.172 55.4029 247.947 55.191 248.91C54.9868 249.868 55.1568 250.779 55.701 251.643ZM50.6329 238.984L53.7907 236.994L54.2463 245.821C54.3193 245.441 54.528 245.045 54.8724 244.635C55.2196 244.211 55.6361 243.846 56.1219 243.54C57.6025 242.607 59.1556 242.345 60.7812 242.753C62.4097 243.149 63.7341 244.157 64.7545 245.776C65.2453 246.555 65.5589 247.386 65.6955 248.27C65.8398 249.149 65.8126 250.012 65.6137 250.859C65.4178 251.693 65.0328 252.501 64.4589 253.283C63.885 254.065 63.1546 254.735 62.2678 255.294C60.4634 256.431 58.6697 256.807 56.8867 256.422C55.1037 256.038 53.6923 255.02 52.6524 253.37C51.8895 252.159 51.467 250.89 51.3848 249.563L50.6329 238.984ZM73.4435 224.61L76.0461 222.97L76.1455 246.081L73.543 247.721L73.4435 224.61ZM70.8635 232.005C71.3494 232.776 71.6138 233.606 71.6567 234.495C71.7073 235.378 71.5067 236.248 71.0547 237.104C70.598 237.952 69.9108 238.665 68.9931 239.243C67.6282 240.103 66.2582 240.374 64.8832 240.056C63.5082 239.737 62.4441 238.98 61.6909 237.785C60.928 236.574 60.6996 235.28 61.0056 233.902C61.3117 232.524 62.1471 231.405 63.512 230.545C64.4297 229.967 65.372 229.659 66.339 229.62C67.3011 229.574 68.1723 229.769 68.9526 230.203C69.7358 230.626 70.3728 231.226 70.8635 232.005ZM69.1332 235.568C69.2861 234.836 69.1341 234.107 68.6774 233.382C68.2206 232.658 67.6291 232.206 66.9029 232.028C66.1718 231.842 65.44 231.98 64.7074 232.442C63.9748 232.904 63.5384 233.502 63.3981 234.237C63.2529 234.964 63.4087 235.69 63.8655 236.415C64.3223 237.139 64.9099 237.593 65.6284 237.776C66.3421 237.951 67.0652 237.808 67.7978 237.346C68.5304 236.885 68.9755 236.292 69.1332 235.568ZM87.9401 232.896C88.6982 234.099 88.9203 235.392 88.6066 236.774C88.3005 238.152 87.4573 239.276 86.077 240.146C84.7121 241.006 83.3421 241.277 81.9671 240.958C80.5921 240.639 79.5255 239.879 78.7675 238.676C78.0143 237.48 77.7908 236.194 78.0968 234.816C78.4028 233.438 79.2383 232.319 80.6032 231.459C81.5209 230.881 82.4632 230.572 83.4302 230.534C84.3923 230.488 85.2611 230.679 86.0365 231.106C86.8197 231.528 87.4542 232.125 87.9401 232.896ZM85.754 234.273C85.3069 233.564 84.7203 233.12 83.9941 232.942C83.263 232.756 82.5311 232.894 81.7986 233.356C81.066 233.818 80.6271 234.412 80.482 235.139C80.3368 235.866 80.4902 236.588 80.9421 237.305C81.3989 238.03 81.9889 238.488 82.7123 238.678C83.4308 238.861 84.1564 238.722 84.889 238.26C85.6215 237.799 86.0642 237.202 86.2171 236.47C86.3651 235.73 86.2107 234.998 85.754 234.273Z"
                      fill="white"
                    />
                    <path
                      d="M151.607 315.277C151.572 313.162 152.097 311.522 153.183 310.358C154.278 309.184 155.84 308.549 157.87 308.454C159.755 308.365 161.315 308.853 162.552 309.917C163.787 310.973 164.445 312.351 164.525 314.054C164.573 315.065 164.415 315.971 164.051 316.773C163.687 317.565 163.152 318.421 162.447 319.339L157.872 325.385L165.069 325.046L165.214 328.119L151.584 328.76L151.576 328.596L159.609 317.501C159.96 317.01 160.216 316.633 160.377 316.37C160.548 316.107 160.697 315.785 160.825 315.405C160.962 315.015 161.021 314.629 161.003 314.247C160.964 313.409 160.672 312.739 160.128 312.235C159.584 311.722 158.88 311.486 158.015 311.527C156.986 311.575 156.231 311.916 155.75 312.55C155.269 313.184 155.03 314.039 155.035 315.116L151.607 315.277ZM166.917 314.557C166.882 312.442 167.407 310.802 168.493 309.638C169.587 308.464 171.15 307.83 173.18 307.734C175.065 307.646 176.625 308.134 177.861 309.198C179.097 310.253 179.755 311.632 179.835 313.335C179.883 314.345 179.724 315.251 179.361 316.053C178.996 316.846 178.462 317.701 177.757 318.62L173.182 324.665L180.379 324.327L180.523 327.4L166.894 328.04L166.886 327.876L174.919 316.782C175.27 316.291 175.526 315.914 175.687 315.651C175.857 315.387 176.007 315.066 176.135 314.685C176.271 314.296 176.331 313.91 176.313 313.527C176.274 312.69 175.982 312.019 175.438 311.515C174.894 311.003 174.189 310.767 173.325 310.807C172.296 310.856 171.541 311.197 171.06 311.831C170.578 312.465 170.34 313.32 170.345 314.396L166.917 314.557ZM198.873 306.91L201.946 306.766L190.644 326.924L187.571 327.069L198.873 306.91ZM192.984 312.073C193.027 312.984 192.848 313.836 192.447 314.631C192.056 315.425 191.453 316.083 190.638 316.605C189.822 317.117 188.873 317.399 187.79 317.45C186.178 317.526 184.853 317.086 183.813 316.131C182.774 315.176 182.221 313.993 182.154 312.582C182.087 311.153 182.526 309.914 183.472 308.866C184.417 307.818 185.695 307.256 187.307 307.18C188.39 307.129 189.362 307.325 190.223 307.769C191.082 308.203 191.745 308.801 192.209 309.564C192.683 310.317 192.941 311.154 192.984 312.073ZM189.723 314.321C190.217 313.759 190.443 313.05 190.403 312.195C190.363 311.339 190.071 310.655 189.527 310.142C188.982 309.62 188.277 309.379 187.412 309.42C186.547 309.461 185.873 309.766 185.389 310.336C184.904 310.897 184.682 311.606 184.722 312.462C184.762 313.317 185.05 314.002 185.585 314.515C186.12 315.019 186.819 315.251 187.684 315.21C188.549 315.17 189.229 314.873 189.723 314.321ZM207.404 321.264C207.471 322.684 207.027 323.919 206.073 324.967C205.127 326.015 203.84 326.578 202.21 326.654C200.599 326.73 199.273 326.291 198.234 325.336C197.194 324.381 196.641 323.193 196.574 321.773C196.508 320.362 196.948 319.132 197.893 318.084C198.838 317.036 200.117 316.474 201.728 316.398C202.812 316.347 203.783 316.543 204.644 316.987C205.504 317.421 206.166 318.015 206.63 318.768C207.103 319.522 207.361 320.354 207.404 321.264ZM204.823 321.385C204.784 320.548 204.492 319.873 203.948 319.36C203.403 318.838 202.698 318.597 201.833 318.638C200.969 318.679 200.294 318.979 199.809 319.541C199.325 320.102 199.102 320.806 199.142 321.652C199.182 322.508 199.47 323.197 200.005 323.72C200.541 324.233 201.241 324.469 202.106 324.428C202.97 324.388 203.65 324.087 204.144 323.525C204.637 322.954 204.863 322.241 204.823 321.385Z"
                      fill="white"
                    />
                    <path
                      d="M305.644 222.66L306.656 227.395L303.489 227.23L301.512 218.94L301.516 218.858L321.232 219.887L321.045 223.464L305.644 222.66ZM320.454 203.842C321.723 205.232 322.299 207.041 322.183 209.272C322.066 211.502 321.305 213.242 319.898 214.492C318.482 215.732 316.655 216.294 314.416 216.177L308.818 215.884C306.579 215.768 304.824 215.019 303.555 213.638C302.286 212.249 301.709 210.439 301.826 208.209C301.942 205.979 302.708 204.239 304.124 202.989C305.531 201.739 307.35 201.173 309.58 201.289L315.178 201.581C317.417 201.698 319.176 202.452 320.454 203.842ZM314.821 212.611C316.004 212.673 317 212.401 317.807 211.795C318.605 211.189 319.035 210.294 319.097 209.11C319.159 207.927 318.824 206.992 318.094 206.306C317.354 205.61 316.393 205.232 315.209 205.17L309.175 204.855C307.991 204.793 307 205.07 306.202 205.685C305.394 206.291 304.96 207.186 304.898 208.369C304.836 209.552 305.175 210.487 305.915 211.174C306.646 211.86 307.603 212.234 308.786 212.296L314.821 212.611ZM303.587 181.809L303.748 178.737L322.689 191.979L322.528 195.051L303.587 181.809ZM308.142 188.18C309.052 188.228 309.883 188.49 310.634 188.967C311.385 189.436 311.98 190.101 312.419 190.964C312.849 191.826 313.035 192.798 312.979 193.881C312.894 195.493 312.326 196.768 311.273 197.708C310.22 198.648 308.988 199.081 307.577 199.007C306.148 198.933 304.959 198.373 304.009 197.329C303.06 196.284 302.627 194.957 302.711 193.345C302.768 192.262 303.059 191.315 303.585 190.502C304.102 189.69 304.763 189.09 305.569 188.703C306.365 188.306 307.223 188.132 308.142 188.18ZM310.056 191.648C309.546 191.101 308.863 190.805 308.008 190.761C307.152 190.716 306.442 190.939 305.878 191.43C305.305 191.92 304.996 192.598 304.95 193.462C304.905 194.327 305.142 195.029 305.662 195.567C306.172 196.105 306.855 196.396 307.711 196.44C308.567 196.485 309.276 196.267 309.84 195.785C310.394 195.303 310.694 194.629 310.739 193.765C310.785 192.9 310.557 192.194 310.056 191.648ZM318.715 174.74C320.135 174.815 321.319 175.378 322.268 176.432C323.218 177.476 323.65 178.813 323.565 180.442C323.481 182.054 322.912 183.329 321.859 184.269C320.806 185.209 319.569 185.642 318.149 185.568C316.739 185.494 315.558 184.935 314.609 183.89C313.66 182.846 313.227 181.518 313.311 179.907C313.368 178.824 313.659 177.876 314.185 177.064C314.702 176.251 315.359 175.651 316.155 175.264C316.951 174.867 317.804 174.693 318.715 174.74ZM318.58 177.321C317.743 177.277 317.042 177.501 316.478 177.992C315.905 178.482 315.595 179.159 315.55 180.024C315.505 180.889 315.738 181.59 316.248 182.128C316.759 182.666 317.437 182.956 318.283 183.001C319.139 183.045 319.853 182.827 320.426 182.346C320.99 181.864 321.294 181.191 321.339 180.326C321.384 179.462 321.152 178.756 320.642 178.209C320.123 177.662 319.436 177.366 318.58 177.321Z"
                      fill="white"
                    />
                  </svg>
                  <Flex
                    vertical
                    align="center"
                    justify="center"
                    style={{ padding: "40px" }}
                  >
                    <Typography.Title
                      level={4}
                      style={{
                        margin: 0,
                        color: "#2B3674",
                        fontFamily: "Scandia-Medium",
                        fontSize: "22px",
                      }}
                    >
                      Breakdown of Outgoing Transactions Over the Last 24 Hours
                      <CardTooltip text={tooltip3} />
                    </Typography.Title>
                    <Typography.Title
                      level={5}
                      style={{
                        color: "#007AFF",
                        fontWeight: 400,
                        width: "100%",
                      }}
                    >
                      Total : 45,684
                    </Typography.Title>
                    <Flex style={{ width: "100%" }}>
                      <Flex align="center" style={{ marginRight: "15px" }}>
                        <span
                          style={{
                            margin: "4px",
                            height: "6px",
                            width: "6px",
                            borderColor: "#bbb",
                            borderRadius: "50%",
                            display: "inline-block",
                            background: "#007BFE",
                          }}
                        ></span>
                        <p>Jetton</p>
                      </Flex>
                      <Flex align="center" style={{ marginRight: "15px" }}>
                        <span
                          style={{
                            margin: "4px",
                            height: "6px",
                            width: "6px",
                            borderColor: "#bbb",
                            borderRadius: "50%",
                            display: "inline-block",
                            background: "#27B5FE",
                          }}
                        ></span>
                        <p>Swap</p>
                      </Flex>
                      <Flex align="center" style={{ marginRight: "15px" }}>
                        <span
                          style={{
                            margin: "4px",
                            height: "6px",
                            width: "6px",
                            borderColor: "#bbb",
                            borderRadius: "50%",
                            display: "inline-block",
                            background: "#54CB68",
                          }}
                        ></span>
                        <p>NFT</p>
                      </Flex>
                      <Flex align="center" style={{ marginRight: "15px" }}>
                        <span
                          style={{
                            margin: "4px",
                            height: "6px",
                            width: "6px",
                            borderColor: "#bbb",
                            borderRadius: "50%",
                            display: "inline-block",
                            background: "#3B63F6",
                          }}
                        ></span>
                        <p>TON</p>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </Card>
            </Col>
          </Row>
        </>
      )}
      {!loginStatus && <AboutAnalytics />}
      <Divider />
      <Footer />
    </>
  );
}

export default LandingPage;
