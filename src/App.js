import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useFormik } from "formik";
import { config } from "./config";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Products from "./Products";
import ForgotPassword from "./ForgotPassword";
import ChangePassword from "./ChangePassword";
import LoginPass from "./LoginPass";

function App() {

  return (

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/LoginPass" element={<LoginPass/>}></Route>
      <Route path="/ForgotPassword" element={<ForgotPassword/>}></Route>
      <Route path="/ChangePassword/:id" element={<ChangePassword/>}></Route>
      <Route path="/products" element={<Products/>}></Route>
    </Routes>
    </BrowserRouter>
      );
}

export default App;
