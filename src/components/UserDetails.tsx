import { Card, Divider, Flex, List, Tooltip, Typography } from "antd";
// @ts-ignore
import Information from "../assets/svgs/Information"; // Import the Information component
// @ts-ignore

function UserDetails({
  groupDetails,
  totalSubscribers,
  weeklyActiveSubscribers,
  tonEarnings,
  usdtEarnings,
  tontoUSD,
  usdttoUSD,
}: {
  groupDetails: any;
  totalSubscribers: any;
  weeklyActiveSubscribers: any;
  tonEarnings: any;
  usdtEarnings: any;
  tontoUSD: any;
  usdttoUSD: any;
}) {
  // console.log(usdtEarnings);
  // console.log("TON EARNINGS", tonEarnings);
  // console.log("TON CONVERSION", tonEarnings * tontoUSD);
  // console.log("USDT EARNING", usdtEarnings);
  // console.log("usdt conversion", usdtEarnings * usdttoUSD);

  const convertedTonEarnings = (tonEarnings * tontoUSD).toFixed(2);
  const convertedUSDTEarnings = (usdtEarnings * usdttoUSD).toFixed(2);
  const sum_TON_USDT =
    Number(convertedTonEarnings) + Number(convertedUSDTEarnings);

  return (
    <>
      <Card
        bodyStyle={{ padding: 0 }}
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderRadius: "8px",
          padding: "20px",
          backgroundColor: "#fff",
          flexDirection: "column",
          border: "none",
        }}
      >
        <Flex justify="space-between">
          <Card style={{ border: "none" }}>
            <List
              bordered={false}
              header={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px",
                  }}
                >
                  <span
                    style={{
                      marginRight: "5px",
                      fontFamily: "Scandia-Medium",
                      fontSize: "22px",
                      color: "#2B3674",
                      fontWeight: 500,
                    }}
                  >
                    Hubz-enabled Chat Groups
                  </span>
                  <Tooltip
                    color="white"
                    title={
                      <span
                        style={{
                          color: "#5E87BB",
                          fontFamily: "Scandia-Regular",
                          fontSize: "12px",
                        }}
                      >
                        Showing all groups where you are designated as an Admin
                        in the Telegram chat settings. Note that this includes
                        chats where you may not be the Owner. Metrics shown on
                        this dashboard will be an aggregate of all the groups
                        listed here
                      </span>
                    }
                  >
                    <span style={{ cursor: "pointer" }}>
                      <Information />
                    </span>
                  </Tooltip>
                </div>
              }
              dataSource={groupDetails} // Use groupDetails as dataSource
              renderItem={(item: any) => (
                <List.Item style={{ border: "none" }}>
                  <List.Item.Meta
                    title={
                      <span
                        style={{
                          fontSize: "22px",
                          fontWeight: 400,
                          color: "#2B3674",
                          fontFamily: "Scandia-Regular",
                          padding: "10px",
                        }}
                      >
                        {item?.name}
                      </span>
                    }
                    description={
                      <span
                        style={{
                          fontSize: "16px",
                          color: "#007BFE",
                          fontWeight: 400,
                          fontFamily: "Scandia-Regular",
                          padding: "10px",
                        }}
                      >
                        {`${item.totalSubscribers} Users`}
                      </span>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>

          <div>
            <Card style={{ marginBottom: "20px", border: "none" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <span
                  style={{
                    fontSize: "22px",
                    color: "#2B3674",
                    fontFamily: "Scandia-Medium",
                    fontWeight: 500,
                    marginTop: "10px",
                  }}
                >
                  Number of Users
                </span>
                <Tooltip
                  color="white"
                  title={
                    <span
                      style={{
                        color: "#5E87BB",
                        fontFamily: "Scandia-Regular",
                        fontSize: "12px",
                      }}
                    >
                      Calculated as the total number of unique wallets connected
                      to the Admin's groups, including all groups managed by the
                      Admin.
                    </span>
                  }
                >
                  <span
                    style={{
                      cursor: "pointer",
                      display: "inline",
                      marginRight: "158px",
                      marginTop: "11px",
                    }}
                  >
                    <Information />
                  </span>
                </Tooltip>
              </div>
              <div
                style={{
                  fontSize: "22px",
                  color: "#007BFE",
                  fontFamily: "Scandia-Regular",
                  fontWeight: 400,
                  marginTop: "0px",
                  padding: "10px",
                }}
              >
                {totalSubscribers}
              </div>
            </Card>
            <Card style={{ border: "none" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <span
                  style={{
                    fontSize: "22px",
                    color: "#2B3674",
                    fontWeight: 500,
                    fontFamily: "Scandia-Medium",
                  }}
                >
                  Number of Weekly Active Users
                </span>
                <Tooltip
                  color="white"
                  title={
                    <span
                      style={{
                        color: "#5E87BB",
                        fontFamily: "Scandia-Regular",
                        fontSize: "12px",
                      }}
                    >
                      Calculated as the total number of unique wallets connected
                      to the Admin's groups that have conducted an on-chain
                      transaction in the last 7 days{" "}
                    </span>
                  }
                >
                  <span style={{ cursor: "pointer", marginLeft: "5px" }}>
                    <Information />
                  </span>
                </Tooltip>
              </div>
              <div
                style={{
                  fontSize: "22px",
                  color: "#007BFE",
                  fontFamily: "Scandia-Regular",
                  fontWeight: 400,
                  marginTop: "0px",
                  padding: "10px",
                }}
              >
                {weeklyActiveSubscribers}
              </div>
            </Card>
          </div>
        </Flex>
        <Divider
          style={{
            marginTop: "10px",
            borderColor: "#C7C7C7",
            borderWidth: "2px",
          }}
        />
        {/* <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "22px",
              color: "#2B3674",
              fontWeight: 500,
              fontFamily: "Scandia-Medium",
              marginLeft: "12px",
              padding: "10px",
            }}
          >
            Total USD Earnings
          </span>
        </div>
        <div
          style={{
            fontSize: "20px",
            color: "#007BFE",
            fontFamily: "Scandia-Regular",
            fontWeight: 400,
            marginTop: "0px",
            marginLeft: "12px",
            padding: "10px",
          }}
        >
          {`${tonEarnings} TON (~ ${Number(
            convertedTonEarnings
          )} USD) + ${Number(usdtEarnings).toFixed(2)} (~ ${Number(
            convertedUSDTEarnings
          )} USD) = ${Number(sum_TON_USDT).toFixed(2)} USD`}
        </div> */}
        <Flex style={{ padding: "34px", flex: 1 }} justify="space-between">
          <Flex vertical>
            <Typography.Title
              level={4}
              style={{
                color: "#2B3674",
                fontFamily: "Scandia-Medium",
                fontSize: "22px",
                margin: 0,
                fontWeight: "500",
              }}
            >
              Total Earnings (in USD)
            </Typography.Title>
            <Typography.Title
              level={4}
              style={{ color: "#007BFE", fontFamily: "Scandia-Regular" }}
            >
              {`~${Number(sum_TON_USDT).toFixed(2)} USD`}
            </Typography.Title>
          </Flex>
          <Flex
            justify="center"
            align="center"
            style={{ fontSize: "52px", color: "#007BFE", flex: 1 }}
          >
            =
          </Flex>
          <Flex gap={100} justify="flex-start" style={{ flex: 2 }}>
            <Flex vertical justify="space-between">
              <div
                style={{
                  background: "#007BFE",
                  padding: "6px",
                  borderRadius: "6px",
                }}
              >
                <Typography.Title
                  level={5}
                  style={{
                    fontSize: "16px",
                    fontFamily: "Scandia-Regular",
                    margin: 0,
                    color: "#FFF",
                  }}
                >
                  TON Earnings
                </Typography.Title>
              </div>
              <Typography.Title
                level={5}
                style={{
                  fontSize: "16px",
                  fontFamily: "Scandia-Regular",
                  margin: 0,
                  borderRadius: "6px",
                  marginLeft: "6px",
                  fontWeight: "500",
                }}
              >
                {`${tonEarnings} TON (~ ${Number(convertedTonEarnings)} USD)`}
              </Typography.Title>
            </Flex>
            <Flex
              justify="center"
              align="center"
              style={{ fontSize: "52px", color: "#007BFE" }}
            >
              +
            </Flex>
            <Flex vertical justify="space-between">
              <div
                style={{
                  background: "#007BFE",
                  padding: "6px",
                  borderRadius: "6px",
                }}
              >
                <Typography.Title
                  level={5}
                  style={{
                    fontSize: "16px",
                    fontFamily: "Scandia-Regular",
                    margin: 0,
                    color: "#FFF",
                  }}
                >
                  USDT Earnings
                </Typography.Title>
              </div>
              <Typography.Title
                level={5}
                style={{
                  fontSize: "16px",
                  fontFamily: "Scandia-Regular",
                  margin: 0,
                  marginLeft: "6px",
                  fontWeight: "500",
                }}
              >
                {`${Number(usdtEarnings).toFixed(2)} (~ ${Number(
                  convertedUSDTEarnings
                )} USD)`}
              </Typography.Title>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </>
  );
}

export default UserDetails;
