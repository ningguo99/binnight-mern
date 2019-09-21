import React from 'react';
import MainMenu from '../components/MainMenu';
import HomeImage from '../components/HomeImage';
import SearchableMap from './SearchableMap';
import { Container, Row, Col } from 'react-bootstrap';
class App extends React.Component {
    render() {
        return (
            <Container>

                <MainMenu />

                {/* <HomeImage /> */}

                <Row>
                    <Col md={12} lg={6} >
                        <SearchableMap style={{height:"50px"}}/>
                    </Col>
                </Row>

            </Container>
        );
    }
}

export default App;