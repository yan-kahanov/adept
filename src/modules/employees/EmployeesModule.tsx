import type { Employee } from "src/types/employee";
import { useAppSelector, useAppDispatch } from "src/store/hooks";
import {
  toggleIsActive,
  toggleAll,
  editEmployee,
  removeEmployees,
  addEmployee,
} from "src/store/employees";

const EmployeesModule = () => {
  const dispatch = useAppDispatch();
  const employees: Employee[] = useAppSelector((state) => state.employees.list);
  const activeCompaniesIds: number[] = useAppSelector(
    (state) => state.companies.activeCompaniesIds
  );
  const activeEmployeesIds = useAppSelector(
    (state) => state.employees.activeEmployeesIds
  );
  const getFilteredEmployees = () => {
    return employees.filter((employee) =>
      activeCompaniesIds.includes(employee.companyId)
    );
  };

  const handleDelete = () => {
    dispatch(removeEmployees(activeEmployeesIds));
    activeEmployeesIds.forEach((id) => dispatch(toggleIsActive(id)));
  };

  if (!activeCompaniesIds.length) return null;
  return (
    <div>
      <div>
        <button
          onClick={() => dispatch(addEmployee(activeCompaniesIds[0]))}
          disabled={activeCompaniesIds.length !== 1}
        >
          Добавить
        </button>
        <button onClick={handleDelete} disabled={!activeEmployeesIds.length}>
          Удалить
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={() => dispatch(toggleAll())}>
              <input
                readOnly
                type="checkbox"
                checked={activeEmployeesIds.length === employees.length}
              />
            </th>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Должность</th>
          </tr>
        </thead>
        <tbody>
          {getFilteredEmployees().map((employee) => (
            <tr
              key={employee.id}
              className={`${
                activeEmployeesIds.includes(employee.id) ? "active" : ""
              }`}
            >
              <td onClick={() => dispatch(toggleIsActive(employee.id))}>
                <input
                  readOnly
                  type="checkbox"
                  checked={activeEmployeesIds.includes(employee.id)}
                />
              </td>
              <td>
                <input
                placeholder="Фамилия"
                  type="text"
                  value={employee.surname}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch(
                      editEmployee({ ...employee, surname: e.target.value })
                    )
                  }
                />
              </td>
              <td>
                <input
                placeholder="Имя"
                  type="text"
                  value={employee.name}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch(
                      editEmployee({ ...employee, name: e.target.value })
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Должность"
                  value={employee.job}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch(editEmployee({ ...employee, job: e.target.value }))
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeesModule;
