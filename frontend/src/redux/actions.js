import axios from 'axios';
import { Types } from "./types";

// Authentication
export const loginRequest = (loginRequestInfo, setMessage, navigate) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:4000/login', loginRequestInfo);
            const user = response.data;

            // Dispatch success action with user data
            dispatch(loginSuccess(user));

            // Set a success message
            setMessage('Welcome back! Please wait...');
            
            // Navigate to the home page
            navigate('/home');

            return user; // Optional: return user data if needed
        } catch (error) {
            console.error('Error Login Request! ', error);
            setMessage('Invalid email or password'); // Set error message
        }
    };
};

export const loginSuccess = (user) => {
    return {
        type: Types.loginSuccess,
        payload: user
    }
}

export const logout = () => {
    return {
        type: Types.logout,
    }
}

// Action to get wallets and update the Redux store
export const getWallets = (userId) => {

    return async (dispatch) => {
        try {
            const response = await axios.get(`http://localhost:4000/user/${userId}/wallet`);
            const responsedWallets = response.data;

            // Dispatch the success action to update Redux state
            dispatch(getWalletsSuccess(responsedWallets));
        } catch (error) {
            console.error('Error fetching wallets:', error);
            // Optionally, dispatch an error action to handle errors
        }
    };
};

export const getWalletsSuccess = (wallets) => {
    return {
        type: Types.getWalletsSuccess,
        wallets: wallets,
    };
};

export const addWallet = (newWallet, closeForm) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:4000/wallet/add', newWallet);
            const wallet = response.data;
            
            dispatch(addWalletSuccess(wallet));
            closeForm();
        } catch (error) {
            console.error('Cannot Add Wallet:', error);
        }
    };
}

export const addWalletSuccess = (wallet) => {
    return {
        type: Types.addWalletSuccess,
        wallet: wallet,
    }
}

export const editWallet = (walletUpdateData, walletId, closeForm) => {
    return async (dispatch) => {
        try {
            const response = await axios.patch(`http://localhost:4000/wallet/update/${walletId}`, walletUpdateData);
            const updatedWallet = response.data.wallet;
            console.log('Updated Wallet Data: ', updatedWallet)
            
            dispatch(editWalletSuccess(updatedWallet));
            closeForm();
            return updatedWallet;
        } catch (error) {
            console.error('Cannot Add Wallet:', error);
        }
    };
}

export const editWalletSuccess = (updatedWallet) => {
    return {
        type: Types.editWalletSuccess,
        wallet: updatedWallet,
    }
}

export const deleteWallet = (walletId, closeForm) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`http://localhost:4000/wallet/delete/${walletId}`);
            const deletedWallet = response.data;
            console.log("deleted wallet: ", deletedWallet)
            closeForm();
        } catch (error) {
            console.error('Cannot Add Wallet:', error);
        }
    };
}