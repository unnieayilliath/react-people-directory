  
import { sp} from '@pnp/sp';
import { ISearchQuery, SearchResults, SearchQueryBuilder,SortDirection } from "@pnp/sp/search";
import { PopupWindowPosition } from '@microsoft/sp-property-pane';
export class UserService {
    public static async searchUsers(searchString: string, searchFirstName:boolean) {
        const _search =  !searchFirstName ? `LastName:${searchString}*` :  `FirstName:${searchString}*` ;
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
          return users;
        } catch (error) {
          Promise.reject(error);
        }
      }
}