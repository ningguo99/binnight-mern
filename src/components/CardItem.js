import React from 'react';
import { Card, Row, Col, Image, ListGroupItem } from 'react-bootstrap';


// Return the day of week given a date string in format 'yyyy-MM-dd'.
function getDayOfWeek(dateStr) {
    const dayIndex = new Date(dateStr).getDay();
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekday[dayIndex];
}

// Return the days left compared with today given a date string in format 'yyyy-MM-dd'.
function getDayLeft(dateStr) {
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

const CardItem = ({ binImg, binType }) => {
    return (
        <ListGroupItem>
            <Row style={{ display: 'flex', alignItems: 'center' }}>
                <Col xs={2} className='img-col'>
                    <Image
                        width="40"
                        src={binImg} />
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
                                <b>{getDayOfWeek(binType)}
                                    <span>&nbsp;</span>
                                    {binType}</b>
                            </Card.Text>
                        </Col>
                        <Col className='col-day-left'>
                            <div className='day-left' style={{ float: 'right' }}>
                                {getDayLeft(binType)}
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </ListGroupItem>
    );
}

export default CardItem;