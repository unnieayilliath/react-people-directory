import * as React  from 'react';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { useConstCallback } from '@uifabric/react-hooks';
import { PersonaCard } from "../PersonaCard/PersonaCard";
import { IUserProperties } from "../PersonaCard/IUserProperties";
import { SearchBox, ISearchBoxStyles } from 'office-ui-fabric-react/lib/SearchBox';
import {PrimaryButton,IIconProps, Icon, Label } from 'office-ui-fabric-react';
import { UserService } from '../../../services/UserService';
import { ISearchPanelProps } from './ISearchPanelProps';
import { ImageUtil } from '../../../utilities/ImageUtil';
import { SearchResultMapUtil } from '../../../utilities/SearchResultMapUtil';
import * as strings from 'PeopleFinderWebPartStrings';
import styles from '../PeopleFinder.module.scss';
const SearchPanel: React.FunctionComponent<ISearchPanelProps> = (props) => {
    const searchUserIcon: IIconProps = { iconName: 'ProfileSearch' };
    const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: "100%" } };
    const [isOpen, setIsOpen] = React.useState(false);
    const openPanel = useConstCallback(() =>{
      setIsOpen(true);
      if(searchResults.length===0){
        setSearchTerm("a");
      }
    });
    const dismissPanel = useConstCallback(() => setIsOpen(false));
    const [searchTerm, setSearchTerm] = React.useState("");
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
      }
            // Execute the created function directly
            callSearchService();
      }, [searchTerm]);
    return (
        <div>
       <PrimaryButton iconProps={searchUserIcon} text="Search People" onClick={openPanel} />
        <Panel
        type={PanelType.large}
        headerText="People Finder"
        isOpen={isOpen}
        onDismiss={dismissPanel}
        // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
        closeButtonAriaLabel="Close">
         <SearchBox
         autoFocus={true}
         styles={searchBoxStyles}
        placeholder="Search for People"
        onChange={onSearch}
      />
        
          { searchResults && searchResults.length>0?
          (searchResults.map(user=> 
            <PersonaCard context={props.context} profileProperties={user} />
            ))
          :(
              <div className={styles.noUsers}>
                <Icon
                  iconName={"ProfileSearch"}
                  style={{ fontSize: "54px"}}
                />
                <Label>
                  <span style={{ marginLeft: 5, fontSize: "26px" }}>
                    {strings.DirectoryMessage}
                  </span>
                </Label>
              </div>
            )
          }
      </Panel>
      </div>
    );
};
export default SearchPanel;