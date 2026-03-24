import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isPaymentModalOpen: false,
    isTransactionModalOpen: false,
    isTransactionSelectionModalOpen: false,
    isTransactionConfirmationModalOpen: false,
    isStripePaymentModalOpen: false,
    paymentMethod: null,
    paymentStatus: "idle",
};

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        setPaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
        },
        resetPayment: (state) => {
            state.isPaymentModalOpen = false;
            state.paymentMethod = null;
            state.paymentStatus = "idle";
        },

        openTransactionSelectionModal: (state) => {
            state.isTransactionSelectionModalOpen = true;
        },
        closeTransactionSelectionModal: (state) => {
            state.isTransactionSelectionModalOpen = false;
        },
        openTransactionConfirmationModal: (state) => {
            state.isTransactionConfirmationModalOpen = true;
        },
        closeTransactionConfirmationModal: (state) => {
            state.isTransactionConfirmationModalOpen = false;
        },
        openStripePaymentModal: (state) => {
            state.isStripePaymentModalOpen = true;
        },
        closeStripePaymentModal: (state) => {
            state.isStripePaymentModalOpen = false;
        },
    },
});

export const {
    setPaymentMethod,
    resetPayment,

    // Export the new actions
    openTransactionSelectionModal,
    closeTransactionSelectionModal,
    openTransactionConfirmationModal,
    closeTransactionConfirmationModal,
    openStripePaymentModal,
    closeStripePaymentModal,
} = paymentSlice.actions;

export default paymentSlice.reducer;
