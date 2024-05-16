import { Card, Tooltip } from "antd";
// @ts-ignore
import Information from "../assets/svgs/Information"; // Import the Information component
interface CardsProps {
  text: string;
  svg: any; // Adjust the type 'any' according to the type of 'svg'
  value: string | number; // Assuming value is a number, adjust if it's a different type
  tooltipTitle: string; // Assuming tooltipTitle is a string

}

function Cards({ text, svg, value, tooltipTitle }: CardsProps) {
  const tooltipStyle = {
    backgroundColor: "white",
    color: "#5E87BB",
    border: "1px solid #5E87BB",
  };
  return (
    <Card style={{ width: 400, height: 150, borderRadius: "12px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {/* Left side: text and information */}
        <div
          style={{
            width: "70%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                fontSize: "18px",
                marginRight: "5px",
                fontFamily: "Scandia-Regular",
              }}
            >
              {text}
              <span style={{ margin: "8px" }}>
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
                      {tooltipTitle}
                    </span>
                  }
                  style={tooltipStyle}
                >
                  <div
                    style={{
                      cursor: "pointer",
                      marginTop: "30px",
                      display: "inline",
                    }}
                  >
                    <Information />
                  </div>
                </Tooltip>
              </span>
            </div>
          </div>
          <div
            style={{
              fontSize: "26px",
              fontWeight: 500,
              fontFamily: "Scandia-Medium",
              marginTop: "5px",
            }}
          >
            {value}
          </div>
        </div>
        <div
          style={{
            width: "30%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start",
          }}
        >
          {svg}
        </div>
      </div>
    </Card>
  );
}

export default Cards;
