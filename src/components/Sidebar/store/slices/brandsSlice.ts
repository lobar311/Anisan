import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Brand {
  id: number;
  name: string;
  image: string;
  description?: string;
}

interface BrandsState {
  brands: Brand[];
}

const initialState: BrandsState = {
  brands: [
    {
      id: 1,
      name: "Fantastika",
      image:
        "https://w0.peakpx.com/wallpaper/300/309/HD-wallpaper-asta-black-clover-demon.jpg",
      description:
        "Fantastika janri o'ziga xos va ixtiroiy elementlarni o'z ichiga olgan hikoyalar va filmlarni o'z ichiga oladi.",
    },
    {
      id: 2,
      name: "Urush",
      image:
        "https://img.freepik.com/free-photo/anime-style-boy-girl-couple_23-2151451571.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1725235200&semt=ais_hybrid",
      description:
        "Urush janri tarixiy voqealar va urushlarning hikoyalarini tasvirlaydi, janglar va strategiyalarni o'z ichiga oladi.",
    },
    {
      id: 3,
      name: "Jangari",
      image:
        "https://i.pinimg.com/originals/79/a3/ef/79a3efea8d8e23985a41c6c626873478.jpg",
      description:
        "Jangari janr aksiyalar va janglar bilan to'ldirilgan, tezkor harakat va qiziqarli sarguzashtlarni o'z ichiga oladi.",
    },
  ],
};

const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    deleteBrand: (state, action: PayloadAction<number>) => {
      state.brands = state.brands.filter(
        (brand) => brand.id !== action.payload
      );
    },
    editBrand: (state, action: PayloadAction<Brand>) => {
      const index = state.brands.findIndex(
        (brand) => brand.id === action.payload.id
      );
      if (index !== -1) {
        state.brands[index] = action.payload;
      }
    },
    addBrand: (state, action: PayloadAction<Brand>) => {
      state.brands.push(action.payload);
    },
  },
});

export const { deleteBrand, editBrand, addBrand } = brandsSlice.actions;
export default brandsSlice.reducer;
