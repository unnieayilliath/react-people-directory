import * as React from 'react';
import styles from './PeopleFinder.module.scss';
import { IPeopleFinderProps } from './IPeopleFinderProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SearchBox, ISearchBoxStyles } from 'office-ui-fabric-react/lib/SearchBox';
export default class PeopleFinder extends React.Component<IPeopleFinderProps, {}> {
  public render(): React.ReactElement<IPeopleFinderProps> {
  const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: "100%" } };
    return (
    /*   <div className={ styles.peopleFinder }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }> */
            <SearchBox
              styles={searchBoxStyles}
              placeholder="Find Staff"
              onEscape={ev => {
                console.log('Custom onEscape Called');
              }}
              onClear={ev => {
                console.log('Custom onClear Called');
              }}
            onChange={newValue => console.log('SearchBox onChange fired: ' + newValue)}
             onSearch={newValue => console.log('SearchBox onSearch fired: ' + newValue)}
  />/* 
            </div>
          </div>
        </div>
      </div> */
    );
  }
}
