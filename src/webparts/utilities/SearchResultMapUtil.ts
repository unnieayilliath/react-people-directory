import { ImageUtil } from "./ImageUtil";
import { SearchResults } from "@pnp/sp/search";
import { IUserProperties } from "../peopleFinder/components/PersonaCard/IUserProperties";

export class SearchResultMapUtil{
   public static async Convert_Async(users:SearchResults ):Promise<IUserProperties[]>{
    let mappedArray:IUserProperties[]=[];
    console.log(users.PrimarySearchResults);
    if (users && users.PrimarySearchResults && users.PrimarySearchResults.length > 0){
        for (let index=0; index < users.PrimarySearchResults.length;index++) {
        const user:any=users.PrimarySearchResults[index];
         let userProp:IUserProperties={
            DisplayName: user.PreferredName,
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