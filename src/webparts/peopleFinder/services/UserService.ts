  
import { sp} from '@pnp/sp';
import { ISearchQuery, SearchResults, SearchQueryBuilder,SortDirection } from "@pnp/sp/search";
import { IUserProperties } from '../components/PersonaCard/IUserProperties';
import { ImageUtil } from '../utilities/ImageUtil';
import { SearchScope } from '../components/SearchScope';
export class UserService {
    public static async searchUsers(searchString: string,searchFirstName:boolean, searchScope:SearchScope):Promise<IUserProperties[]> {
      let _search=searchString.length>=3?`FirstName:${searchString}* OR LastName:${searchString}*`:(
        searchFirstName?`FirstName:${searchString}*`:`LastName:${searchString}*`
      );
      if(searchScope!==SearchScope.Name){
        _search=`${searchScope}:${searchString}*`;
      }
        const searchProperties: string[] = ["FirstName", "LastName", "PreferredName", "WorkEmail", "OfficeNumber","PictureURL", "WorkPhone", "MobilePhone", "JobTitle", "Department", "Skills", "PastProjects", "BaseOfficeLocation", "SPS-UserType","GroupId"];
        try {
          if (!searchString) return undefined;
          let users:SearchResults = await sp.search(<ISearchQuery>{
            Querytext: _search,
            RowLimit:500,
            EnableInterleaving: true,
            SelectProperties: searchProperties,
            SourceId: 'b09a7990-05ea-4af9-81ef-edfab16c4e31',
            SortList: [{ "Property": "LastName", "Direction": SortDirection.Ascending }],
          });
          return UserService.Convert_Async(users);
        } catch (error) {
          Promise.reject(error);
        }
      }

      private static async Convert_Async(users:SearchResults ):Promise<IUserProperties[]>{
        let mappedArray:IUserProperties[]=[];
        if (users && users.PrimarySearchResults && users.PrimarySearchResults.length > 0){
            for (let index=0; index < users.PrimarySearchResults.length;index++) {
            const user:any=users.PrimarySearchResults[index];
             let userProp:IUserProperties={
                DisplayName: user.PreferredName,
                LastName:user.LastName,
                FirstName:user.FirstName,
                Title: user.JobTitle,
                PictureUrl: user.PictureURL?user.PictureURL:await ImageUtil.getImageBase64(`/_layouts/15/userphoto.aspx?size=M&accountname=${user.WorkEmail}`),
                Email: user.WorkEmail,
                Department: user.Department,
                WorkPhone: user.WorkPhone,
                Location: user.OfficeNumber
                  ? user.OfficeNumber
                  : user.BaseOfficeLocation
             };
             mappedArray.push(userProp);
            }
            return mappedArray;
           }
       }
}