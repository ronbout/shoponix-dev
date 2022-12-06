import cookie from "js-cookie";
import Router from "next/router";

export const handleLogin = (token, userType, signup = false) => {
  cookie.set("token", token);
  if (!signup && false) {
    Router.push("/profile");
  }
  if ("club" === userType) {
    Router.push("/profile-club");
  } else {
    Router.push("/profile-parent");
  }
};

export const redirectUser = (ctx, location) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
};

export const handleLogout = () => {
  cookie.remove("token");
  window.localStorage.setItem("logout", Date.now());
  Router.push("/");
};
