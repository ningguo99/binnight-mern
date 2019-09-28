import React from 'react';
import { Card, Row, Col, Image, ListGroup, ListGroupItem, Container } from 'react-bootstrap';
import './ScheduleInfo.css';

const ScheduleInfo = (props) => {

    function getDayOfWeek(dateStr) {
        const dayIndex = new Date(dateStr).getDay();
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return weekday[dayIndex];
    }

    function getDayDiff(dateStr) {
        let left;
        const diff = Math.ceil((Date.parse(new Date(dateStr)) - Date.parse(new Date())) / (24 * 60 * 60 * 1000));
        if (diff === 0) {
            return 'today';
        }
        if (diff === 1) {
            return 'tomorrow';
        }
        return 'in ' + diff + ' days';
    }


    let rubbish, recycling, green;
    if (props.rubNext !== '') {
        rubbish = (
            <ListGroupItem>
                <Row style={{ display: 'flex', alignItems: 'center' }}>
                    <Col xs={2} className='img-col'>
                        <Image
                            width="40"
                            src="red_bin.png" />
                    </Col>
                    <Col >
                        <Row>
                            <Card.Title style={{ marginBottom: 0, marginLeft: '10px', color: '#21a0ee' }}>
                                Rubbish Bin
                            </Card.Title>
                        </Row>
                        <Row style={{ display: 'block' }}>
                            <Col style={{ padding: '0' }} xs={12}>
                                <Card.Text style={{ marginLeft: '10px', float: 'left' }}>
                                    <b>{getDayOfWeek(props.rubNext)}
                                        <span>&nbsp;</span>
                                        {props.rubNext}</b>
                                </Card.Text>
                            </Col>
                            <Col className='col-day-left'>
                                <div className='day-left' style={{ float: 'right' }}>
                                    {getDayDiff(props.rubNext)}
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </ListGroupItem>
        );
    }
    if (props.recNext !== '') {
        recycling = (
            <ListGroupItem>
                <Row style={{ display: 'flex', alignItems: 'center' }}>
                    <Col xs={2} className='img-col'>
                        <Image
                            width="40"
                            src="yellow_bin.png" />
                    </Col>
                    <Col>
                        <Row>
                            <Card.Title style={{ marginBottom: 0, marginLeft: '10px', color: '#21a0ee' }}>
                                Recycling Bin
                            </Card.Title>
                        </Row>
                        <Row style={{ display: 'block' }}>
                            <Col style={{ padding: '0' }} xs={12}>
                                <Card.Text style={{ marginLeft: '10px', float: 'left' }}>
                                    <b>{getDayOfWeek(props.recNext)}
                                        <span>&nbsp;</span>
                                        {props.recNext}</b>
                                </Card.Text>
                            </Col>
                            <Col className='col-day-left'>
                                <div className='day-left' style={{ float: 'right' }}>
                                    {getDayDiff(props.recNext)}
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </ListGroupItem>
        );
    }
    if (props.grnNext !== '') {
        green = (
            <ListGroupItem>
                <Row style={{ display: 'flex', alignItems: 'center' }}>
                    <Col xs={2} className='img-col'>
                        <Image
                            width="40"
                            src="green_bin.png" />
                    </Col>
                    <Col>
                        <Row>
                            <Card.Title style={{ marginBottom: 0, marginLeft: '10px', color: '#21a0ee' }}>
                                Green/Organic Bin
                            </Card.Title>
                        </Row>
                        <Row style={{ display: 'block' }}>
                            <Col style={{ padding: '0' }} xs={12}>
                                <Card.Text style={{ marginLeft: '10px', float: 'left' }}>
                                    <b>{getDayOfWeek(props.grnNext)}
                                        <span>&nbsp;</span>
                                        {props.grnNext}</b>
                                </Card.Text>
                            </Col>
                            <Col className='col-day-left'>
                                <div className='day-left' style={{ float: 'right' }}>
                                    {getDayDiff(props.grnNext)}
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </ListGroupItem>
        );
    }

    return (
        <div>
            <Card >
                <Card.Header className="text-center"><h5 style={{ margin: 0 }}><b>Next Bin Collection Days</b></h5></Card.Header>

                <ListGroup variant="flush">
                    {rubbish}
                    {recycling}
                    {green}
                </ListGroup>
            </Card>


        </div>
    );
}


export default ScheduleInfo;