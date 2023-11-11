import Chat from "../pages/Chat";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFoundPageError from "../pages/NotFoundPageError";
// import User from "../pages/User";

const AUTH_ROUTES = [
  {
    path: "login",
    element: <Login />,
  },
];

export const ROUTES = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "chat",
    errorElement: <NotFoundPageError />,
    children: [
      {
        path: ":sessionId",
        element: <Chat />,
      },
    ],
  },
  // {
  //   path: "user",
  //   children: [
  //     {
  //       path: ":userId",
  //       errorElement: <NotFoundPageError />,
  //       element: <User />,
  //     },
  //   ],
  // },

  {
    path: "auth",
    children: AUTH_ROUTES,
  },
];
