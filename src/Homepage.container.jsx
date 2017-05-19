import React from 'react';
import {connect} from 'react-redux';
import {map, keys} from 'lodash';
import {HomepageStateToPropsBinding, HomepageDispatchToPropsBinding} from "./Homepage.bindings.jsx";
import AddressForm from './components/AddressForm.component.jsx';
import AddressList from './components/AddressList.component.jsx';
import GoogleMap from './components/GoogleMap.component';
import Suggestion from './components/Suggestion.component';
import {forEach, some} from 'lodash';

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
            formData: this.decorateLocation(nextProps.locationData)
        });
    }

    submit(values) {
        this.props.createAddressRow(values).then(resp => {
            if (resp.success) this.props.fetchAddressList()
        });
    };

    decorateLocation(locationData) {
        let result = {
            streetName: '',
            ward: '',
            district: '',
            city: '',
            country: ''
        };
        !!locationData && forEach(locationData[0].address_components, (e) => {
            if (some(e.types, (text) => text === 'street_number')) {
                result.streetName += e.long_name;
            }
            if (some(e.types, (text) => text === 'route')) {
                result.streetName += ' ' + e.long_name;
            }
            if (some(e.types, (text) => text === 'sublocality_level_1')) {
                result.ward += ' ' + e.long_name;
            }
            if (some(e.types, (text) => text === 'administrative_area_level_2')) {
                result.district += ' ' + e.long_name;
            }
            if (some(e.types, (text) => text === 'administrative_area_level_1')) {
                result.city += ' ' + e.long_name;
            }
            if (some(e.types, (text) => text === 'country')) {
                result.country += ' ' + e.long_name;
            }
        });
        return result;
    }

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

                        <div className="panel panel-default" style={{marginTop: 15}}>
                            <div className="panel-heading">Add address with suggestion</div>

                            <div className="panel-body clearfix">
                                <Suggestion fetchLocationFromLatLng={this.props.fetchLocationFromLatLng}/>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <GoogleMap fetchLocationFromLatLng={this.props.fetchLocationFromLatLng}/>
                    </div>
                </div>

                <AddressList addressList={this.state.addressList} onRemove={::this.remove}/>
            </div>
        )
    }
}