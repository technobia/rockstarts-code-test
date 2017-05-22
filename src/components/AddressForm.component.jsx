/**
 * Created by apium on 18/05/2017.
 */
import React, { Component } from 'react';
import { Field, reduxForm, reset } from 'redux-form';


class AddressForm extends Component {
    render() {
        const { handleSubmit, onGetCurrentLocation } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group col-md-6">
                    <label className="control-label">Street Name</label>
                    <Field name="streetName" type="text" component="input" className="form-control"/>
                </div>
                <div className="form-group col-md-6">
                    <label className="control-label">Ward</label>
                    <Field name="ward" type="text" component="input" className="form-control"/>
                </div>
                <div className="form-group col-md-6">
                    <label className="control-label">District</label>
                    <Field name="district" type="text" component="input" className="form-control"/>
                </div>
                <div className="form-group col-md-6">
                    <label className="control-label">City</label>
                    <Field name="city" type="text" component="input" className="form-control"/>
                </div>
                <div className="form-group col-md-6">
                    <label className="control-label">Country</label>
                    <Field name="country" type="text" component="input" className="form-control"/>
                </div>
                <div className="col-md-8 col-md-offset-2">
                    <div className="btn btn-success" onClick={::this.props.onGetCurrentLocation}>Get Current Location</div>
                    <button className="btn btn-primary" type="submit" style={{marginLeft: 5, width: 90}}>Add</button>
                </div>
            </form>
        )
    }
}

const afterSubmit = (result, dispatch) =>
    dispatch(reset('address'));

export default reduxForm({
    form: 'address',
    enableReinitialize: true,
    onSubmitSuccess: afterSubmit,
})(AddressForm);