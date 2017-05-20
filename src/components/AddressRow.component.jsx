/**
 * Created by apium on 20/05/2017.
 */
import React, { Component } from 'react';
import {fetchLocationFromLatLng} from '../services/Google.service';
import {decorateLocation} from '../services/Location.service'

export default class AddressRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenEdit: false,
            rowData: {
                streetName: this.props.element.streetName,
                ward: this.props.element.ward,
                district: this.props.element.district,
                city: this.props.element.city,
                country: this.props.element.country
            }
        };
    }

    edit = () => this.setState({isOpenEdit: true});

    remove = (id) => this.props.onRemove(id);

    onChangeField = event => {
        this.state.rowData[event.target.name] = event.target.value;
        let rowData = this.state.rowData;
        this.setState({rowData});
    };

    onGetCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(data => {
            fetchLocationFromLatLng({lat: data.coords.latitude, lng: data.coords.longitude})
                .then(resp => decorateLocation(resp.locationData))
                .then(rowData => ::this.setState({rowData}));
        });
    };

    update = () => {
        let data = {...this.state.rowData, id: this.props.element.id};
        this.props.updateAddressRow(data).then(resp => {
            this.state.isOpenEdit = false;
            if (resp.success) this.props.fetchAddressList()
        });
    };

    render() {
        let {element} = this.props;
        let {isOpenEdit, rowData} = this.state;
        return (
            isOpenEdit ?
            <tr>
                <td>
                    <input name="streetName" type="text" value={rowData.streetName} className="form-control" onChange={::this.onChangeField}/>
                </td>
                <td>
                    <input name="ward" type="text" value={rowData.ward} className="form-control" onChange={::this.onChangeField}/>
                </td>
                <td>
                    <input name="district" type="text" value={rowData.district} className="form-control" onChange={::this.onChangeField}/>
                </td>
                <td>
                    <input name="city" type="text" value={rowData.city} className="form-control" onChange={::this.onChangeField}/>
                </td>
                <td>
                    <input name="country" type="text" value={rowData.country} className="form-control" onChange={::this.onChangeField}/>
                </td>
                <td style={{textAlign: 'center'}}>
                    <button className="btn btn-info" type="submit" onClick={::this.update}>Update</button>
                    <button className="btn btn-success" style={{marginTop: 5}} onClick={::this.onGetCurrentLocation}>Get Current Location</button>
                </td>
            </tr>
            :
            <tr>
                <td>{element.streetName}</td>
                <td>{element.ward}</td>
                <td>{element.district}</td>
                <td>{element.city}</td>
                <td>{element.country}</td>
                <td style={{textAlign: 'center'}}>
                    <button className="btn btn-danger" onClick={() => this.remove(element.id)}>Remove</button>&nbsp;
                    <button className="btn btn-primary" onClick={() => this.edit()}>Edit</button>
                </td>
            </tr>
        )
    }
}