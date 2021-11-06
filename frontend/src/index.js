import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createStore } from "redux";
import App from "./components/App";
import Login from "./components/Login";
import HomePage from "./components/Pages/HomePage";
import LogoutPage from "./components/Pages/LogoutPage";
import ProjectPage from "./components/Pages/ProjectPage";
import SignupPage from "./components/Pages/SignupPage";
import UnsavedProjectPage from "./components/Pages/UnsavedProjectPage";
import UserPage from "./components/Pages/UserPage";
import reportWebVitals from "./reportWebVitals";
import rootReducer from "./state/rootReducer";
import "./styles/index.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStore(rootReducer)}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<LogoutPage />} />
            <Route path="user/:userId" element={<UserPage />} />
            <Route path="project/:projectId" element={<ProjectPage />} />
            <Route path="unsavedproject" element={<UnsavedProjectPage />} />
            <Route path="*" element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
