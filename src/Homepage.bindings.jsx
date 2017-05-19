import {fetchAddressList, createAddressRow} from './services/Address.service';
import {fetchLocationFromLatLng} from './services/Google.service';

export const HomepageStateToPropsBinding = (state) => {
    return {
        addressList: state.homepage.addressList,
        locationData: state.homepage.locationData
    }
};

export const HomepageDispatchToPropsBinding = (dispatch, ownProps) => ({
    fetchAddressList: () => fetchAddressList().then(dispatch),
    createAddressRow: (values) => createAddressRow(values).then(dispatch),
    fetchLocationFromLatLng: (data) => fetchLocationFromLatLng(data).then(dispatch)
});