import React from 'react';
import MainMenu from '../components/MainMenu';
import HomeImage from '../components/HomeImage';
class App extends React.Component {
    render() {
        return (
            <div className="ui container">
                <MainMenu />
                <HomeImage />
            </div>
        );
    }
}

export default App;