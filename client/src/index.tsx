import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./routes/ErrorPage";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import { AuthContextProvider } from "./context/AuthContext";
import { RequireAuth } from "./routes/RequireAuth";
import DashboardLayout from "./components/DashboardLayout";
import Posts from "./routes/Posts";
import Accounts from "./routes/Accounts";
import { SocialAccountsContextProvider } from "./context/SocialAccountsContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DashboardOutlet from "./components/DashboardOutlet";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Root />} errorElement={<ErrorPage />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <SocialAccountsContextProvider>
                    <DashboardLayout />
                  </SocialAccountsContextProvider>
                </RequireAuth>
              }
            >
              <Route path="" element={<DashboardOutlet />} />
              <Route path="posts" element={<Posts />} />
              <Route path="accounts" element={<Accounts />} />
            </Route>
          </Routes>
        </AuthContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
