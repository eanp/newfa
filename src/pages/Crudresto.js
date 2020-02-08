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
    getAdminResto, postAdminResto,
    putAdminResto, deleteAdminResto, putImageAdminResto
} from '../redux/action/Resto';
import { connect } from 'react-redux'

import { Link } from 'react-router-dom';
import Cookie from 'js-cookie';
import qs from 'qs';

const token = Cookie.get('token');
const role = Cookie.get('role');

const url = 'http://3.90.3.168:4000/admin/resto'
const APP_URL = `http://3.90.3.168:4000/`

class Crudresto extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: {},
            isFetched: false,
            modal: false,
            modaledit: false,
            modalimage: false,
            fileImage: '',

        }
    }


    async componentDidMount() {

        await this.props.dispatch(getAdminResto())
        // const {data} = await axios.get(APP_URL.concat('items/page?page=1&limits=5'))
        // this.setState({data, isFetched:!this.state.isFetched})
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }
    edit = (id, name, user_id, description, longtitude, latitude) => {
        this.setState({
            modaledit: !this.state.modaledit,
            name: name,
            user_id: user_id,
            description: description,
            longtitude: longtitude,
            latitude: latitude,
            id: id
        })
    }
    editimage = (id, name, image) => {
        this.setState({
            modalimage: !this.state.modalimage,
            name: name,
            image: image,
            id: id
        })
    }


    post = async () => {
        const data = {
            name: this.state.name,
            user_id: this.state.user_id,
            description: this.state.description,
            longtitude: this.state.longtitude,
            latitude: this.state.latitude
        }
        this.props.dispatch(postAdminResto(data))
        this.toggle()
        this.componentDidMount()
    }

    delete = async (id) => {
        const a = window.confirm('Are You Sure?')
        if (a) {
            this.props.dispatch(deleteAdminResto(id))
            this.componentDidMount()
        }
    }

    put = async (id) => {
        const data = {
            name: this.state.name,
            user_id: this.state.user_id,
            description: this.state.description,
            longtitude: this.state.longtitude,
            latitude: this.state.latitude
        }
        this.props.dispatch(putAdminResto(id, data))
        this.edit()
        this.componentDidMount()
    }

    putimage = async (id) => {

        const data = new FormData()
        data.append('image', this.state.fileImage)
        console.log(this.state.fileImage)
        this.props.dispatch(putImageAdminResto(id, data))
        this.editimage()
        this.componentDidMount()
    }

    render() {
        console.log(this.props.resto.data)
        // let { name, user_id, description, longtitude, latitude } = this.state;
        // const { isFetched, data } = this.state;
        return (
            <Col md={9} lg={9} xl={9} className="aside sidebar d-none d-sm-block mt-4">
                <div className="card p-4" style={{ borderRadius: '25px' }}>
                    < div className="content" >
                        {this.props.resto.isLoading &&
                            <div className="d-flex">
                                <div className="spinner-border"
                                    style={{ width: '3rem', height: '3rem' }} role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        }
                        <Row>
                            <Col>
                                <h4 className='m-2'>Restaurant</h4>
                            </Col>
                            <Col className='mr-auto'>
                            </Col>
                            <Col>
                                <a class="btn btn-bg btn-primary btn-block text-light" onClick={() => this.toggle()}>Post</a>
                            </Col>
                        </Row>
                        <Row>

                            <Col xs="12">
                                <Card className="card-chart rounded mt-3">
                                    <CardBody className="rounded">
                                        <Table className="table" responsive>
                                            <thead className="text-primary">
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Name</th>
                                                    <th>User Id</th>
                                                    <th>Desc</th>
                                                    <th className="text-center">Image</th>
                                                    <th className="text-center">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody >

                                                {!this.props.resto.isLoading &&
                                                    this.props.resto.result.map(v => (
                                                        <tr key={v.id}>
                                                            <td>
                                                                <div className='text-dark'>{v.id}</div>
                                                            </td>
                                                            <td >
                                                                <div>{v.name}</div>
                                                            </td>
                                                            <td>
                                                                <div>{v.user_id}</div>
                                                            </td>
                                                            <td>
                                                                <div>{v.description}</div>
                                                            </td>
                                                            <td>
                                                                <div className='text-center'> <img src={APP_URL.concat(`image/${v.image}`)} alt={v.images}
                                                                    className='rounded-circle'
                                                                    style={{ width: "60px", height: "60px" }}

                                                                />
                                                                    <Button className="btn btn-sm btn-secondary rounded-left"
                                                                        onClick={() => this.editimage(v.id, v.name, v.image)}
                                                                        style={{ fontSize: '8px', width: "20px", height: "10px" }}>

                                                                    </Button>{` `}
                                                                </div>
                                                            </td>
                                                            <td className="text-center">
                                                                <Button className="btn btn-warning"
                                                                    onClick={() => this.edit(v.id, v.name, v.user_id, v.description, v.longtitude, v.latitude)}>
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
                            <ModalHeader toggle={this.toggle}>Post Resto</ModalHeader>
                            <ModalBody>
                                <form className="user" onSubmit={(e) => e.preventDefault()}>
                                    <div className="form-group mb-1">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="form-control"
                                            placeholder="Name"
                                            required
                                            value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group mb-1">
                                        <input
                                            type="number"
                                            name="user_id"
                                            id="user_id"
                                            className="form-control"
                                            placeholder="user_id"
                                            required
                                            value={this.state.user_id} onChange={(e) => this.setState({ user_id: e.target.value })} />
                                    </div>
                                    <div className="form-group mb-1">
                                        <input
                                            type="text"
                                            name="text"
                                            id="description"
                                            className="form-control"
                                            placeholder="description"
                                            required
                                            value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} />
                                    </div>
                                    <div className="form-group mb-1">
                                        <input
                                            type="text"
                                            name="text"
                                            id="longtitude"
                                            className="form-control"
                                            placeholder="longtitude"
                                            value={this.state.longtitude} onChange={(e) => this.setState({ longtitude: e.target.value })} />
                                    </div>
                                    <div className="form-group mb-1">
                                        <input
                                            type="text"
                                            name="text"
                                            id="latitude"
                                            className="form-control"
                                            placeholder="latitude"
                                            value={this.state.latitude} onChange={(e) => this.setState({ latitude: e.target.value })} />
                                    </div>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={() => this.post()}>Edit</Button>{' '}
                                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                            </ModalFooter>
                        </Modal>

                        <Modal isOpen={this.state.modaledit} toggle={this.edit}>
                            <ModalHeader toggle={this.edit}>Edit Resto</ModalHeader>
                            <ModalBody>
                                <form className="user" onSubmit={(e) => e.preventDefault()}>
                                    <div className="form-group mb-1">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="form-control"
                                            placeholder="Name"
                                            required
                                            value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group mb-1">
                                        <input
                                            type="number"
                                            name="user_id"
                                            id="user_id"
                                            className="form-control"
                                            placeholder="user_id"
                                            required
                                            value={this.state.user_id} onChange={(e) => this.setState({ user_id: e.target.value })} />
                                    </div>
                                    <div className="form-group mb-1">
                                        <input
                                            type="text"
                                            name="text"
                                            id="description"
                                            className="form-control"
                                            placeholder="description"
                                            required
                                            value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} />
                                    </div>
                                    <div className="form-group mb-1">
                                        <input
                                            type="text"
                                            name="text"
                                            id="longtitude"
                                            className="form-control"
                                            placeholder="longtitude"
                                            value={this.state.longtitude} onChange={(e) => this.setState({ longtitude: e.target.value })} />
                                    </div>
                                    <div className="form-group mb-1">
                                        <input
                                            type="text"
                                            name="text"
                                            id="latitude"
                                            className="form-control"
                                            placeholder="latitude"
                                            value={this.state.latitude} onChange={(e) => this.setState({ latitude: e.target.value })} />
                                    </div>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={() => this.put(this.state.id)}>Edit</Button>{' '}
                                <Button color="secondary" onClick={this.edit}>Cancel</Button>
                            </ModalFooter>
                        </Modal>

                        <Modal isOpen={this.state.modalimage} toggle={this.editimage}>
                            <ModalHeader toggle={this.editimage}>Change Image</ModalHeader>
                            <ModalBody>
                                <form className="user" onSubmit={(e) => e.preventDefault()}>
                                    <div className="form-group mb-1">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="form-control"
                                            placeholder="Name"
                                            disabled
                                            value={this.state.name}
                                        />
                                    </div>
                                    <FormGroup>
                                        <Input type="file" name="file" id="exampleFile"
                                            onChange={(e) => this.setState({ fileImage: e.target.files[0] })} />
                                        <FormText color="muted">
                                            For image file only.</FormText>
                                    </FormGroup>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={() => this.putimage(this.state.id)}>Edit</Button>{' '}
                                <Button color="secondary" onClick={this.editimage}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </div >
                </div >
            </Col>
        )
    }
}

const mapStateToProps = state => {
    return {
        resto: state.resto
    }
}

export default connect(mapStateToProps)(Crudresto)