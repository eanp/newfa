import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom";
import Cookie from 'js-cookie';
import {
  Row,
  Col,
  Container,
} from "reactstrap";

import { Provider } from 'react-redux'
import storage from './redux/store'

import Login from './pages/Login';
import Register from './pages/Register';
import Crudresto from './pages/Crudresto';
import Cruduser from './pages/Cruduser';
import Cruditem from './pages/Cruditem';
import Adminresto from './pages/Adminresto';
import Navbar from './pages/Navbar';
import Search from './pages/Search';
import Sidebar from './pages/Sidebar';
import Sidebarresto from './pages/Sidebarresto';


const token = Cookie.get('token');
const role = Cookie.get('role');
const iduser = Cookie.get('role');

const { store } = storage()

class App extends React.Component {
  render() {
    return (
      <Router>
        <Container fluid className='bg-light'>
          <Row>
            <Route path='/login' exact>
              <Navbar />
              <Login />
              <Container className='bg-light' style={{ height: '200px' }}>

              </Container>
            </Route>
            <Route path='/register' exact>
              <Navbar />
              <Register />
              <Container className='bg-light' style={{ height: '200px' }}>
              </Container>
            </Route>

            <Route path='/' exact>
              <Redirect to='/login' />
            </Route>

            <Switch>
              {token  && role == 1 ? <Route path='/admin/' exact>
                <Redirect to='/admin/resto' />
              </Route> : <Redirect to='/login/' /> || token && role == 2 ?
              <Route path='/adminresto/' exact>
              <Redirect to='/adminresto/items' />
            </Route> : <Redirect to='/login/' />
            }

             { token ? <Route path='/admin/resto' exact>
                <Navbar />
                <Sidebar />
                <Crudresto />
              </Route> :  <Redirect to='/login/' />
            }
              

              {token ? <Route path='/admin/users' exact>
                <Navbar />
                <Sidebar />
                <Cruduser />
              </Route> : <Redirect to='/login/' />
            }

              {token ? <Route path='/admin/items' exact>
                <Navbar />
                <Sidebar />
                <Cruditem />
              </Route> :  <Redirect to='/login/' />
            }

              {/* {token && role == 2 ? <Route path='/adminresto/' exact>
                <Redirect to='/adminresto/items' />
              </Route> : <Redirect to='/login/' />} */}

             <Route path='/adminresto/items' exact>
                <Navbar />
                <Sidebarresto />
                <Adminresto />
              </Route>
            </Switch>

          </Row>
        </Container>
      </Router>
    )
  }
}

export default App