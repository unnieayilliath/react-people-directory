import * as React  from 'react';
import { useConstCallback } from '@uifabric/react-hooks';
import { PersonaCard } from "../PersonaCard/PersonaCard";
import { IUserProperties } from "../PersonaCard/IUserProperties";
import { SearchBox, ISearchBoxStyles } from 'office-ui-fabric-react/lib/SearchBox';
import { UserService } from '../../services/UserService';
import { ISearchPanelProps } from './ISearchPanelProps';
import * as strings from 'PeopleFinderWebPartStrings';
import NoUsersMessage from '../NoUsersMessage/NoUsersMessage';
import { Shimmer, Spinner, SpinnerSize, Dropdown, IDropdownOption, PivotLinkFormat, Pivot, PivotItem, PivotLinkSize, TeachingBubble, IButtonProps } from 'office-ui-fabric-react';
import styles from '../PeopleFinder.module.scss';
import { SearchScope } from '../SearchScope';
import { useBoolean } from '@uifabric/react-hooks';
import { SortUtil } from '../../utilities/SortUtil';
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
    { key: "Name", text: "Name" },
    { key: "Department", text: "Department" },
    { key: "JobTitle", text: "Job Title" }
  ];
  const [searchScope, setSearchScope] = React.useState(SearchScope.Name);
     
    const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: "100%" } };
    const columnStyles: React.CSSProperties= { width: "50%" ,display:"inline-block",verticalAlign:"bottom"};
    const [searchTerm, setSearchTerm] = React.useState("a");
    const [searchResults, setSearchResults] = React.useState([]);
    React.useEffect(() => {
      setIsLoading(true);
        // Create an scoped async function in the hook
        async function callSearchService() {
            const users:IUserProperties[] = await UserService.searchUsers(searchTerm.toLowerCase(),true,searchScope);
            setSearchResults(users);
            setIsLoading(false);
        }
        // Execute the created function directly
        callSearchService();
      }, [searchTerm]);
    const [sortBy, setSortBy] = React.useState("FirstName");
    React.useEffect(() => {
      console.log("sorting by " + sortBy);
      let _users = searchResults;
      SortUtil.sort(_users,sortBy);
      console.log(_users);
      setSearchResults(_users);
    }, [sortBy]);
    const [isLoading, setIsLoading] = React.useState(true);
    const onSearch=useConstCallback((newValue:string) => {
      if(newValue && newValue!==""){
        // start searching only if there are minimum 3 chars
        if(newValue.length >= 3){
          setSearchTerm(newValue);
        }
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
    const [showBubble, setShowBubble] = React.useState(true);

    return (
        <div>
          <div id="searchBox" className={styles.row}>
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
              placeholder={"Search in: Name"}
              options={searchOptions}
              onChange={onScopeChange}
              styles={{ dropdown: { width: 200,paddingLeft:10, marginTop:10} }}
            />
          </div>
        </div>
        <div>
       { showBubble && (<TeachingBubble
          target="#searchBox"
          closeButtonAriaLabel="Close"
          onDismiss={()=>{setShowBubble(false);}}
          hasCloseIcon={true}
          headline="Search for people inside your organization">
         Search for people by typing atleast 3 letters. Change the scope to find all people in a department 
         or find people with Job Title.
        </TeachingBubble>)}
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
              label={strings.SortDropDownPlaceLabelMessage}
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