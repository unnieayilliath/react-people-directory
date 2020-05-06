import * as React  from 'react';
import { useConstCallback } from '@uifabric/react-hooks';
import { PersonaCard } from "../PersonaCard/PersonaCard";
import { IUserProperties } from "../PersonaCard/IUserProperties";
import { SearchBox, ISearchBoxStyles } from 'office-ui-fabric-react/lib/SearchBox';
import { UserService } from '../../../services/UserService';
import { ISearchPanelProps } from './ISearchPanelProps';
import { SearchResultMapUtil } from '../../../utilities/SearchResultMapUtil';
import * as strings from 'PeopleFinderWebPartStrings';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';
import NoUsersMessage from '../NoUsersMessage/NoUsersMessage';
import { Shimmer } from 'office-ui-fabric-react';

const SearchPanel: React.FunctionComponent<ISearchPanelProps> = (props) => {
    const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: "100%" } };
    const [searchTerm, setSearchTerm] = React.useState("a");
    const [isLoading, setIsLoading] = React.useState(true);
    const onSearch=useConstCallback((newValue) => {
      if(newValue && newValue!==""){
        setSearchTerm(newValue);
      }else{
        //clear search, then show users with name starting with letter 'a'
        setSearchTerm("a");
      }
    });
    const [searchResults, setSearchResults] = React.useState([]);
    React.useEffect(() => {
        // Create an scoped async function in the hook
        async function callSearchService() {
            const userResults = await UserService.searchUsers(searchTerm.toLowerCase(),true);
            const users:IUserProperties[]=await SearchResultMapUtil.Convert_Async(userResults);
            console.log(users);
            setSearchResults(users);
            setIsLoading(false);
        }
        // Execute the created function directly
        callSearchService();
      }, [searchTerm]);
    return (
        <div>
         <SearchBox
         autoFocus={true}
         styles={searchBoxStyles}
        placeholder="Search for People"
        onChange={onSearch}
      />
          { searchResults && searchResults.length>0?
          (searchResults.map(user=> 
            <PersonaCard {...searchResults} context={props.context} profileProperties={user} />
            ))
          :(isLoading?
            <LoadingAnimation isLoaded={!isLoading} ></LoadingAnimation>
          : <NoUsersMessage message={strings.DirectoryMessage}></NoUsersMessage>
          )}
      </div>
    );
};
export default SearchPanel;