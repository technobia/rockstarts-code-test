import React from 'react';
import {connect} from 'react-redux';
import {map, keys} from 'lodash';
import {HomepageStateToPropsBinding, HomepageDispatchToPropsBinding} from "./Homepage.bindings.jsx";
import AddressForm from './components/AddressForm.component.jsx';

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

    submit = (values) => {
        if (keys(values).length < 5) return;
        this.props.createAddressRow(values).then(resp => {
            if (resp.success) this.props.fetchAddressList()
        });
    };

    render() {
        return (
            <div className="row" style={{marginTop: 15}}>
                <table className="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>Street Name</th>
                        <th>Ward</th>
                        <th>District</th>
                        <th>City</th>
                        <th>Country</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        map(this.state.addressList, (e, index) => {
                            return <tr key={index}>
                                <td>{e.streetName}</td>
                                <td>{e.ward}</td>
                                <td>{e.district}</td>
                                <td>{e.city}</td>
                                <td>{e.country}</td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>

                <div className="col-md-6">
                    <div className="row">
                        <div className="panel panel-default">
                            <div className="panel-heading">Add address with form</div>

                            <div className="panel-body clearfix">
                                <div className="row">
                                    <AddressForm onSubmit={this.submit} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}