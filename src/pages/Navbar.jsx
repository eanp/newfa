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

class Navbar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: {}
        }
    }


    render() {
        return (

            <div className="container">
                <Nav className="header navbar navbar-expand-md navbar-light bg-silver bg-faded">
                    <a className="navbar-brand display-4" href="/"><b>FoodApp</b></a>
                    <button aria-label="Toggle navigation" type="button" class="navbar-toggler"><span class="navbar-toggler-icon"></span></button>

                    <div class="collapse navbar-collapse" aria-expanded="false">
                        <ul className="ml-sm-auto navbar-nav ">
                            <li className='mr-auto'>
                                <div className=''></div>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link">About</a>
                            </li>
                            <li className="nav-item">
                                <a href="https://github.com/" className="nav-link">Contact</a>
                            </li>
                        </ul>
                    </div>
                </Nav>
            </div>
        )
    }
}

export default Navbar