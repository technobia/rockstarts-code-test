/**
 * Created by apium on 20/05/2017.
 */
import React, {Component} from 'react';
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'

export default class Suggestion extends Component {
    constructor(props) {
        super(props);
        this.state = {address: ''};
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        geocodeByAddress(this.state.address)
            .then(results => getLatLng(results[0]))
            .then(latLng => this.props.fetchLocationFromLatLng({...latLng}))
            .then(() => this.setState({address: ''}))
            .catch(error => console.error('Error', error))
    };

    onChange = (address) => this.setState({address});

    render() {
        const inputProps = {
            value: this.state.address,
            onChange: this.onChange,
        };

        return (
            <form onSubmit={this.handleFormSubmit}>
                <PlacesAutocomplete inputProps={inputProps}/>
                <button className="btn btn-primary"
                        type="submit"
                        disabled={!this.state.address ? 'disabled' : ''}
                        style={{marginTop: 15}}>Submit</button>
            </form>
        )
    }
}