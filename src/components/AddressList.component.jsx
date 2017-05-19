/**
 * Created by apium on 20/05/2017.
 */
import React, { Component } from 'react';
import {map} from 'lodash';


export default class AddressList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {addressList, onRemove} = this.props;
        return (
            <table className="table table-bordered table-striped" style={{marginTop: 30}}>
                <thead>
                <tr>
                    <th>Street Name</th>
                    <th>Ward</th>
                    <th>District</th>
                    <th>City</th>
                    <th>Country</th>
                    <th>&nbsp;</th>
                </tr>
                </thead>
                <tbody>
                {
                    map(addressList, (e, index) => {
                        return <tr key={index}>
                            <td>{e.streetName}</td>
                            <td>{e.ward}</td>
                            <td>{e.district}</td>
                            <td>{e.city}</td>
                            <td>{e.country}</td>
                            <td style={{textAlign: 'center'}}>
                                <button className="btn btn-danger" onClick={() => onRemove(e.id)}>Remove</button>&nbsp;
                                <button className="btn btn-primary">Edit</button>
                            </td>
                        </tr>
                    })
                }
                </tbody>
            </table>
        )
    }
}