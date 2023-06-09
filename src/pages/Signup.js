import "./login.css";
import React, { useEffect, useState } from "react";
import API2 from "../utils/API2";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

import Input from "../components/Input";
import Button from "../components/Button";

const getValue = (o, s) => {
  if (!o) {
    return null;
  }
  s = s.replace(/\[(\w+)\]/g, ".$1");
  s = s.replace(/^\./, "");
  var a = s.split(".");
  for (var i = 0, n = a.lenght; i < n; ++i) {
    var k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  return o;
};

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

function SignUpView() {
  const [msg, setMsg] = useState("");
  const [data, setData] = useState({});
  const [auth, setAuth] = useState({});

  const onChangeValue = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const onChangeValueAuth = (name, value) => {
    setAuth({ ...auth, [name]: value });
  };

  const onSuccessAuth = (response) => {
    API2.post("users/createNewUser/", onSuccessCreateUser, onError, data);
  };

  const onSuccessCreateUser = () => {
    API2.update("token/updateToken/", onSuccessUpdateToken, onError, auth);
  };

  const onSuccessUpdateToken = () => {
    window.location.href = "/login";
  };

  const onError = (response) => {
    console.log(response);
    setMsg(response.error);
  };

  const onSubmit = () => {
    console.log(auth);
    console.log(data);
    setMsg("enviando datos...");

    API2.post("token/authenticateToken/", onSuccessAuth, onError, auth);
  };

  return (
    <div className="signup-container">
      <div className="signup-section-page">
        <h2>Bienvenido</h2>
        <p className="text">Si ya estas registrado inicia sesion</p>
        <CustomLink to="/login">
          <button className="max-btn-40">Iniciar Sesion</button>
        </CustomLink>
      </div>
      <div className="login-section">
        <h1 className="text-left">Registrarse</h1>
        <div className="login-form">
          <Input
            name="first_name"
            placeholder="Jose"
            onChangeValue={onChangeValue}
            label="Ingresa tu nombre"
          />
          <Input
            name="last_name"
            placeholder="Perez"
            onChangeValue={onChangeValue}
            label="Ingresa tus apellidos"
          />

          <Input
            name="email"
            onChangeValue={onChangeValue}
            placeholder="regalrexnord@regalrexnord.com"
            label="Ingresa tu correo electronico"
          />
          <Input
            name="password"
            type="password"
            onChangeValue={onChangeValue}
            placeholder="********"
            label="Ingresa tu contraseña"
          />
          <Input
            name="birthday"
            type="date"
            onChangeValue={onChangeValue}
            label="Ingresa tu fecha de nacimiento"
          />
          <Input
            name="token"
            onChangeValue={onChangeValueAuth}
            type="number"
            placeholder="12345"
            label="Ingresa tu token de registro"
          />
          <Button onClick={onSubmit} type="primary">
            Registrarse
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SignUpView;
