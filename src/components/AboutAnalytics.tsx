import { Col, Flex, Row, Typography, Grid } from "antd";
import MockUpCharts from "../assets/svgs/MockUpCharts";
import CheckIcon from "../assets/svgs/CheckIcon";

const { useBreakpoint } = Grid;

const AboutAnalytics = () => {
  const screens = useBreakpoint();
  return (
    <div style={{ background: "#FFFFFF", marginBottom: "40px" }}>
      <Row style={{ padding: "60px" }}>
        {(screens?.md || screens?.sm || screens?.xs) && !screens?.lg && (
          <Col xs={24} sm={24} md={24}>
            <MockUpCharts />
          </Col>
        )}
        <Col xs={24} sm={24} md={10}>
          <Typography.Title
            level={2}
            style={{
              color: "#007BFE",
              fontFamily: "Scandia-Medium",
              fontSize: "42px",
            }}
          >
            Deliver better experiences for your users with Hubz Analytic
          </Typography.Title>
          <Typography.Title
            level={4}
            style={{
              color: "#333",
              fontWeight: 400,
              fontFamily: "Scandia-Regular",
              marginBottom: "40px",
              fontSize: "32px",
            }}
          >
            Here's a preview of what admins will have access to upon logging in:
          </Typography.Title>
          <Flex vertical gap={40}>
            <Flex gap={24}>
              <div style={{ width: "22px", height: "22px" }}>
                <CheckIcon />
              </div>
              <Typography.Text
                style={{
                  color: "#35373B",
                  fontSize: "22px",
                  fontFamily: "Scandia-Regular",
                }}
              >
                What types of onchain assets does your Hubz Telegram user group
                hold or trade?
              </Typography.Text>
            </Flex>
            <Flex gap={24}>
              <div style={{ width: "22px", height: "22px" }}>
                <CheckIcon />
              </div>
              <Typography.Text
                style={{
                  color: "#35373B",
                  fontSize: "22px",
                  fontFamily: "Scandia-Regular",
                }}
              >
                How active is your group onchain?
              </Typography.Text>
            </Flex>
            <Flex gap={24}>
              <div style={{ width: "22px", height: "22px" }}>
                <CheckIcon />
              </div>
              <Typography.Text
                style={{
                  color: "#35373B",
                  fontSize: "22px",
                  fontFamily: "Scandia-Regular",
                }}
              >
                What’s the average wallet balance of your Hubz Telegram user
                group? ....and more!
              </Typography.Text>
            </Flex>
          </Flex>
        </Col>
        {screens?.lg && (
          <Col
            xs={24}
            sm={24}
            md={14}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <MockUpCharts />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default AboutAnalytics;
