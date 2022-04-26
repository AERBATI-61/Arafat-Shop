import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {Row, Col, Image, ListGroup, Button, Card, Form, ListGroupItem} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {useDispatch, useSelector} from "react-redux";
import {listProductDetails} from "../actions/productActions";

function ProductScreen({match, history}) {
    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)

    const {loading, error, product} = productDetails

    useEffect(() => {
            dispatch(listProductDetails(match.params.id))
        }, [dispatch, match]
    )


    const addToCardHandler = () => {
        history.push(`/cart/${match.params.id}? qty=${qty}`)
    }

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'><span> - Go Back</span></Link>

            {
                loading ?
                    <Loader/>
                    : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <Row>
                            <Col md={4}>
                                <Image src={product.image} alt={product.name} fluid/>
                            </Col>

                            <Col md={3}>
                                <ListGroup variant="flush">
                                    <ListGroupItem>
                                        <h3>{product.name}</h3>
                                    </ListGroupItem>

                                    <ListGroupItem>
                                        <Rating value={product.rating} text={`${product.numReviews} reviews`}
                                                color={"#f8e825"}/>
                                    </ListGroupItem>

                                    <ListGroupItem>
                                        Price: ${product.price}
                                    </ListGroupItem>

                                    <ListGroupItem>
                                        Description: {product.description}
                                    </ListGroupItem>
                                </ListGroup>
                            </Col>


                            <Col md={3}>
                                <Card>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Price: </Col>
                                                <Col>
                                                    <strong>${product.price}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Status: </Col>
                                                <Col>
                                                    {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        {product.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>
                                                        Qtr
                                                    </Col>
                                                    <Col xs='auto' className='my-1'>
                                                        <Form.Control
                                                            as="select"
                                                            value={qty}
                                                            onChange={(e) => setQty(e.target.value)}
                                                        >
                                                            {
                                                                [...Array(product.countInStock).keys()].map((x) => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ))
                                                            }

                                                        </Form.Control>
                                                    </Col>

                                                </Row>

                                            </ListGroup.Item>
                                        )}

                                        <Button
                                            onClick={addToCardHandler}
                                            className="btn btn-success btn-block"
                                            disabled={product.countInStock === 0}
                                            type='button'>
                                            Add to Cart
                                        </Button>
                                    </ListGroup>


                                </Card>

                            </Col>
                        </Row>
                    )
            }


        </div>
    );
}

export default ProductScreen;