import React from 'react';
import MainMenu from '../components/MainMenu';
//import HomeImage from '../components/HomeImage';
import SearchableMap from './SearchableMap';
import { Container, Carousel, Row, Col, Card, Image } from 'react-bootstrap';
import ScheduleCard from './ScheduleCard';
import BinSchedule from '../apis/BinSchedule';

class App extends React.Component {

    state = { rubNext: '', recNext: '', grnNext: '', council: '', missedPhone: '', searched: false }

    onAddressSelected = async (latitude, longitude) => {
        const currentDate = new Date().toISOString().slice(0, 10);
        const response = await BinSchedule.get(`/${latitude}/${longitude}/${currentDate}`)
            .then((response) => {
                this.setState({
                    rubNext: response.data.rubNext,
                    recNext: response.data.recNext,
                    grnNext: response.data.grnNext,
                    council: response.data.council,
                    missedPhone: response.data.missed_ph,
                    searched: true
                });
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    rubNext: '',
                    recNext: '',
                    grnNext: '',
                    council: '',
                    missedPhone: '',
                    searched: true
                });
            })
            .finally(() => {
                this.setState({
                    searched: true
                });
            });

        console.log(123);
        console.log(this.state.rubNext);
        console.log(this.state.searched);
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
                                searched={this.state.searched} />
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