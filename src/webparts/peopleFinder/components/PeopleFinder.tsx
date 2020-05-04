import * as React from 'react';
import styles from './PeopleFinder.module.scss';
import { IPeopleFinderProps } from './IPeopleFinderProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SearchBox, ISearchBoxStyles } from 'office-ui-fabric-react/lib/SearchBox';
import  SearchPanel from './SearchPanel/SearchPanel';
export default class PeopleFinder extends React.Component<IPeopleFinderProps, {}> {
  public render(): React.ReactElement<IPeopleFinderProps> {
    return (
      <div>
        <SearchPanel context={this.props.context}></SearchPanel>
      </div>
    );
  }
}
