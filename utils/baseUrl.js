const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://shoponix-vercel.vercel.app"
    : // "https://shoponix.envytheme.com"
      "http://localhost:3000";

export default baseUrl;
