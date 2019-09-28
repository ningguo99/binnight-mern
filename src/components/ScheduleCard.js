import React from 'react';
import CardItem from './CardItem';
import { Card, ListGroup, Carousel, Button,Image } from 'react-bootstrap';
import '../css/ScheduleCard.css';
import { withRouter } from 'react-router-dom';


class ScheduleCard extends React.Component {


    
      routeChange() {
        window.open("https://play.google.com/store/apps/details?id=com.binnight.bincollectionapp",'_blank')
      }

    render() {
        let scheduleListGroup;
        const scheduleItems = [];
        if (this.props.rubNext !== '') {
            scheduleItems.push(<CardItem binImg="red_bin.png" binType={this.props.rubNext} key="rub" />);
        }
        if (this.props.recNext !== '') {
            scheduleItems.push(<CardItem binImg="yellow_bin.png" binType={this.props.recNext} key="rec" />);
        }
        if (this.props.grnNext !== '') {
            scheduleItems.push(<CardItem binImg="green_bin.png" binType={this.props.grnNext} key="grn" />);
        }

        // If there is any schedule, show and fillin the card list.
        if (scheduleItems.length > 0) {
            scheduleListGroup = (
                <Card>
                    <Card.Header className="text-center">
                        <h5 style={{ margin: 0 }}><b>Next Bin Collection Days</b></h5>
                    </Card.Header>
                    <ListGroup variant="flush">
                        {scheduleItems}
                    </ListGroup>
                </Card>
            );
        } else if (this.props.searched === false) {
            scheduleListGroup = (
                <Card style={{ marginLeft: "5vw", marginRight: '5vw' }}>
                    <Card.Body>
                        <Card.Title>
                            Search your location on the map to know the latest bin collection days.
                        </Card.Title>
                    </Card.Body>
                    <Card.Img variant="bottom" src="bin_image.jpg" />
                </Card>
            );
        } else {
            scheduleListGroup = (
                <Card style={{ marginLeft: "5vw", marginRight: '5vw' }} className="text-center">
                    <Card.Header as="h5">
                        Not Found
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>
                            Your location is not supported
                        </Card.Title>
                        <Card.Text>
                            Download BinNight at Google Play to customize your own schedule.
                        </Card.Text>
                        <Image 
                        src="google-play-badge.png" 
                        width="150px" 
                        style={{cursor:'pointer'}}
                        onClick={this.routeChange}/>
                    </Card.Body>
                </Card>
            );
        }

        return (
            <div>
                {scheduleListGroup}

                <Carousel>
                    <Carousel.Item>
                        <img
                            style={{ padding: '150px' }}
                            className="d-block w-100"
                            src="bin_image.jpg"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="bin_image.jpg"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="bin_image.jpg"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>

            </div>
        );
    }
    // Push card item into Array if any.

}

export default ScheduleCard;