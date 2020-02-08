import React, { Component } from 'react';
import axios from 'axios';
import {
    Input,
    Container,
    Row,
    Col,
    Button,
    Aside
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { Link, Route, Redirect } from 'react-router-dom';
import { APP_URL } from '../resource/config';
import qs from 'qs';
import Cookie from 'js-cookie'

const style = {
    color: {
        backgroundColor: 'salmon'
    },

    rows2: {
        backgroundColor: 'skyblue',
        height: 'auto'
    }

}


const url = APP_URL;
class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            token: '',
            role: '',
            usernamereg: '',
            passwordreg: '',
            iduser: ''
        }
    }

    login = async () => {
        await axios.post(`http://3.90.3.168:4000/user/login`, {
            username: this.state.username,
            password: this.state.password
        })
            .then((res) => {
                this.setState({
                    token: res.data.token,
                    role: res.data.data,
                    iduser: res.data.iduser
                })
                if (this.state.token && this.state.role) {
                    Cookie.set('token', this.state.token)
                    Cookie.set('role', this.state.role)
                    Cookie.set('iduser', this.state.iduser)
                }
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    register = async () => {
        await axios.post(`http://3.90.3.168:4000/user/register`, {
            username: this.state.usernamereg,
            password: this.state.passwordreg
        })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    render() {
        let { username, password } = this.state;
        let { usernamereg, passwordreg } = this.state;
        return (
            <Container fluid>
                <Row>
                    <Col className="" md={6} style={style.color}>
                        <Container
                            style={{
                                height: 'auto'
                            }}>
                            {/* <div
                                className="card o-hidden col-lg-12 col-md-12 col-sm-8 border-0 shadow-lg my-5">
                                <div className="card-body p-0 ">
                                    <div className="text-center">
                                        <div className="row">
                                            <div className="col-md">
                                                <div className="p-5 display-5">
                                                    <FontAwesomeIcon icon={faUtensils} size='6x' color="skyblue" />
                                                    <Link to='/' className='nav-link'>
                                                        <Button
                                                            className="btn btn-outline-light display-5"
                                                            style={{
                                                                backgroundColor: 'skyblue'
                                                            }}
                                                            type="button">FoodApp</Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}


                        </Container>
                    </Col>

                    <Col className="col-md-6" style={style.rows2}>
                        <Container>
                            <div className="row justify-content-center ">
                                <div className="col-lg-7">
                                    <div className="card o-hidden border-0 shadow-lg my-5">
                                        <div className="card-body p-0">
                                            <div className="row">
                                                <div className="col-lg">
                                                    <div className="p-3">
                                                        <div className="text-center">
                                                            <h1 className="h4 text-gray-900 mb-4">Login</h1>
                                                        </div>

                                                        <form className="user" onSubmit={(e) => e.preventDefault()}>
                                                            <div className="form-group">
                                                                <Input
                                                                    type="text"
                                                                    className="form-control form-control-user"
                                                                    id="username"
                                                                    name="username"
                                                                    placeholder="Username"
                                                                    value={username} onChange={(e) => this.setState({ username: e.target.value })}
                                                                />
                                                            </div>

                                                            <div className="form-group">
                                                                <Input
                                                                    type="password"
                                                                    className="form-control form-control-user"
                                                                    id="password"
                                                                    name="password"
                                                                    placeholder="Password"
                                                                    value={password} onChange={(e) => this.setState({ password: e.target.value })} />
                                                            </div>
                                                            <Button
                                                                type="submit"
                                                                className="btn  btn-outline-light  btn-user btn-block"
                                                                style={{
                                                                    backgroundColor: 'skyblue'
                                                                }}
                                                                onClick={this.login}
                                                            >
                                                                Login
                                                            </Button>
                                                        </form>
                                                    </div>
                                                    <h1 className="h4 text-gray-900 text-center m-3"><hr />Or<hr /></h1>
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
                                                                    placeholder="username"
                                                                    value={usernamereg} onChange={(e) => this.setState({ usernamereg: e.target.value })} />
                                                            </div>

                                                            <div className="form-group">
                                                                <Input
                                                                    type="password"
                                                                    className="form-control form-control-user"
                                                                    id="password"
                                                                    name="password"
                                                                    placeholder="Password"
                                                                    value={passwordreg} onChange={(e) => this.setState({ passwordreg: e.target.value })} />
                                                            </div>
                                                            <Button
                                                                type="submit"
                                                                className="btn  btn-outline-light  btn-user btn-block"
                                                                style={{
                                                                    backgroundColor: 'Salmon'
                                                                }} onClick={this.register}
                                                            >
                                                                Register
                                                            </Button>
                                                        </form>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </Container>
                    </Col>
                </Row>
            </Container >

        )
    }

}

export default User