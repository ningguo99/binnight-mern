import React from 'react';
import HomeImage from './HomeImage';
import { Container, Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import BinSchedule from '../apis/BinSchedule';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import SearchSchedule from './SearchSchedule';

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

    render() {
        return (
            <BrowserRouter>
                <div style={{ backgroundColor: '#F8F8F8', overflow: 'auto' }}>

                    <Navbar collapseOnSelect expand="lg" className="block-example border-bottom mb-0" style={{ backgroundColor: "white" }}>
                        <Container>
                            <Navbar.Brand as={Link} to="/" style={{ color: '#ffb944', fontWeight: 'bold' }}>
                                <Image className="d-inline-block align-top"
                                    width="30"
                                    height="30"
                                    src="binnight_icon_512.png"
                                    roundedCircle
                                    style={{ marginRight: 10 }} />
                                BinNight
                                </Navbar.Brand>

                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="mr-auto">
                                    <Nav.Link eventKey="1" as={Link} to="/search-schedule">Map</Nav.Link>
                                    
                                    
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <Route path="/" exact component={(HomeImage)} />
                    <Route path="/search-schedule" component={SearchSchedule} />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;