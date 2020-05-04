import * as React from 'react';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { useConstCallback } from '@uifabric/react-hooks';
import { SearchBox, ISearchBoxStyles } from 'office-ui-fabric-react/lib/SearchBox';
import {PrimaryButton,IIconProps } from 'office-ui-fabric-react';
const SearchUsers: React.FunctionComponent = () => {
    const searchUserIcon: IIconProps = { iconName: 'ProfileSearch' };
    const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: "100%" } };
    const [isOpen, setIsOpen] = React.useState(false);
    const openPanel = useConstCallback(() => setIsOpen(true));
    const dismissPanel = useConstCallback(() => setIsOpen(false));
    const onSearch=useConstCallback((newValue) => {
       setSearchTerm(newValue);
    });
    const people=["Unnie","Dennis","Unnikannan","Carlos"];
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    React.useEffect(() => {
        const results = people.filter(person =>
          person.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
        );
        setSearchResults(results);
      }, [searchTerm]);
    return (
        <div>
       <PrimaryButton iconProps={searchUserIcon} text="Search Staff" onClick={openPanel} />
        <Panel
        headerText="Search People"
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
      <ul>
         {searchResults.map(item => (
          <li>{item}</li>
        ))}
      </ul>
      </Panel>
      </div>
    );
};
export default SearchUsers;