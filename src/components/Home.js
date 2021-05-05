import React from "react";
import Payment from "./Payment";

class Home extends React.Component{
    constructor(props) {
        super(props);

    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <Payment />
            </div>
        );
    }

}

export default Home;