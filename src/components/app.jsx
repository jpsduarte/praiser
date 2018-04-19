import React, { Component } from 'react'
import Header from './shared/header'
import DownloadPresentation from './download/downloadPresentation'
import Footer from './shared/footer'

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
