import React from 'react';
import logo from './logo.svg';
import 'antd/dist/antd.less';
import ruRU from "antd/es/locale/ru_RU";
import { MenuComponent } from "./component/Menu/Menu";
import { ConfigProvider, Layout, Button, DatePicker } from 'antd';

const { Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  return (
    <ConfigProvider locale={ruRU}>
    <Layout>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <MenuComponent />
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <DatePicker />
          <img src={logo} className="App-logo" alt="logo" />
          <Button>Button</Button>
          {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
    </ConfigProvider>
  );
}

export default App;
