import { useAppSelector, useAppDispatch } from "src/store/hooks";
import type { Company } from "src/types/company";
import {
  toggleIsActive,
  toggleAll,
  editCompany,
  addCompany,
  removeCompanies,
} from "src/store/companies";
import { Employee } from "src/types/employee";

const CompaniesModule = () => {
  const dispatch = useAppDispatch();
  const companies = useAppSelector((state) => state.companies.list);
  const employees: Employee[] = useAppSelector((state) => state.employees.list);
  const activeCompaniesIds = useAppSelector(
    (state) => state.companies.activeCompaniesIds
  );

  const getEmployeesNum = (companyId: number) => {
    return employees.filter((employee) => employee.companyId === companyId)
      .length;
  };

  const handleDelete = () => {
    dispatch(removeCompanies(activeCompaniesIds))
    activeCompaniesIds.forEach(id => dispatch(toggleIsActive(id)))
  }

  return (
    <div>
      <div>
        <button onClick={() => dispatch(addCompany())}>Добавить</button>
        <button
          onClick={handleDelete}
          disabled={!activeCompaniesIds.length}
        >
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
                checked={activeCompaniesIds.length === companies.length}
              />
            </th>
            <th>
              Название<br></br>компании
            </th>
            <th>
              Кол-во<br></br>сотрудников
            </th>
            <th>Адрес</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company: Company) => (
            <tr
              key={company.id}
              className={`${
                activeCompaniesIds.includes(company.id) ? "active" : ""
              }`}
            >
              <td onClick={() => dispatch(toggleIsActive(company.id))}>
                <input
                  readOnly
                  type="checkbox"
                  checked={activeCompaniesIds.includes(company.id)}
                />
              </td>
              <td>
                <input
                  placeholder="Название"
                  type="text"
                  value={company.title}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch(editCompany({ ...company, title: e.target.value }))
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={getEmployeesNum(company.id)}
                  readOnly
                  disabled
                />
              </td>
              <td>
                <input
                  placeholder="Адрес"
                  type="text"
                  value={company.address}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch(
                      editCompany({ ...company, address: e.target.value })
                    )
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

export default CompaniesModule;
