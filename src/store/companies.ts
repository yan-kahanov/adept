import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Company } from "src/types/company";

type CompaniesState = {
  list: Company[];
  activeCompaniesIds: number[];
};

const initialState: CompaniesState = {
  list: [
    {
      id: 1,
      title: "Google",
      address: "г. Москва, ул. Ленина, д. 22 ",
    },
    {
      id: 2,
      title: "Facebook",
      address: "г. Москва, ул. Ленина, д. 23 ",
    },
    {
      id: 3,
      title: "Apple",
      address: "г. Москва, ул. Ленина, д. 24 ",
    },
  ],
  activeCompaniesIds: [],
};

export const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    toggleIsActive: (state, action: PayloadAction<number>) => {
      if (state.activeCompaniesIds.includes(action.payload)) {
        state.activeCompaniesIds = state.activeCompaniesIds.filter(
          (item) => item !== action.payload
        );
      } else {
        state.activeCompaniesIds = [
          ...state.activeCompaniesIds,
          action.payload,
        ];
      }
    },
    toggleAll: (state) => {
      if (state.activeCompaniesIds.length === state.list.length) {
        state.activeCompaniesIds = [];
      } else {
        state.activeCompaniesIds = state.list.map((company) => company.id);
      }
    },
    editCompany(state, action: PayloadAction<Company>) {
      state.list = state.list.map((company) =>
        company.id === action.payload.id ? action.payload : company
      );
    },
    addCompany(state) {
      state.list = [
        ...state.list,
        {
          id: new Date().getTime(),
          title: "",
          address: "",
        },
      ];
    },
    removeCompanies(state, action: PayloadAction<number[]>) {
      state.list = state.list.filter((company) =>
        !action.payload.includes(company.id)
      );
    },
  },
});

export const { toggleIsActive, toggleAll, editCompany, addCompany, removeCompanies } =
  companiesSlice.actions;

export default companiesSlice.reducer;
