import axios from "axios";

const api_url = import.meta.env.VITE_API_URL;
console.log(api_url);
const accessToken = localStorage.getItem("accessToken");
console.log("fshbsdbkj", accessToken);

export const RatesConversion = () => {
  return axios.get("https://tonapi.io/v2/rates?tokens=ton,usdt&currencies=usd");
};

export const landingPageStats = () => {
  return axios.get(`${api_url}/v1/home/getStats`);
};

export const loginUserDetails = (userDetails) => {
  return axios.post(`${api_url}/v1/auth/login`, userDetails);
};

export const getAuth = () => {
  return axios.get(`${api_url}/v1/auth/data`);
};

export const getCreatorStats = (at) => {
  return axios.get(`${api_url}/v1/creator/stats`, {
    headers: {
      Authorization: `Bearer ${at}`,
      "Content-Type": "application/json", // You can add more headers if needed
    },
  });
};

export const getCreatorEarnings = (at) => {
  return axios.get(`${api_url}/v1/creator/earnings`, {
    headers: {
      Authorization: `Bearer ${at}`,
      "Content-Type": "application/json", // You can add more headers if needed
    },
  });
};
export const getCreatorJettons = (at) => {
  return axios.get(`${api_url}/v1/creator/jetton`, {
    headers: {
      Authorization: `Bearer ${at}`,
      "Content-Type": "application/json", // You can add more headers if needed
    },
  });
};

export const getCreatorWalletActivity = (at) => {
  return axios.get(`${api_url}/v1/creator/wallet-activity/7`, {
    headers: {
      Authorization: `Bearer ${at}`,
      "Content-Type": "application/json", // You can add more headers if needed
    },
  });
};

export const logout = (at) => {
  return axios.post(
    `${api_url}/v1/auth/logout`,
    {}, // Empty object since you're not sending any data in the request body
    {
      headers: {
        Authorization: `Bearer ${at}`,
        "Content-Type": "application/json", // You can add more headers if needed
      },
    }
  );
};
