import { IUserProperties } from "../components/PersonaCard/IUserProperties";

export class SortUtil{
    /**
     * This method sorts the array passed by the sort property
     * @param _users array to be sorted
     * @param sortBy property on which sorting needs to be done
     */
    public static sort(_users:IUserProperties[],sortBy:string){
        _users = _users.sort((a: any, b: any) => {
            switch (sortBy) {
              // Sorte by FirstName
              case "FirstName":
                const aFirstName = a.FirstName ? a.FirstName : "";
                const bFirstName = b.FirstName ? b.FirstName : "";
                if (aFirstName.toUpperCase() < bFirstName.toUpperCase()) {
                  return -1;
                }else if (aFirstName.toUpperCase() > bFirstName.toUpperCase()) {
                  return 1;
                }
                return 0;
              // Sort by LastName
              case "LastName":
                const aLastName = a.LastName ? a.LastName : "";
                const bLastName = b.LastName ? b.LastName : "";
                if (aLastName.toUpperCase() < bLastName.toUpperCase()) {
                  return -1;
                }else if (aLastName.toUpperCase() > bLastName.toUpperCase()) {
                  return 1;
                }
                return 0;
              // Sort by Location
              case "Location":
                const aBaseOfficeLocation = a.BaseOfficeLocation
                  ? a.BaseOfficeLocation
                  : "";
                const bBaseOfficeLocation = b.BaseOfficeLocation
                  ? b.BaseOfficeLocation
                  : "";
                if (
                  aBaseOfficeLocation.toUpperCase() <
                  bBaseOfficeLocation.toUpperCase()
                ) {
                  return -1;
                }else if (
                  aBaseOfficeLocation.toUpperCase() >
                  bBaseOfficeLocation.toUpperCase()
                ) {
                  return 1;
                }
                return 0;
                break;
              // Sort by JobTitle
              case "JobTitle":
                const aJobTitle = a.Title ? a.Title : "";
                const bJobTitle = b.Title ? b.Title : "";
                if (aJobTitle.toUpperCase() < bJobTitle.toUpperCase()) {
                  return -1;
                }else if (aJobTitle.toUpperCase() > bJobTitle.toUpperCase()) {
                  return 1;
                }
                return 0;
              // Sort by Department
              case "Department":
                const aDepartment = a.Department ? a.Department : "";
                const bDepartment = b.Department ? b.Department : "";
                if (aDepartment.toUpperCase() < bDepartment.toUpperCase()) {
                  return -1;
                }else if (aDepartment.toUpperCase() > bDepartment.toUpperCase()) {
                  return 1;
                }
                return 0;
              default:
                break;
            }
          });
    }
}