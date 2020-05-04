import * as React  from 'react';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { useConstCallback } from '@uifabric/react-hooks';
import { PersonaCard } from "../PersonaCard/PersonaCard";
import { IUserProperties } from "../PersonaCard/IUserProperties";
import { SearchBox, ISearchBoxStyles } from 'office-ui-fabric-react/lib/SearchBox';
import {PrimaryButton,IIconProps } from 'office-ui-fabric-react';
import { UserService } from '../../../services/UserService';
import { ISearchPanelProps } from './ISearchPanelProps';
import { ImageUtil } from '../../../utilities/ImageUtil';
const SearchPanel: React.FunctionComponent<ISearchPanelProps> = (props) => {
    const searchUserIcon: IIconProps = { iconName: 'ProfileSearch' };
    const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: "100%" } };
    const [isOpen, setIsOpen] = React.useState(false);
    const openPanel = useConstCallback(() => setIsOpen(true));
    const dismissPanel = useConstCallback(() => setIsOpen(false));
    const [searchTerm, setSearchTerm] = React.useState("");
    const onSearch=useConstCallback((newValue) => {
       setSearchTerm(newValue);
    });
    const [searchResults, setSearchResults] = React.useState([]);
    React.useEffect(() => {
      // Create an scoped async function in the hook
    async function callSearchService() {
      const users = await UserService.searchUsers(searchTerm.toLowerCase(),true);
      if (users && users.PrimarySearchResults.length > 0){
        for (let index = 0; index < users.PrimarySearchResults.length; index++) {
          let user:any = users.PrimarySearchResults[index]  ;
          if (user.PictureURL){
            user = { ...user, PictureURL: await ImageUtil.getImageBase64(`/_layouts/15/userphoto.aspx?size=M&accountname=${user.WorkEmail}`)};
           users.PrimarySearchResults[index]  =  user ;
          }
        }
       }
       setSearchResults(users.PrimarySearchResults);
        }
            // Execute the created function directly
            callSearchService();
      }, [searchTerm]);
    return (
        <div>
       <PrimaryButton iconProps={searchUserIcon} text="Search Staff" onClick={openPanel} />
        <Panel
        headerText="Find Staff"
        isOpen={isOpen}
        onDismiss={dismissPanel}
        // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
        closeButtonAriaLabel="Close">
         <SearchBox
         autoFocus={true}
         styles={searchBoxStyles}
        placeholder="Find Staff"
        onEscape={ev => {
          console.log('Custom onEscape Called');
        }}
        onClear={ev => {
          console.log('Custom onClear Called');
        }}
        onChange={onSearch}
      />
         {searchResults.map(user => (
            <PersonaCard
              context={props.context}
              profileProperties={{
                DisplayName: user.PreferredName,
                Title: user.JobTitle,
                PictureUrl: user.PictureURL,
                Email: user.WorkEmail,
                Department: user.Department,
                WorkPhone: user.WorkPhone,
                Location: user.OfficeNumber
                  ? user.OfficeNumber
                  : user.BaseOfficeLocation
              }}
            />
        ))}
      </Panel>
      </div>
    );
};
export default SearchPanel;