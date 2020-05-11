import * as React from 'react';
import styles from './PeopleFinder.module.scss';
import { IPeopleFinderProps } from './IPeopleFinderProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SearchBox, ISearchBoxStyles } from 'office-ui-fabric-react/lib/SearchBox';
import  SearchPanel from './SearchPanel/SearchPanel';
import { PrimaryButton, IIconProps, Panel, PanelType } from 'office-ui-fabric-react';
export default class PeopleFinder extends React.Component<IPeopleFinderProps,{openPanel:boolean}> {
  constructor(props:IPeopleFinderProps){
    super(props);
    this.state={
      openPanel:false
    };
  }
  public render(): React.ReactElement<IPeopleFinderProps> {
    
    const searchUserIcon: IIconProps = { iconName: 'ProfileSearch' };
    return (
      <div>
       <PrimaryButton iconProps={searchUserIcon} text="Search People" onClick={evt=>this.setState({openPanel:true})} />
       <Panel
       isLightDismiss
        type={PanelType.large}
        headerText="People Finder"
        isOpen={this.state.openPanel}
        // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
        closeButtonAriaLabel="Close">
         <SearchPanel context={this.props.context}></SearchPanel>
        </Panel>
      </div>
    );
  }
}
