/**
 * Created by apium on 20/05/2017.
 */
import React, { Component } from 'react';
import {map} from 'lodash';


export default class AddressRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {element, index, onRemove} = this.props;
        return (
            <tr key={index}>
                <td>{element.streetName}</td>
                <td>{element.ward}</td>
                <td>{element.district}</td>
                <td>{element.city}</td>
                <td>{element.country}</td>
                <td style={{textAlign: 'center'}}>
                    <button className="btn btn-danger" onClick={() => onRemove(element.id)}>Remove</button>&nbsp;
                    <button className="btn btn-primary">Edit</button>
                </td>
            </tr>
        )
    }
}