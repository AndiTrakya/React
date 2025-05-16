import React, { useState } from "react";
import { Card, Form, Input, Button, Typography, Alert } from "antd";

const { Title } = Typography;

const Login = ({ onLogin }) => {
  const [error, setError] = useState("");

  const handleLogin = (values) => {
    if (values.username === "calisan" && values.password === "1234") {
      setError("");
      onLogin();
    } else {
      setError("Kullanıcı adı veya şifre yanlış.");
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card title={<Title level={3}>Giriş Yap</Title>} style={{ width: 300 }}>
        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item label="Kullanıcı Adı" name="username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Şifre" name="password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>Giriş</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
