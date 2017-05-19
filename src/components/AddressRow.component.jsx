/**
 * Created by apium on 20/05/2017.
 */
import React, { Component } from 'react';
import {map} from 'lodash';

export default class AddressRow extends Component {
    edit = (e) => this.props.onEdit(e);

    remove = (id) => this.props.onRemove(id);

    render() {
        let {element} = this.props;
        return (
            <tr>
                <td>{element.streetName}</td>
                <td>{element.ward}</td>
                <td>{element.district}</td>
                <td>{element.city}</td>
                <td>{element.country}</td>
                <td style={{textAlign: 'center'}}>
                    <button className="btn btn-danger" onClick={() => this.remove(element.id)}>Remove</button>&nbsp;
                    <button className="btn btn-primary" onClick={() => this.edit(element)}>Edit</button>
                </td>
            </tr>
        )
    }
}