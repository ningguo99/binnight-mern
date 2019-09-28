import React from 'react';
import CardItem from './CardItem';
import { Card, ListGroup } from 'react-bootstrap';
import './ScheduleInfo.css';

const ScheduleInfo = ({ rubNext, recNext, grnNext }) => {
    let scheduleListGroup;
    const scheduleItems = [];

    // Push card item into Array if any.
    if (rubNext !== '') {
        scheduleItems.push(<CardItem binImg="red_bin.png" binType={rubNext} />);
    }
    if (recNext !== '') {
        scheduleItems.push(<CardItem binImg="yellow_bin.png" binType={recNext} />);
    }
    if (grnNext !== '') {
        scheduleItems.push(<CardItem binImg="green_bin.png" binType={grnNext} />);
    }

    // If there is any schedule, show and fillin the card list.
    if (scheduleItems.length > 0) {
        scheduleListGroup = (
            <Card >
                <Card.Header className="text-center"><h5 style={{ margin: 0 }}><b>Next Bin Collection Days</b></h5></Card.Header>
                <ListGroup variant="flush">
                    {scheduleItems}
                </ListGroup>
            </Card>

        )
    }

    return (
        <div>
            {scheduleListGroup}
        </div>
    );
}

export default ScheduleInfo;