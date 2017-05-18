import {fetchAddressList, createAddressRow} from './services/Address.service';
import {reset} from 'redux-form';

export const HomepageStateToPropsBinding = (state) => {
    return {
        addressList: state.homepage.addressList
    }
};

export const HomepageDispatchToPropsBinding = (dispatch, ownProps) => ({
    fetchAddressList: () => fetchAddressList().then(dispatch),
    createAddressRow: (values) => createAddressRow(values).then(dispatch)
});