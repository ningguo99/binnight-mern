import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const ScheduleInfo = (props) => {


    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                
                <Row>
                    <Col>
                    <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                    </Col>
                    <Col>
                    <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                    </Col>
                </Row>



            </Card.Body>
        </Card>
    );
}


export default ScheduleInfo;