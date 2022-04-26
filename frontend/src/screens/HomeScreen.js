import React, {useState, useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'
import Product from "../components/Product";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from '../actions/productActions'
import Loader from "../components/Loader";
import Message from "../components/Message";

function HomeScreen() {
    const dispatch = useDispatch()


    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList

    useEffect(() => {
        dispatch(listProducts())

    }, [dispatch])


    return (
        <div>

            <h1>Arafat Products</h1>

            {loading ? <Loader/>
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={9} md={4} lg={3} xl={4}>

                                <Product product={product}/>

                            </Col>


                        ))}
                    </Row>

            }


        </div>
    );
}

export default HomeScreen;