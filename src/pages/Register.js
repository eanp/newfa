import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import axios from 'axios';
import qs from 'qs';
import Cookie from 'js-cookie';
import Example from './Carousel'

import {
    Row,
    Col,
    Input,
    Card,

    CardBody,
    Container,
    Button
} from "reactstrap";


const url = "http://3.90.3.168:4000/";
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: "green",
            username: '',
            password: '',
            token: '',
            role: '',
            usernamereg: '',
            passwordreg: '',
            iduser: ''
        }
    }

    register = async () => {
        await axios.post(`${url}user/register`, {
            username: this.state.usernamereg,
            password: this.state.passwordreg
        })
            .then((res) => {
                window.location = '/login';
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        let { usernamereg, passwordreg } = this.state;
        return (
            <Container className='' style={{ height: '100%' }}>
                <div className="row justify-content-center ">
                    <div className="col-lg-7">
                        <div className="card o-hidden border-0 my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg">
                                        <div className="p-3">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Register</h1>
                                            </div>

                                            <form className="user" onSubmit={(e) => e.preventDefault()}>
                                                <div className="form-group">
                                                    <Input
                                                        type="text"
                                                        className="form-control form-control-user"
                                                        id="username"
                                                        name="username"
                                                        placeholder="Username" onChange={(e) => this.setState({ usernamereg: e.target.value })}
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <Input
                                                        type="password"
                                                        className="form-control form-control-user"
                                                        id="password"
                                                        name="password"
                                                        placeholder="Password" onChange={(e) => this.setState({ passwordreg: e.target.value })} />
                                                </div>
                                                <Button
                                                    type="submit"
                                                    className="btn  btn-outline-light  btn-user btn-block"
                                                    style={{
                                                        backgroundColor: 'skyblue'
                                                    }}
                                                    onClick={this.register}
                                                >
                                                    Register
                                                            </Button>
                                            </form>
                                            <Link to='/Login/' className='nav-link text-dark text-center'>
                                                <div className='text-center mt-4 text-primary'>
                                                    <h6>Login</h6>
                                                </div>
                                            </Link>
                                            <div className='text-center mt-4'>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                {/* <Row className='justify-content-center'>

                    <Col lg="6" md="12">
                        <Card className="mt-5">
                            <CardBody>
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <Row className="m-2 p-2">
                                        <Col>
                                            <div className="form-group">
                                                <Input type="text"
                                                    id="username" name="username"
                                                    placeholder="username"
                                                    value={username}
                                                    onChange={(e) => this.setState({ username: e.target.value })}
                                                    className="m-2 p-2" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="m-2 p-2">
                                        <Col>
                                            <div className="form-group">
                                                <Input type="password"
                                                    id="password" name="password"
                                                    placeholder="Password"
                                                    value={password}
                                                    onChange={(e) => this.setState({ password: e.target.value })}
                                                    className="m-2 p-2" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="m-2 p-2">
                                        <Col>
                                            <Button color="info" className="animation-on-hover btn-block"
                                                onClick={this.login} >
                                                Login
                                    </Button>
                                        </Col>
                                    </Row>
                                </form>
                            </CardBody>
                        </Card >
                    </Col>
                </Row> */}
            </Container >
        )
    }
}

export default Register;