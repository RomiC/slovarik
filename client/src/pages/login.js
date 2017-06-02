import React from 'react';

import {
  Form,
  Input,
  Layout
} from 'element-react';

const LoginPage = (
  <Layout.Row>
    <Layout.Col span="8"></Layout.Col>

    <Layout.Col span="8">
      <Form>
        <Form.Item label="Login">
          <Input type="text" placeholder="Your login" />
        </Form.Item>

        <Form.Item label="Password">
          <Input type="password" placeholder="Your password" />
        </Form.Item>
      </Form>
    </Layout.Col>

    <Layout.Col span="8"></Layout.Col>
  </Layout.Row>
);

export default LoginPage;