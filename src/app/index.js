import React from 'react';
import { render } from 'react-dom';
import { Header } from "./components/header";
import { Footer } from "./components/footer";

import { Home } from "./components/home";

class App extends React.Component {

    render() {
        return (
            <div className="container-fluid" id="page">
                <Header />
                <Home />
                <Footer />
            </div>
        );
    }

}

render(<App />, window.document.getElementById("app")) 