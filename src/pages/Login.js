import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import axios from 'axios';
import Cookie from 'js-cookie';
import qs from 'qs';
import Example from './Carousel'
import { connect } from 'react-redux'
import {
    postLogin
} from '../redux/action/Login';
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
class Login extends React.Component {
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

    login = async () => {
        await axios.post(`${url}user/login`, {
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
                    if (this.state.role === 1) {
                        Cookie.set('token', this.state.token);
                        Cookie.set('role', this.state.role);
                        Cookie.set('iduser', this.state.iduser);
                        window.location = '/admin';
                    } else if (this.state.role === 2) {
                        Cookie.set('token', this.state.token);
                        Cookie.set('role', this.state.role);
                        Cookie.set('iduser', this.state.iduser);
                        window.location = '/adminresto';
                    } else {
                        window.location = '/login';
                        alert('your not admin');
                    }
                }
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // login = async () =>{
    //     const data = {username: this.state.username,
    //                 password: this.state.password}
    //     this.props.dispatch(postLogin(data));
    // }

    render() {
        let { username, password } = this.state;
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
                                            <Link to='/register/' className='nav-link text-dark text-center'>
                                                <div className='text-center mt-4 text-primary'>
                                                    <h6>Register</h6>
                                                </div>
                                            </Link>
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

export default Login

// const mapStateToProps = state => {
//     return {
//         login: state.login
//     }
// }

// export default connect(mapStateToProps)(Login)