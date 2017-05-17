import React from 'react';
import {connect} from 'react-redux';
import {HomepageStateToPropsBinding, HomepageDispatchToPropsBinding} from "./Homepage.bindings.jsx";

@connect(HomepageStateToPropsBinding, HomepageDispatchToPropsBinding)
export default class Homepage extends React.Component {

    render() {
        return (
            <div>
                hello world
            </div>
        )
    }
}