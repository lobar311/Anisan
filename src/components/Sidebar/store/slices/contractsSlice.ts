import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Contract {
  id: number;
  name: string;
  img: string;
  date: string;
  genre: string;
  description: string;
}

interface ContractsState {
  contracts: Contract[];
}

const initialState: ContractsState = {
  contracts: [
    {
      id: 1,
      name: "Ezgu Niyat shifoxonasi",
      img: "https://minio.skydoc.uz/skydoc/EZGU_NIYAT_Czentralnyj_vhod_371a832cb4.jpg",
      date: "15.05.2005",
      genre: "Zamonaviy",
      description: "swqdsa",
    },
    {
      id: 2,
      name: "Eski Toshmi shifoxonasi",
      img: "https://daryo.uz/cache/2020/11/4-50-680x462.jpg",
      date: "25.05.1975",
      genre: "Zamonaviy",
      description: "swqdsa",
    },
    {
      id: 3,
      name: "Prezident shifoxonasi",
      img: "https://cdn.trt.net.tr/images/xlarge/rectangle/65c4/8c6e/da65/58943159c3c42.jpg?time=1723204371",
      date: "05.25.1975",
      genre: "Zamonaviy",
      description: "swqdsa",
    },
    {
      id: 4,
      name: "Hindiston jarrohlik shifoxonasi",
      img: "https://d1ea147o02h74h.cloudfront.net/blk_facade-1-min.jpg",
      date: "05.25.1975",
      genre: "Zamonaviy",
      description: "swqdsa",
    },
    {
      id: 5,
      name: "Bolalar shifoxonasi",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/The_Children%27s_Castle%2C_Helsinki.jpg/220px-The_Children%27s_Castle%2C_Helsinki.jpg",
      date: "05.25.1975",
      genre: "Zamonaviy",
      description: "swqdsa",
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
