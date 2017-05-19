/**
 * Created by apium on 18/05/2017.
 */
import React, { Component } from 'react';
import { Field, reduxForm, reset } from 'redux-form';


class AddressForm extends Component {
    render() {
        const { handleSubmit } = this.props;
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
                <div className="clearfix"></div>
                <div className="col-md-4 col-md-offset-4">
                    <button className="btn btn-primary" style={{width: '100%'}} type="submit">Add</button>
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