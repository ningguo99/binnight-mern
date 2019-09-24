import React from 'react';
import { Card, Row, Col, Image } from 'react-bootstrap';
import './ScheduleInfo.css';

const ScheduleInfo = (props) => {


    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                
                <Row>
                    <Col>
                    <Image className="d-inline-block align-top"
                        width="30"
                        height="30"
                        src="binnight_icon_512.png"
                        roundedCircle 
                        />
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