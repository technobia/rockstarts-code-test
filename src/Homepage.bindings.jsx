import {featchAddressList} from './services/Address.service';

export const HomepageStateToPropsBinding = (state) => {
    return {
        addressList: state.addressList
    }
};

export const HomepageDispatchToPropsBinding = (dispatch, ownProps) => ({
    featchAddressList: () => featchAddressList().then(dispatch)
});