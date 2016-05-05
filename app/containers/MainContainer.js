import React, {Component} from 'react';
import Main from '../pages/Main';
import MainIOS from '../pages/Main.ios';

class MainContainer extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Main {...this.props} />
        )
    }
}

export default MainContainer;