import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap'
class Footer extends Component {
    render() {
        return (
            <footer>
                <Container>
                    <Row>
                        <Col className="text-center py-3">
                            CopyRight &copy; Arafat_Shop
                        </Col>
                    </Row>
                </Container>
            </footer>
        );
    }
}

export default Footer;