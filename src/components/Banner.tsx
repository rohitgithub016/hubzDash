import { Typography } from "antd";

const Banner = () => {
  return (
    <div
      style={{
        background: "#007BFE",
        marginTop: "40px",
        marginBottom: "40px",
        textAlign: "center",
        fontFamily: "Scandia-Regular",
        padding: "40px",
      }}
    >
      <Typography.Title
        style={{
          margin: 0,
          color: "#FFF",
          fontWeight: "normal",
          fontSize: "32px",
        }}
      >
        Unlock additional analytics{" "}
        <span style={{ fontWeight: 600 }}> specific to your</span> <br />
        <span style={{ fontWeight: 600 }}>Hubz chat groups</span> by logging in
      </Typography.Title>
    </div>
  );
};

export default Banner;
