import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ScheduleCard from './ScheduleCard';
import SearchableMap from './SearchableMap';
import BinSchedule from '../apis/BinSchedule';




class SearchSchedule extends Component {

    state = {
        rubNext: '',
        recNext: '',
        grnNext: '',
        council: '',
        missedPhone: '',
        searched: false,
        waiting: false
    };

    /**
     * Call the API and set the returned value to state when the user select a location.
     */
    onAddressSelected = async (latitude, longitude) => {
        const currentDate = new Date().toISOString().slice(0, 10);
        this.setState({ searched: true, waiting: true });

        await BinSchedule.get(`/${latitude}/${longitude}/${currentDate}`)
            .then((response) => {
                this.setState({
                    rubNext: response.data.rubNext,
                    recNext: response.data.recNext,
                    grnNext: response.data.grnNext,
                    council: response.data.council,
                    missedPhone: response.data.missed_ph
                });
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    rubNext: '',
                    recNext: '',
                    grnNext: '',
                    council: '',
                    missedPhone: ''
                });
            })
            .finally(() => {
                this.setState({ waiting: false });
            });
    };

    render() {
        return(
        <Container style={{ backgroundColor: 'white', marginTop: '30px', marginBottom: '30px' }}>
            {/* <HomeImage /> */}
            <Row>
                <Col>
                    <div>dd</div>
                </Col>
            </Row>
            <Row>
                <Col md={12} lg={6}>
                    <SearchableMap onMapResult={this.onAddressSelected} />
                </Col>
                <Col md={12} lg={6}>
                    <ScheduleCard
                        rubNext={this.state.rubNext}
                        recNext={this.state.recNext}
                        grnNext={this.state.grnNext}
                        searched={this.state.searched}
                        waiting={this.state.waiting} />
                </Col>

            </Row>
        </Container>)
    }
}

export default SearchSchedule;