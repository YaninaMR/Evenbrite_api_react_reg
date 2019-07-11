import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {  Layout, Menu, Breadcrumb, Icon, Row, Col,Select,Input,Button } from "antd";
import "antd/dist/antd.css";
import { isEmpty, map,filter} from 'lodash';

const { SubMenu } = Menu;
const {
  Header, Content, Footer, Sider
} = Layout;
const { Option } = Select;



class App extends Component{
 
   constructor(props){
    super(props);
    this.state = {
      nameEvent: '',
      nameCategory: '101',
      imageDefault:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_Td5Es9_Mm2FATepo_1AmM_L07bFlFvPeTE5D8p911ZLzBq-Q",
      idCategoria:'',
      dataCategory:{
        categories:[]
      },
      dataEvent:{
        pagination:{},
        events:[],
      }
    }  
   this.handlerChange = this.handlerChange.bind(this);
   this.handlerClear = this.handlerClear.bind(this);
   this.changeModel = this.changeModel.bind(this);
  
  }
  
  componentDidMount(){
   this.handlerFetchFunction()
  }
 
  handlerFetchFunction(){
    console.log(this.state.nameEvent);
    console.log(this.state.nameCategory);
    const url =    `https://www.eventbriteapi.com/v3/events/search/?q=${this.state.nameEvent}&categories=${this.state.nameCategory}&token=TXAO435EOUOXCPASPXKG`;
    const url2 = `https://www.eventbriteapi.com/v3/categories/?token=TXAO435EOUOXCPASPXKG`;
  /*fetch(url)
    .then((response)=>{
      return response.json();
    }).then(function(resultado){
      this.setState({
        dataEvent: resultado
    })  
    }.bind(this))
      .catch(error => {
      alert('error',error);
    }); */


      Promise.all([fetch(url), fetch(url2)])
      .then(([response, res2]) => { 
        console.log(response);
        console.log(res2);
        return Promise.all([response.json(), res2.json()]) ;
      })
      .then(function([resultado, res2]) {
        // set state in here
        this.setState({
          dataEvent: resultado,
          dataCategory:res2})
       }.bind(this))
          .catch(error => {
          alert('error',error);
      });
      
    
  }

  handlerChange(event){ 
   const {value} = event.target;
  
       this.setState({
       nameEvent:value,       
      },()=> this.handlerFetchFunction());
  }

    changeModel = value => {
      this.setState({
        nameCategory: value
      },()=> this.handlerFetchFunction());
    };
       
   
  
   

  handlerClear(){
    this.setState({
      nameEvent:''  
    })
  }
  
  render(){
    
   const {dataEvent} = this.state
   const {dataCategory} = this.state
   
   let  filterEvents = dataEvent.events.filter(
     (eventData) =>{
    
      return eventData.name.text.toUpperCase().indexOf(this.state.nameEvent.toUpperCase()) !== -1;
     }
   );
  

   return(
    <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">
            <a  href="https://salcahuasi.github.io/Frente_Amplio/views/register.html" target="_blank" rel="noopener noreferrer">Registrarse</a>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout
            style={{ padding: "24px 0", background: " 999999" }}
            className="body"
          >
            <Sider width={200} style={{ background: "#fff" }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%" }}
              >
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="user" />
                      subnav 1
                    </span>
                  }
                >
                  <Menu.Item key="1">option1</Menu.Item>
                  <Menu.Item key="2">option2</Menu.Item>
                  <Menu.Item key="3">option3</Menu.Item>
                  <Menu.Item key="4">option4</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  title={
                    <span>
                      <Icon type="laptop" />
                      subnav 2
                    </span>
                  }
                >
                  <Menu.Item key="5">option5</Menu.Item>
                  <Menu.Item key="6">option6</Menu.Item>
                  <Menu.Item key="7">option7</Menu.Item>
                  <Menu.Item key="8">option8</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub3"
                  title={
                    <span>
                      <Icon type="notification" />
                      subnav 3
                    </span>
                  }
                >
                  <Menu.Item key="9">option9</Menu.Item>
                  <Menu.Item key="10">option10</Menu.Item>
                  <Menu.Item key="11">option11</Menu.Item>
                  <Menu.Item key="12">option12</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
     <div className="App">
        <Row className="search" >
          <Col span={11} offset={1}>
            {" "}
          <div style={{ marginBottom: 16 }}>
          <Input
          placeholder="Escribe que evento buscas"
          name="idEvent"
          value={this.state.nameEvent}
          onChange={this.handlerChange}
          type="string" 
          addonAfter={<Icon type="search" />}/>
         
      
          <Button onClick={this.handlerClear}>Limpia<Icon type="delete" /></Button>
          </div>
          </Col>
          <Col span={10} offset={2}>
            <Select
              showSearch
              defaultValue="Seleccionar categoría"
              optionFilterProp="children"
              onChange={this.changeModel}>
              {dataCategory.categories.map(category =>(
              <Option value={category.id}>{category.name}</Option>
              ))}
            </Select>
          </Col>
        </Row>
         
        <Row className="search">
         <ul className="ul">
         {
            filterEvents.map(evento =>(          
                 <li  className="margin">
                 <Col span={11} offset={1}>
                    <div className="shows">
                    <img  src={(evento.logo===null)?this.state.imageDefault:evento.logo.url}  alt={'desc'} />  
                     <p> {evento.name.text}</p>
                    </div>
                    
                 </Col>                                        
                 </li>                    
            )) 
   
          }
         </ul>

        </Row>
     </div>
     </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center" }}>
        Ant Design ©2019 Created by Yanina Mercado
      </Footer>
    </Layout> 
    )

  }
}
  



export default App;
