import React, { Component } from 'react';
import axios from 'axios';
import {
    Container, Row, Col, Button,
    Collapse,
    Navbar as Nb,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink, Table
} from 'reactstrap'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUtensils,
    faArchive
} from '@fortawesome/free-solid-svg-icons';


const style = {
    header: {
        fontFamily: 'monospace'
    },
    header: {
        fontFamily: 'Helvetica Neue'
    },
    card: {
        fontFamily: 'monospace',
        backgroundColor: 'salmon'
    },
    textFont: {
        fontFamily: 'monserat'
    },
    rows1: {
        backgroundColor: 'skyblue',
        fontFamily: 'monserat'
    },
    rows2: {
        backgroundColor: 'salmon',
    },
    con1: {
        backgroundColor: 'white',
    }

}

class Sidebarresto extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            navsCollapsibles: true
        }
    }
    toggler = () => {
        this.setState({
            navsCollapsible: !this.state.navsCollapsible
        })
    }
    render() {
        return (
            <Col sm={6} md={4} lg={3} xl={3} style={style.rows1} className="aside sidebar d-none d-sm-block">
                <Container className=''>
                    <Nb style={style.header} className="mt-3 mb-4" dark>
                        <NavbarBrand style={style.textFont} className='display-1' >
                            F o o d A p p</NavbarBrand>
                        <NavbarToggler onClick={this.toggler} />
                    </Nb>
                    <Collapse isOpen={this.state.navsCollapsible} navbar>
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="frame frame__active ">
                                    <img className="img-avatar mb-2" src="https://class.buildwithangga.com/images/default-avatar.svg" alt="avatar" />
                                </div>
                                <h5 className="card-name mt-1 ">Admin</h5>
                                <span className="">This is bio of admin foodapp.</span>
                            </div>
                        </div>


                        <Nav navbar>
                            <NavItem className='nav-link text-light mt-1 font-weight-bold'><h5>Main Menu</h5>
                            </NavItem>
                            <NavItem>
                                <Link to='/resto/item/' className='nav-link text-center text-light'><h6>Items</h6></Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/resto/category/' className='nav-link text-center text-light'><h6>Category</h6></Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/resto/feedback/' className='nav-link text-center text-light'><h6>Rating and Review</h6></Link>
                            </NavItem>

                            <NavItem className='nav-link text-light font-weight-bold'><h5>User</h5>
                            </NavItem>
                            <NavItem>
                                <Link to='/resto/' className='nav-link text-center text-light'><h6>My Profile</h6></Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/resto/' className='nav-link text-center text-light'>Edit</Link>
                            </NavItem>
                            <div className='text-center text-light'>
                                ______
                                    </div>
                            <NavItem>
                                <Link to='/user/' className='nav-link text-center text-light'><h5>Logout</h5></Link>
                            </NavItem>
                        </Nav>

                    </Collapse>
                </Container>
            </Col>
        )
    }
}

export default Sidebarresto