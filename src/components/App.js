import React from 'react';
import MainMenu from '../components/MainMenu';
import HomeImage from '../components/HomeImage';
import SearchableMap from './SearchableMap';
import { Container, Row, Col } from 'react-bootstrap';
import ScheduleInfo from '../components/ScheduleInfo';
class App extends React.Component {
    render() {
        return (
            <div style={{ backgroundColor: '#F8F8F8', height: '100%' }}>
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
                            <SearchableMap />
                        </Col>
                    </Row>
                    <ScheduleInfo></ScheduleInfo>

                </Container>
            </div>
        );
    }
}

export default App;