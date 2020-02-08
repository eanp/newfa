import React, { Component } from 'react';
import axios from 'axios';
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
    FormText,
    Modal, ModalHeader, ModalBody, ModalFooter

} from 'reactstrap'

import {
    getAdminUser, postAdminUser,
    putAdminUser, deleteAdminUser
} from '../redux/action/Users';
import { connect } from 'react-redux'

import { Link } from 'react-router-dom';
import Cookie from 'js-cookie';
import qs from 'qs';

const token = Cookie.get('token');
const role = Cookie.get('role');

const url = 'http://3.90.3.168:4000/admin/user/'
const APP_URL = `http://3.90.3.168:4000/`

class Cruduser extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: {},
            isFetched: false,
            modal: false,
            modaledit: false,
        }
    }


    async componentDidMount() {

        this.props.dispatch(getAdminUser())
        // const {data} = await axios.get(APP_URL.concat('items/page?page=1&limits=5'))
        // this.setState({data, isFetched:!this.state.isFetched})
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    edit = (id, username, rule) => {
        this.setState({
            modaledit: !this.state.modaledit,
            username: username,
            rule: rule,
            id: id
        })
    }

    post = async () => {
        const data = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.dispatch(postAdminUser(data))
        this.toggle()
        this.componentDidMount()
    }

    delete = async (id) => {
        const a = window.confirm('Are You Sure?')
        if (a) {
            this.props.dispatch(deleteAdminUser(id))
            this.componentDidMount()
        }
    }

    put = async (id) => {
        const data = {
            username: this.state.username,
            role_id: this.state.rule
        }
        this.props.dispatch(putAdminUser(id, data))
        this.edit()
        this.componentDidMount()
    }

    render() {
        console.log(this.props.users.data)
        // let { name, user_id, description, longtitude, latitude } = this.state;
        // const { isFetched, data } = this.state;
        return (
            <Col md={9} lg={9} xl={9} className="aside sidebar d-none d-sm-block mt-4">
                <div className="card p-4" style={{ borderRadius: '25px' }}>
                    < div className="content" >
                        {this.props.users.isLoading &&
                            <div className="d-flex"
                                style={{
                                    width: '75%',
                                    position: 'fixed',
                                    left: '50%',
                                    marginLeft: '-37.5%'
                                }}>
                                <div className="spinner-border"
                                    style={{ width: '3rem; height: 3rem;' }} role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        }
                        <Row>
                            <Col>
                                <h4 className='m-2'>Users</h4>
                            </Col>
                            <Col className='mr-auto'>
                            </Col>
                            <Col>
                                <a class="btn btn-bg btn-primary btn-block text-light" onClick={() => this.toggle()}>Post</a>
                            </Col>
                        </Row>
                        <Row>

                            <Col xs="12">
                                <Card className="card-chart">

                                    <CardBody>
                                        <Table className="table" responsive>
                                            <thead className="text-primary">
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Username</th>
                                                    <th>Access</th>
                                                    <th className="text-center">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {!this.props.users.isLoading &&
                                                    this.props.users.result.map(v => (
                                                        <tr key={v.id}>
                                                            <td>
                                                                <div>{v.id}</div>
                                                            </td>
                                                            <td >
                                                                <div>{v.username}</div>
                                                            </td>
                                                            <td>
                                                                <div>{v.role}</div>
                                                            </td>
                                                            <td className="text-center">
                                                                <Button className="btn btn-warning"
                                                                    onClick={() => this.edit(v.id, v.username, v.rule)}>
                                                                    edit
                                                        </Button>{` `}
                                                                <Button className="btn btn-danger"
                                                                    onClick={() => this.delete(v.id)}>
                                                                    delete
                                                        </Button>{` `}
                                                            </td>
                                                        </tr>
                                                    ))}


                                            </tbody>
                                        </Table>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                        <Modal isOpen={this.state.modal} toggle={this.toggle}>
                            <ModalHeader toggle={this.toggle}>Post User</ModalHeader>
                            <ModalBody>
                                <form className="user" onSubmit={(e) => e.preventDefault()}>
                                    <div className="form-group mb-1">
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            className="form-control"
                                            placeholder="Username"
                                            required
                                            value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group mb-1">
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            className="form-control"
                                            placeholder="password"
                                            required
                                            value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
                                    </div>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={() => this.post()}>Post</Button>{' '}
                                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                            </ModalFooter>
                        </Modal>

                        <Modal isOpen={this.state.modaledit} toggle={this.edit}>
                            <ModalHeader toggle={this.edit}>Edit User</ModalHeader>
                            <ModalBody>
                                <form className="user" onSubmit={(e) => e.preventDefault()}>
                                    <div className="form-group mb-1">
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            className="form-control"
                                            placeholder="Name"
                                            required
                                            value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <select name="rule" className="form-control rounded-0" required
                                            value={this.state.rule} onChange={(e) => this.setState({ rule: e.target.value })}>
                                            <option value="3">User</option>
                                            <option value="2">Restaurant</option>
                                            <option value="1">Admin</option>
                                        </select>
                                    </div>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={() => this.put(this.state.id)}>Edit</Button>{' '}
                                <Button color="secondary" onClick={this.edit}>Cancel</Button>
                            </ModalFooter>
                        </Modal>


                    </div >
                </div >
            </Col >

        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps)(Cruduser)