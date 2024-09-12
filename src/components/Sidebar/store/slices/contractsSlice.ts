import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Contract {
  id: number;
  name: string;
  img: string;
  date: string;
  genre: string;
}

interface ContractsState {
  contracts: Contract[];
}

const initialState: ContractsState = {
  contracts: [
    {
      id: 1,
      name: "Inception",
      img: "https://image.winudf.com/v2/image1/Y29tLmJydWhwcm9kLndhbGxwYXBlcnJvbWFuY2Vfc2NyZWVuXzEyXzE2MDc0MzczMTZfMDk2/screen-6.jpg?fakeurl=1&type=.jpg",
      date: "11.07.2024",
      genre: "Fantastika",
    },
    {
      id: 2,
      name: "The Godfather",
      img: "https://e0.pxfuel.com/wallpapers/39/421/desktop-wallpaper-black-clover-phone-dark-smartphone.jpg",
      date: "24.03.1972",
      genre: "Jangari",
    },
  ],
};

const contractsSlice = createSlice({
  name: "contracts",
  initialState,
  reducers: {
    deleteContract: (state, action: PayloadAction<number>) => {
      state.contracts = state.contracts.filter(
        (contract) => contract.id !== action.payload
      );
    },
    editContract: (state, action: PayloadAction<Contract>) => {
      const index = state.contracts.findIndex(
        (contract) => contract.id === action.payload.id
      );
      if (index >= 0) {
        state.contracts[index] = action.payload;
      }
    },
    addContract: (state, action: PayloadAction<Contract>) => {
      state.contracts.push(action.payload);
    },
  },
});

export const { deleteContract, editContract, addContract } =
  contractsSlice.actions;
export default contractsSlice.reducer;
