import * as React  from 'react';
import { useConstCallback } from '@uifabric/react-hooks';
import { PersonaCard } from "../PersonaCard/PersonaCard";
import { IUserProperties } from "../PersonaCard/IUserProperties";
import { SearchBox, ISearchBoxStyles } from 'office-ui-fabric-react/lib/SearchBox';
import { UserService } from '../../services/UserService';
import { ISearchPanelProps } from './ISearchPanelProps';
import * as strings from 'PeopleFinderWebPartStrings';
import NoUsersMessage from '../NoUsersMessage/NoUsersMessage';
import { Shimmer, Spinner, SpinnerSize, Dropdown, IDropdownOption, PivotLinkFormat, Pivot, PivotItem, PivotLinkSize } from 'office-ui-fabric-react';
import styles from '../PeopleFinder.module.scss';
import { SearchScope } from '../SearchScope';

const SearchPanel: React.FunctionComponent<ISearchPanelProps> = (props) => {
  const alphabets: string[] = ["A","B","C","D","E","F","G","H","I","J",
    "K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  const orderOptions: IDropdownOption[] = [
    { key: "FirstName", text: "First Name" },
    { key: "LastName", text: "Last Name" },
    { key: "Department", text: "Department" },
    { key: "Location", text: "Location" },
    { key: "JobTitle", text: "Job Title" }
  ];
  const searchOptions: IDropdownOption[] = [
    { key: "People", text: "People" },
    { key: "Department", text: "Department" },
    { key: "JobTitle", text: "Job Title" }
  ];
  const [searchScope, setSearchScope] = React.useState(SearchScope.People);
     
    const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: "100%" } };
    const columnStyles: React.CSSProperties= { width: "50%" ,display:"inline-block",verticalAlign:"bottom"};
    const [searchTerm, setSearchTerm] = React.useState("a");
    const [searchResults, setSearchResults] = React.useState([]);
    React.useEffect(() => {
      setIsLoading(true);
        // Create an scoped async function in the hook
        async function callSearchService() {
            const users:IUserProperties[] = await UserService.searchUsers(searchTerm.toLowerCase(),searchScope);
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
            break;
        }
      });
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
      setSortBy(value.key.toString());
    });
    const onScopeChange=useConstCallback((ev: any, value: IDropdownOption) => {
      setSearchScope(SearchScope[value.key.toString()]);
    });
    const onAlphaClick=useConstCallback((item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) => {
      setSearchTerm(item.props.itemKey);
    });
    return (
        <div>
          <div className={styles.row}>
          <div style={columnStyles}>
          <SearchBox 
         autoFocus={true}
         styles={searchBoxStyles}
        placeholder="Search for People"
        onChange={onSearch}
      />
      </div>
          <div style={columnStyles}>
          <Dropdown
              placeholder={"Search in"}
              options={searchOptions}
              onChange={onScopeChange}
              styles={{ dropdown: { width: 200,paddingLeft:10, marginTop:10} }}
            />
          </div>
        </div>
        <div style={{paddingTop:10}}>
            <Pivot
              styles={{
                root: {
                  paddingLeft: 10,
                  paddingRight: 10,
                  whiteSpace: "normal",
                  textAlign: "center"
                }
              }}
              linkFormat={PivotLinkFormat.tabs}
              linkSize={PivotLinkSize.normal}
              onLinkClick={onAlphaClick}
            >
              {alphabets.map((index: string) => {
                return (
                  <PivotItem headerText={index} itemKey={index} key={index} />
                );
              })}
            </Pivot>
          </div>
       
          { searchResults && searchResults.length>0 && !isLoading?
            (
            <div> 
               <Dropdown
              placeholder={strings.SortDropDownPlaceHolderMessage}
              options={orderOptions}
              onChange={onSort}
              styles={{ dropdown: { width: 200} }}
            />
            {searchResults.map(user=> 
            <PersonaCard {...searchResults} context={props.context} 
            profileProperties={user} />
            )}
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