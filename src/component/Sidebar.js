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

}

class Sidebar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    toggler = () => {
        this.setState({
        })
    }
    render() {
        return (
            <Col sm={6} md={4} lg={3} xl={3} style={style.rows1} className="aside sidebar d-none d-sm-block">

                <Container>
                </Container>
            </Col >
        )
    }
}


export default Sidebar