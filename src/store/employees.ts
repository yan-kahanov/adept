import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Employee } from "src/types/employee";

type EmployeesState = {
  list: Employee[];
  activeEmployeesIds: number[];
};

const initialState: EmployeesState = {
  list: [
    {
      id: 1,
      surname: "Брин",
      name: "Сергей",
      job: "Программист",
      companyId: 1,
    },
    {
      id: 2,
      surname: "Пейдж",
      name: "Ларри",
      job: "Программист",
      companyId: 1,
    },
    {
      id: 3,
      surname: "Цукерберг",
      name: "Марк",
      job: "Программист",
      companyId: 2,
    },
    {
      id: 4,
      surname: "Джобс",
      name: "Стив",
      job: "Программист",
      companyId: 3,
    },
    {
      id: 5,
      surname: "Возняк",
      name: "Стив",
      job: "Программист",
      companyId: 3,
    },
  ],
  activeEmployeesIds: [],
};

export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    toggleIsActive: (state, action: PayloadAction<number>) => {
      if (state.activeEmployeesIds.includes(action.payload)) {
        state.activeEmployeesIds = state.activeEmployeesIds.filter(
          (item) => item !== action.payload
        );
      } else {
        state.activeEmployeesIds = [
          ...state.activeEmployeesIds,
          action.payload,
        ];
      }
    },
    toggleAll: (state) => {
      if (state.activeEmployeesIds.length === state.list.length) {
        state.activeEmployeesIds = [];
      } else {
        state.activeEmployeesIds = state.list.map((employee) => employee.id);
      }
    },
    editEmployee(state, action: PayloadAction<Employee>) {
      state.list = state.list.map((employee) =>
        employee.id === action.payload.id ? action.payload : employee
      );
    },
    addEmployee(state, action: PayloadAction<number>) {
      state.list = [
        ...state.list,
        {
          id: new Date().getTime(),
          name: "",
          surname: "",
          job: "",
          companyId: action.payload
        },
      ];
    },
    removeEmployees(state, action: PayloadAction<number[]>) {
      state.list = state.list.filter(
        (employee) => !action.payload.includes(employee.id)
      );
    },
  },
});

export const { toggleIsActive, toggleAll, editEmployee, addEmployee, removeEmployees } =
  employeesSlice.actions;

export default employeesSlice.reducer;
