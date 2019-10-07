import React from 'react';
import MainMenu from '../components/MainMenu';
//import HomeImage from '../components/HomeImage';
import SearchableMap from './SearchableMap';
import { Container, Carousel, Row, Col, Spinner } from 'react-bootstrap';
import ScheduleCard from './ScheduleCard';
import BinSchedule from '../apis/BinSchedule';
import axios from 'axios';

class App extends React.Component {

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

        await axios.get(`api/areas/${latitude}/${longitude}/${currentDate}`)
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
        return (
            <div style={{ backgroundColor: '#F8F8F8', height: '100vh' }}>
                <MainMenu />
                <Container style={{ backgroundColor: 'white', marginTop: '30px' }}>
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
                    <Row>


                    </Row>
                </Container>


            </div>
        );
    }
}

export default App;