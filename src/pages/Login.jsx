import axios from 'axios';
import { useState } from 'react';
import Main from './Main';
const Login = () => {
  const [account, setAccount] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccount({
      ...account,
      [name]: value,
    });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/admin/signin`, account)
      .then((res) => {
        const { token, expired } = res.data;
        document.cookie = `cloveToken=${token}; expires=${new Date(expired)}`;
        setIsAuth(true);
      })
      .catch((err) => alert('登入失敗', err));
  };
  return (
    <>
      {isAuth ? (
        <Main />
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
          <h1 className="mb-5">請先登入</h1>
          <form className="d-flex flex-column gap-3">
            <div className="form-floating mb-3">
              <input
                name="username"
                value={account.username}
                type="email"
                className="form-control"
                id="username"
                placeholder="name@example.com"
                onChange={handleInputChange}
              />
              <label htmlFor="username">Email address</label>
            </div>
            <div className="form-floating">
              <input
                name="password"
                value={account.password}
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                onChange={handleInputChange}
              />
              <label htmlFor="password">Password</label>
            </div>
            <button className="btn btn-primary" onClick={handleLogin}>
              登入
            </button>
          </form>
          <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院模版</p>
        </div>
      )}
    </>
  );
};

export default Login;
