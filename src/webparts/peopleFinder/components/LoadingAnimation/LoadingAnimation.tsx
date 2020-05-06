import * as React  from 'react';
import {Shimmer, ShimmerElementsGroup, ShimmerElementType} from 'office-ui-fabric-react';
export default class LoadingAnimation extends React.Component<{isLoaded:boolean},{}>{
public render(): React.ReactElement<{isLoaded:boolean}> {
        return (
            <Shimmer customElementsGroup={this.getLoadingElements()} isDataLoaded={this.props.isLoaded}></Shimmer>
         );
    }
    private getLoadingElements(): React.ReactElement{
        return (
            <div>
          <div style={{ display: 'flex', padding:'20px 10px 10px 10px' }}>
            <ShimmerElementsGroup
              shimmerElements={[
                { type: ShimmerElementType.circle, height: 40 },
                { type: ShimmerElementType.gap, width: 16, height: 40 },
              ]}
            />
            <ShimmerElementsGroup
              flexWrap={true}
              width="100%"
              shimmerElements={[
                { type: ShimmerElementType.line, width: '100%', height: 10, verticalAlign: 'bottom' },
                { type: ShimmerElementType.line, width: '90%', height: 8 },
                { type: ShimmerElementType.gap, width: '10%', height: 20 },
              ]}
            />
          </div>
           <div style={{ display: 'flex', padding:'20px 10px 10px 10px' }}>
           <ShimmerElementsGroup
             shimmerElements={[
               { type: ShimmerElementType.circle, height: 40 },
               { type: ShimmerElementType.gap, width: 16, height: 40 },
             ]}
           />
           <ShimmerElementsGroup
             flexWrap={true}
             width="100%"
             shimmerElements={[
               { type: ShimmerElementType.line, width: '100%', height: 10, verticalAlign: 'bottom' },
               { type: ShimmerElementType.line, width: '90%', height: 8 },
               { type: ShimmerElementType.gap, width: '10%', height: 20 },
             ]}
           />
         </div>
         </div>
        );
      }
}