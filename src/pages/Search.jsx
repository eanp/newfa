import React, { Component } from 'react';
import axios from 'axios';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    Input,
    Button,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container,
    Col,
    Row,
    FormGroup,
    Label
} from 'reactstrap'

import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: {}
        }
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col>
                    </Col>
                    <Col>
                        <form class="">
                            <FormGroup>
                                <Input type="select" name="select" id="exampleSelect">
                                    <option>Select By</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Input type="select" name="select" id="exampleSelect">
                                    <option>Sort By</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Input type="select" name="select" id="exampleSelect">
                                    <option>ASC</option>
                                    <option>DESC</option>
                                </Input>
                            </FormGroup>
                            <input type="text" id="algolia-doc-search" placeholder="Search docs" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellcheck="false" class="form-control" />
                            <Button color="secondary">Search</Button>
                        </form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Search