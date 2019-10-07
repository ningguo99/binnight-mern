import React from 'react';
import CardItem from './CardItem';
import { Card, ListGroup, Image, Spinner } from 'react-bootstrap';
import './ScheduleCard.css';


class ScheduleCard extends React.Component {

    state = { rubNext: '', recNext: '', grnNext: '' };

    /**
     * Open a new tab and redirect the user to BinNight on Google Play.
     */
    routeChange() {
        window.open("https://play.google.com/store/apps/details?id=com.binnight.bincollectionapp", '_blank')
    }

    renderContent() {
        const scheduleItems = [];

        // Push card items to Array if any.
        if (this.props.rubNext.length > 0) {
            scheduleItems.push(<CardItem binImg="red_bin.png" binType={this.props.rubNext} key="rub" />);
        }
        if (this.props.recNext.length > 0) {
            scheduleItems.push(<CardItem binImg="yellow_bin.png" binType={this.props.recNext} key="rec" />);
        }
        if (this.props.grnNext.length > 0) {
            scheduleItems.push(<CardItem binImg="green_bin.png" binType={this.props.grnNext} key="grn" />);
        }

        // If waiting for API result, show the Loading spinner
        if (this.props.waiting === true) {
            return (
                <Card style={{ marginLeft: "5vw", marginRight: '5vw' }}>

                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </Card>
            );
        }
        // Else if there is any schedule, show and fill in the schedule card.
        else if (scheduleItems.length > 0) {
            return (
                <Card className="entire-card">
                    <Card.Header as="h5" className="text-center">
                        <b>Next Bin Collection Days</b>
                    </Card.Header>
                    <ListGroup variant="flush">
                        {scheduleItems}
                        {/* <ListGroupItem>
                            Want to get reminded before bin day?
                            <Image
                        src="google-play-badge.png"
                        width="150px"
                        style={{ cursor: 'pointer' }}
                        onClick={this.routeChange} />
                        </ListGroupItem> */}
                    </ListGroup>
                </Card>
            );
        }
        // Else if the user has not searched any location, show the hint card.
        else if (this.props.searched === false) {
            return (
                <Card style={{ marginLeft: "5vw", marginRight: '5vw' }}>

                    <Card.Header as="h5" className="text-center">
                        <b>
                            Search your location on the map to know the latest bin collection days.
                        </b>
                    </Card.Header>
                    <Card.Img variant="bottom" src="bin_image.jpg" height='200vh' />
                </Card>
            );
        }
        // Else show the card telling user the location is not currently supported.
        return (
            <Card style={{ marginLeft: "5vw", marginRight: '5vw' }} className="text-center">
                <Card.Header as="h5">
                    <b>Not Found</b>
                </Card.Header>
                <Card.Body>
                    <Card.Title>
                        Your location is not supported
                        </Card.Title>
                    <Card.Text>
                        Download BinNight at Google Play to customize your own schedule and get reminded before collection days.
                        </Card.Text>
                    <Image
                        src="google-play-badge.png"
                        width="150px"
                        style={{ cursor: 'pointer' }}
                        onClick={this.routeChange} />
                </Card.Body>
            </Card>
        );
    }

    render() {
        return (
            <div>
                {this.renderContent()}

                {/* <Carousel>
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
                </Carousel> */}

            </div>
        );
    }

}

export default ScheduleCard;