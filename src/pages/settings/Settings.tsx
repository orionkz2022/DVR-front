import React, { useState } from 'react';
import MainMenu from "../../components/menu/Menu";
import './style/style.css'
import {useSelectedDevice} from "../../store/devices/SelectedDevice";
import {Layout} from "antd";
import TableDevices from "../../components/tables/tableDevices/TableDevices";



const { Header, Sider, Content, Footer } = Layout;

const Users: React.FC = () => {
    const [currentMenuItem, setCurrentMenuItem] = useState('settings');
    const{selectedDevice}=useSelectedDevice();

    const handleMenuClick = (key: string) => {
        setCurrentMenuItem(key);
    };

    return (
       <Layout style={{minHeight: '100vh'}}>
           <Header style={{
               position: 'sticky',
               top: 0,
               zIndex: 1,
               width: '100%',
               display: 'flex',
               alignItems: 'center',
               paddingLeft:0,
               paddingRight:0
           }}>
               <div className="menu">
                   <MainMenu onClick={handleMenuClick} currentMenuItem={currentMenuItem}/>
               </div>
           </Header>
           <Layout>
               <Content  style={{ overflowX: 'auto', background:'#ffffff' }}>

               </Content >
           </Layout>
       </Layout>
    );};


export default Users;
