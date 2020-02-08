import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Button,
    Collapse,
    Navbar as Nb,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Table,
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    FormGroup,
    Label,
    Input,
    FormText
} from 'reactstrap'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Cookie from 'js-cookie';


const token = Cookie.get('token');
const role = Cookie.get('role');
const iduser = Cookie.get('iduser');

class Sidebar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: {}
        }
    }

    logout = async () => {
        Cookie.remove('token')
        Cookie.remove('iduser')
        Cookie.remove('role')
        const headers = {
            Authorization: `Bearer ` + token
        }
        await axios.put(`http://3.90.3.168:4000/user/logout/`, { headers: headers })
        window.location.reload()
    }



    render() {
        return (
            <Col md={3} lg={3} xl={3} className="aside sidebar d-none d-sm-block mt-4">
                <div className="card p-4" style={{ borderRadius: '25px' }}>
                    <Nav navbar>
                        <NavItem className='nav-link font-weight-bold text-center'>
                            <a class="btn btn-bg btn-primary btn-block" href="#">Main Menu</a>
                        </NavItem>
                        <NavItem>
                            <Link to='/admin/users/' className='nav-link text-dark text-center'><h6>Dashboard</h6></Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/admin/users/' className='nav-link text-dark text-center'><h6>User</h6></Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/admin/resto/' className='nav-link text-dark text-center'><h6>Restaurant</h6></Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/admin/items/' className='nav-link text-dark text-center'><h6>Items</h6></Link>
                        </NavItem>

                        <NavItem className='nav-link font-weight-bold text-center'>
                            <a class="btn btn-bg btn-primary btn-block" href="#">User</a>
                        </NavItem>
                        <NavItem>
                            <Link to='/admin/' className='nav-link text-dark text-center'><h6>My Profile</h6></Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/admin/' className='nav-link text-dark text-center'><h6>Edit</h6></Link>
                        </NavItem>
                        <div className='text-center'>
                            ______
                        </div>
                        <NavItem>
                            <Link className='nav-link text-light text-center'>
                                <a class="btn btn-bg btn-danger btn-block" onClick={this.logout}>Logout</a>
                            </Link>
                        </NavItem>
                    </Nav>
                </div>
            </Col >
        )
    }
}

export default Sidebar