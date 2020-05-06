import * as React  from 'react';
import {Icon, Label } from 'office-ui-fabric-react';
import webpartStyles from '../PeopleFinder.module.scss';
const NoUsersMessage: React.FunctionComponent<{message:string}> = (props) => {
    return (
      <div style={{paddingTop:"10px"}}>
      <div className={webpartStyles.row}>
        <div className={webpartStyles.column} style={{textAlign:"center"}}>
        <Icon
                  iconName={"ProfileSearch"}
                  style={{ fontSize: "54px"}}
                />
        </div>
      </div>
       <div className={webpartStyles.row}>
       <div  className={webpartStyles.column} style={{textAlign:"center"}}>
       <Label>
                  <span style={{ marginLeft: 5, fontSize: "26px" }}>
                    {props.message}
                  </span>
                </Label>
       </div>
     </div>
     </div>
    );
};
export default NoUsersMessage;