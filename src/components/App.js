import React from 'react';
import MainMenu from '../components/MainMenu';
//import HomeImage from '../components/HomeImage';
import SearchableMap from './SearchableMap';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import ScheduleInfo from '../components/ScheduleInfo';
import BinSchedule from '../apis/BinSchedule';

class App extends React.Component {

    state = { rubNext: '', recNext: '', grnNext: '', council: '', missedPhone: '' }

    onAddressSelected = async (latitude, longitude) => {
        const currentDate = new Date().toISOString().slice(0, 10);
        const response = await BinSchedule.get(`/${latitude}/${longitude}/${currentDate}`);
        console.log(response.data)
        this.setState({
            rubNext: response.data.rubNext,
            recNext: response.data.recNext,
            grnNext: response.data.grnNext,
            council: response.data.council,
            missedPhone: response.data.missed_ph
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
                        <Col md={12} lg={6} >
                            <SearchableMap onMapResult={this.onAddressSelected} />
                        </Col>
                        <Col md={12} lg={6} className="d-flex flex-column">
                            <ScheduleInfo
                                rubNext={this.state.rubNext}
                                recNext={this.state.recNext}
                                grnNext={this.state.grnNext} />
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