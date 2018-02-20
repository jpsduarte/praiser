import React, { Component } from 'react'
import Header from './header'
import DownloadPresentation from './downloadPresentation'
import Footer from './footer'

class App extends Component {
    render(){
        return(
            <div>
                <Header />
                <DownloadPresentation />
                <Footer />
            </div>
        )
    }
}

export default App
