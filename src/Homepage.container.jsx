import React from 'react';
import {connect} from 'react-redux';
import {map, keys} from 'lodash';
import {HomepageStateToPropsBinding, HomepageDispatchToPropsBinding} from "./Homepage.bindings.jsx";
import AddressForm from './components/AddressForm.component.jsx';
import AddressList from './components/AddressList.component.jsx';
import GoogleMap from './components/GoogleMap.component';
import Suggestion from './components/Suggestion.component';
import {decorateLocation} from './services/Location.service';

@connect(HomepageStateToPropsBinding, HomepageDispatchToPropsBinding)
export default class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {}
        };
    }

    componentWillMount() {
        this.props.fetchAddressList();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            addressList: nextProps.addressList,
            formData: decorateLocation(nextProps.locationData)
        });
    }

    submit(values) {
        this.props.createAddressRow(values).then(resp => {
            if (resp.success) this.props.fetchAddressList()
        });
    };

    remove(id) {
        this.props.removeAddressRow(id).then(resp => {
            if (resp.success) this.props.fetchAddressList()
        });
    }

    render() {
        return (
            <div className="row" style={{marginTop: 15}}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">Add address with form</div>

                            <div className="panel-body clearfix">
                                <div className="row">
                                    <AddressForm onSubmit={::this.submit}
                                                 initialValues={this.state.formData}/>
                                </div>
                            </div>
                        </div>

                        <div className="panel panel-info" style={{marginTop: 15}}>
                            <div className="panel-heading">Add address with suggestion</div>

                            <div className="panel-body clearfix">
                                <Suggestion fetchLocationFromLatLng={this.props.fetchLocationFromLatLng}/>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="panel panel-success">
                            <div className="panel-heading">Add address with click on google map</div>
                            <div className="panel-body">
                                <GoogleMap fetchLocationFromLatLng={this.props.fetchLocationFromLatLng}/>
                            </div>
                        </div>
                    </div>
                </div>

                <AddressList addressList={this.state.addressList}
                             updateAddressRow={::this.props.updateAddressRow}
                             fetchAddressList={::this.props.fetchAddressList}
                             onRemove={::this.remove}/>
            </div>
        )
    }
}