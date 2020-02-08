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
    getAdminItems, nextItems, postAdminItems,
    putAdminItems, deleteAdminItems, putImageAdminItems
} from '../redux/action/Items';
import { connect } from 'react-redux'

import { Link } from 'react-router-dom';
import Cookie from 'js-cookie';
import qs from 'qs';

const token = Cookie.get('token');
const role = Cookie.get('role');

const url = 'http://3.90.3.168:4000/admin/items'
const APP_URL = `http://3.90.3.168:4000/`

class Cruditem extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: {},
            isFetched: false,
            modal: false,
            modaledit: false,
            modalimage: false,
            fileImage: '',
            count: '',
            id: '',
            itemname: '',
            price: '',
            description: '',
            id_cat: '',
            category: '',
            id_resto: '',
            restaurant: ''
        }
    }


    async componentDidMount() {
        await this.props.dispatch(getAdminItems())
        this.setState({
            count: this.props.items.info.count
        })
    }
    prevButton = async () => {
        const nexturl = this.props.items.info.previus
        if (nexturl) {
            this.props.dispatch(nextItems(nexturl))
        }
    }
    nextButton = async () => {
        const nexturl = this.props.items.info.next
        if (nexturl) {
            this.props.dispatch(nextItems(nexturl))
        }
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }
    edit = (id, itemname, price, description, id_cat, id_resto) => {
        this.setState({
            modaledit: !this.state.modaledit,
            itemname: itemname,
            price: price,
            description: description,
            id_cat: id_cat,
            id_resto: id_resto,
            id: id
        })
    }
    editimage = (id, itemname, image) => {
        this.setState({
            modalimage: !this.state.modalimage,
            itemname: itemname,
            image: image,
            id: id
        })
    }


    post = async () => {
        const data = {
            itemname: this.state.itemname,
            price: this.state.price,
            description: this.state.description,
            category: this.state.category,
            restaurant_id: this.state.restaurant_id
        }
        this.props.dispatch(postAdminItems(data))
        this.toggle()
        this.componentDidMount()
    }

    delete = async (id) => {
        const a = window.confirm('Are You Sure?')
        if (a) {
            this.props.dispatch(deleteAdminItems(id))
            this.componentDidMount()
        }
    }

    put = async (id) => {
        const data = {
            itemname: this.state.itemname,
            price: this.state.price,
            description: this.state.description,
            category: this.state.category,
            restaurant_id: this.state.restaurant_id
        }
        this.props.dispatch(putAdminItems(id, data))
        this.edit()
        this.componentDidMount()
    }

    putimage = async (id) => {

        const data = new FormData()
        data.append('image', this.state.fileImage)
        console.log(this.state.fileImage)
        this.props.dispatch(putImageAdminItems(id, data))
        this.editimage()
        this.componentDidMount()
    }

    render() {
        console.log(this.props.items)
        let { id, itemname, price, description, id_cat, category, id_resto, restaurant } = this.state;
        const { isFetched, data } = this.state;
        return (
            <Col md={9} lg={9} xl={9} className="aside sidebar d-none d-sm-block mt-4">
                <div className="card p-4" style={{ borderRadius: '25px' }}>
                    < div className="content" >
                        {this.props.items.isLoading &&
                            <div className="d-flex"
                                style={{
                                    width: '75%',
                                    position: 'fixed',
                                    left: '50%',
                                    marginLeft: '-37.5%'
                                }}>
                                <div className="spinner-border"
                                    style={{ width: '3rem', height: '3rem' }} role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        }
                        <Row>
                            <Col>
                                <h4 className='m-2'>Items</h4>
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
                                        <div className='table-responsive'>
                                            <Table className="table table-sm" responsive>
                                                <thead className="text-primary">
                                                    <tr>
                                                        <th>Id</th>
                                                        <th className="text-center">Item</th>
                                                        <th className="text-center">Price</th>
                                                        <th className="text-center">Desc</th>
                                                        <th className="text-center">Category</th>
                                                        <th className="text-center">Restaurant</th>
                                                        <th className="text-center">Image</th>
                                                        <th className="text-center">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {!this.props.items.isLoading &&
                                                        this.props.items.result.map(v => (
                                                            <tr key={v.id}>
                                                                <td>
                                                                    <div>{v.id}</div>
                                                                </td>
                                                                <td >
                                                                    <div>{v.itemname}</div>
                                                                </td>
                                                                <td>
                                                                    <div>{v.price}</div>
                                                                </td>
                                                                <td>
                                                                    <div>{v.description}</div>
                                                                </td>
                                                                <td>
                                                                    <div>{v.category}</div>
                                                                </td>
                                                                <td>
                                                                    <div>{v.restaurant}</div>
                                                                </td>
                                                                <td>
                                                                    <div className='text-center'> <img src={APP_URL.concat(`image/${v.image}`)} alt={v.images}
                                                                        className='rounded-circle'
                                                                        style={{ width: "60px", height: "60px" }}

                                                                    />
                                                                        <Button className="btn btn-sm btn-warning"
                                                                            onClick={() => this.editimage(v.id, v.itemname, v.image)}
                                                                            style={{ fontSize: '8px', width: "20px", height: "10px" }}>

                                                                        </Button>{` `}
                                                                    </div>
                                                                </td>
                                                                <td className="text-center">
                                                                    <Row>

                                                                        <Col>
                                                                            <Button className="btn-sm btn-warning"
                                                                                onClick={() => this.edit(v.id, v.itemname, v.price, v.description, v.id_cat, v.id_resto)}>
                                                                                edit
                                                        </Button>{` `}
                                                                        </Col>
                                                                        <Col>
                                                                            <Button className="btn-sm btn-danger"
                                                                                onClick={() => this.delete(v.id)}>
                                                                                delete
                                                        </Button>{` `}
                                                                        </Col>
                                                                    </Row>
                                                                </td>
                                                            </tr>
                                                        ))}


                                                </tbody>

                                            </Table>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row className='m-3'>
                            <Col onClick={this.prevButton} classNameName='text-center'>
                                <Button className="btn btn-secondary btn-block" type="button">Prev</Button>
                            </Col>
                            <Col className='mr-auto'>
                                <h6>15 items from total: {this.state.count}</h6>
                            </Col>
                            <Col onClick={this.nextButton} classNameName='text-center'>
                                <Button className="btn btn-secondary btn-block" type="button">Next</Button>
                            </Col>
                        </Row>

                        <Modal isOpen={this.state.modal} toggle={this.toggle}>
                            <ModalHeader toggle={this.toggle}>Post Items</ModalHeader>
                            <ModalBody>
                                <form className="user" onSubmit={(e) => e.preventDefault()}>
                                    <div className="form-group mb-1">
                                        <input
                                            type="text"
                                            name="itemname"
                                            id="itemname"
                                            className="form-control"
                                            placeholder="Itemname"
                                            required
                                            value={this.state.itemname} onChange={(e) => this.setState({ itemname: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group mb-1">
                                        <input
                                            type="number"
                                            name="price"
                                            id="price"
                                            className="form-control"
                                            placeholder="price"
                                            required
                                            value={this.state.price} onChange={(e) => this.setState({ price: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group mb-1">
                                        <input
                                            type="text"
                                            name="description"
                                            id="description"
                                            className="form-control"
                                            placeholder="description"
                                            required
                                            value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <select name="id_cat" className="form-control rounded-0" required
                                            value={this.state.id_cat} onChange={(e) => this.setState({ category: e.target.value })}>
                                            <option value="1">Drinks</option>
                                            <option value="2">Snack</option>
                                            <option value="3">Sweets</option>
                                            <option value="4">Various Rice</option>
                                            <option value="5">Chicken and Duck</option>
                                            <option value="6">FastFood</option>
                                            <option value="7">Bread</option>
                                            <option value="8">Japan</option>
                                            <option value="9">Meetballs and Soup</option>
                                            <option value="10">Noodle</option>
                                            <option value="11">Korea</option>
                                            <option value="12">Coffee</option>
                                            <option value="13">Martabak</option>
                                            <option value="14">Pizza and Pasta</option>
                                            <option value="15">China</option>
                                            <option value="16">Satay</option>
                                            <option value="17">West</option>
                                            <option value="18">Seafood</option>
                                            <option value="19">Middle East</option>
                                            <option value="20">Thailand</option>
                                            <option value="21">India</option>
                                        </select>
                                    </div>
                                    <div className="form-group mb-1">
                                        <input
                                            type="text"
                                            name="restaurant_id"
                                            id="restaurant_id"
                                            className="form-control"
                                            placeholder="Restaurant id"
                                            required
                                            value={this.state.restaurant_id} onChange={(e) => this.setState({ restaurant_id: e.target.value })}
                                        />
                                    </div>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={() => this.post()}>Post</Button>{' '}
                                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                            </ModalFooter>
                        </Modal>

                        <Modal isOpen={this.state.modaledit} toggle={this.edit}>
                            <ModalHeader toggle={this.edit}>Edit Items</ModalHeader>
                            <ModalBody>
                                <form className="user" onSubmit={(e) => e.preventDefault()}>
                                    <div className="form-group mb-1">
                                        <input
                                            type="text"
                                            name="itemname"
                                            id="itemname"
                                            className="form-control"
                                            placeholder="Name"
                                            required
                                            value={this.state.itemname} onChange={(e) => this.setState({ itemname: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group mb-1">
                                        <input
                                            type="number"
                                            name="price"
                                            id="price"
                                            className="form-control"
                                            placeholder="Name"
                                            required
                                            value={this.state.price} onChange={(e) => this.setState({ price: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group mb-1">
                                        <input
                                            type="text"
                                            name="description"
                                            id="description"
                                            className="form-control"
                                            placeholder="Name"
                                            required
                                            value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <select name="id_cat" className="form-control rounded-0" required
                                            value={this.state.id_cat} onChange={(e) => this.setState({ category: e.target.value })}>
                                            <option value="1">Drinks</option>
                                            <option value="2">Snack</option>
                                            <option value="3">Sweets</option>
                                            <option value="4">Various Rice</option>
                                            <option value="5">Chicken and Duck</option>
                                            <option value="6">FastFood</option>
                                            <option value="7">Bread</option>
                                            <option value="8">Japan</option>
                                            <option value="9">Meetballs and Soup</option>
                                            <option value="10">Noodle</option>
                                            <option value="11">Korea</option>
                                            <option value="12">Coffee</option>
                                            <option value="13">Martabak</option>
                                            <option value="14">Pizza and Pasta</option>
                                            <option value="15">China</option>
                                            <option value="16">Satay</option>
                                            <option value="17">West</option>
                                            <option value="18">Seafood</option>
                                            <option value="19">Middle East</option>
                                            <option value="20">Thailand</option>
                                            <option value="21">India</option>
                                        </select>
                                    </div>
                                    <div className="form-group mb-1">
                                        <input
                                            type="text"
                                            name="restaurant_id"
                                            id="restaurant_id"
                                            className="form-control"
                                            placeholder="Name"
                                            required
                                            value={this.state.id_resto} onChange={(e) => this.setState({ restaurant_id: e.target.value })}
                                        />
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
                                            disabled
                                            value={this.state.itemname}
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
            </Col >
        )
    }
}

const mapStateToProps = state => {
    return {
        items: state.items
    }
}

export default connect(mapStateToProps)(Cruditem)