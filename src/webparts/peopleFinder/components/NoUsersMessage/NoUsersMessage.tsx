import * as React  from 'react';
import {Icon, Label } from 'office-ui-fabric-react';
import styles from '../PeopleFinder.module.scss';
const NoUsersMessage: React.FunctionComponent<{message:string}> = (props) => {
    return (
              <div className={styles.noUsers}>
                <Icon
                  iconName={"ProfileSearch"}
                  style={{ fontSize: "54px"}}
                />
                <Label>
                  <span style={{ marginLeft: 5, fontSize: "26px" }}>
                    {props.message}
                  </span>
                </Label>
              </div>
    );
};
export default NoUsersMessage;