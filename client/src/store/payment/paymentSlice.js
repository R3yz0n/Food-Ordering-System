import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPaymentModalOpen: false,
  paymentMethod: null,
  paymentStatus: "idle",
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    openPaymentModal: (state) => {
      state.isPaymentModalOpen = true;
    },
    closePaymentModal: (state) => {
      state.isPaymentModalOpen = false;
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    resetPayment: (state) => {
      state.isPaymentModalOpen = false;
      state.paymentMethod = null;
      state.paymentStatus = "idle";
    },
  },
});

export const { openPaymentModal, closePaymentModal, setPaymentMethod, resetPayment } =
  paymentSlice.actions;

export default paymentSlice.reducer;
