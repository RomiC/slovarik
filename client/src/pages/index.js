import React from 'react';

import {
  Layout,
  Menu
} from 'element-react';

const IndexPage = (
  <div className="index">
    <Menu mode="horizontal">
      <Menu.Item index="1">Logout</Menu.Item>
    </Menu>
    <Layout.Row>
      <Layout.Col span="24">
        Slovarik is here!
      </Layout.Col>
    </Layout.Row>
  </div>
);

export default IndexPage;