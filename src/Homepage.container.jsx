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

    onGetCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(data => {
            this.props.fetchLocationFromLatLng({lat: data.coords.latitude, lng: data.coords.longitude})
                .then(resp => decorateLocation(resp.locationData))
                .then(formData => ::this.setState({formData}));
        });
    };

    onExportCSV = () => {
        this.props.fetchAddressListJson();
    };

    render() {
        let total = this.state.addressList ? this.state.addressList.length : 0;
        return (
            <div className="row">
                <div className="row" style={{position: 'relative', zIndex: 1}}>
                    <div className="col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">Add address with form <span className="text-danger"><i>(No field mandatory)</i></span></div>

                            <div className="panel-body clearfix">
                                <div className="row">
                                    <AddressForm onSubmit={::this.submit}
                                                 onGetCurrentLocation={::this.onGetCurrentLocation}
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
                            <div className="panel-heading">Add address by click on google map</div>
                            <div className="panel-body" style={{padding: 0}}>
                                <GoogleMap fetchLocationFromLatLng={this.props.fetchLocationFromLatLng}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        You have <span className="text-primary"><strong>{total}</strong></span> address in store
                        {total > 0 && <button className="btn btn-success btn-sm"
                                              style={{marginLeft: 10}}
                                              onClick={::this.onExportCSV}>Export to CSV</button>}
                    </div>
                </div>
                <div className="clearfix"></div>
                <AddressList addressList={this.state.addressList}
                             updateAddressRow={::this.props.updateAddressRow}
                             fetchAddressList={::this.props.fetchAddressList}
                             onRemove={::this.remove}/>
            </div>
        )
    }
}