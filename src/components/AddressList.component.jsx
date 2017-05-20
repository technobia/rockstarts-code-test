/**
 * Created by apium on 20/05/2017.
 */
import React, { Component } from 'react';
import {map} from 'lodash';
import AddressRow from './AddressRow.component';

export default class AddressList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {addressList, onRemove, fetchAddressList, updateAddressRow} = this.props;
        return (
            <table className="table table-bordered table-striped" style={{marginTop: 30}}>
                <colgroup>
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col style={{width: 150}}/>
                </colgroup>
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
                        return <AddressRow key={index}
                                           element={e}
                                           onRemove={onRemove}
                                           fetchAddressList={fetchAddressList}
                                           updateAddressRow={updateAddressRow}/>
                    })
                }
                </tbody>
            </table>
        )
    }
}