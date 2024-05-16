import { Col, Row, Typography } from "antd";
import Logo from "../assets/svgs/Logo";

function Footer() {
  return (
    <footer
      style={{
        marginLeft: "80px",
        marginRight: "80px",
        paddingTop: "20px",
        paddingBottom: "20px",
      }}
    >
      <Row gutter={[20, 20]}>
        <Col sm={24} md={12}>
          <Logo />
        </Col>
        <Col
          sm={24}
          md={12}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Typography.Text style={{ fontSize: "22px", color: "#35373B" }}>
            © Copyright 2024 Hubz App, All Rights Reserved
          </Typography.Text>
        </Col>
      </Row>
    </footer>
  );
}

export default Footer;
