import React from 'react';
import {connect} from 'react-redux';
import {map} from 'lodash';
import {HomepageStateToPropsBinding, HomepageDispatchToPropsBinding} from "./Homepage.bindings.jsx";

@connect(HomepageStateToPropsBinding, HomepageDispatchToPropsBinding)
export default class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addressList: []
        };
    }

    componentWillMount() {
        this.props.fetchAddressList();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            addressList: nextProps.addressList
        });
    }

    render() {
        return (
            <div>
                {
                    map(this.state.addressList, (e, index) => {
                        return <div key={index}>{e.streetName} - {index}</div>
                    })
                }
            </div>
        )
    }
}