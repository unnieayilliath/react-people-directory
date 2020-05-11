import * as React  from 'react';
import { useConstCallback } from '@uifabric/react-hooks';
import { PersonaCard } from "../PersonaCard/PersonaCard";
import { IUserProperties } from "../PersonaCard/IUserProperties";
import { SearchBox, ISearchBoxStyles } from 'office-ui-fabric-react/lib/SearchBox';
import { UserService } from '../../services/UserService';
import { ISearchPanelProps } from './ISearchPanelProps';
import * as strings from 'PeopleFinderWebPartStrings';
import NoUsersMessage from '../NoUsersMessage/NoUsersMessage';
import { Shimmer, Spinner, SpinnerSize, Dropdown, IDropdownOption } from 'office-ui-fabric-react';

const SearchPanel: React.FunctionComponent<ISearchPanelProps> = (props) => {
  const orderOptions: IDropdownOption[] = [
    { key: "FirstName", text: "First Name" },
    { key: "LastName", text: "Last Name" },
    { key: "Department", text: "Department" },
    { key: "Location", text: "Location" },
    { key: "JobTitle", text: "Job Title" }
  ];
  
    const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: "100%" } };
    const [searchTerm, setSearchTerm] = React.useState("a");
    const [searchResults, setSearchResults] = React.useState([]);
    React.useEffect(() => {
        // Create an scoped async function in the hook
        async function callSearchService() {
            const users:IUserProperties[] = await UserService.searchUsers(searchTerm.toLowerCase(),true);
            setSearchResults(users);
            setIsLoading(false);
        }
        // Execute the created function directly
        callSearchService();
      }, [searchTerm]);
    const [sortBy, setSortBy] = React.useState("FirstName");
    React.useEffect(() => {
      let _users = searchResults;
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
            console.log("going default");
            break;
        }
      });
      console.log(_users);
      setSearchResults(_users);
    }, [sortBy]);
    const [isLoading, setIsLoading] = React.useState(true);
    const onSearch=useConstCallback((newValue) => {
      if(newValue && newValue!==""){
        setSearchTerm(newValue);
      }else{
        //clear search, then show users with name starting with letter 'a'
        setSearchTerm("a");
      }
    });
    const onSort=useConstCallback((ev: any, value: IDropdownOption) => {
      console.log(value);
      setSortBy(value.key.toString());
    });
    return (
        <div>
         <SearchBox
         autoFocus={true}
         styles={searchBoxStyles}
        placeholder="Search for People"
        onChange={onSearch}
      />
          { searchResults && searchResults.length>0?
            (
            <div> 
              <Dropdown
              placeholder={strings.DropDownPlaceHolderMessage}
              label={strings.DropDownPlaceLabelMessage}
              options={orderOptions}
              onChange={onSort}
              styles={{ dropdown: { width: 200 } }}
            />
            <div>
            {searchResults.map(user=> 
            <PersonaCard {...searchResults} context={props.context} 
            profileProperties={user} />
            )}
            </div>
            </div>
            )
          :(isLoading?
            <Spinner  label="Loading people..." ariaLive="assertive" labelPosition="top" size={SpinnerSize.large} />
          : <NoUsersMessage message={strings.DirectoryMessage}></NoUsersMessage>
          )}
      </div>
    );
};
export default SearchPanel;