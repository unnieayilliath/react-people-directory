export class ImageUtil{
    /**
   * Gets image base64
   * @param pictureUrl
   * @returns
   */
  private static getImageBase64(pictureUrl: string):Promise<string>{
        return new Promise((resolve, reject) => {
            let image = new Image();
            image.addEventListener("load", () => {
                let tempCanvas = document.createElement("canvas");
                tempCanvas.width = image.width,
                    tempCanvas.height = image.height,
                    tempCanvas.getContext("2d").drawImage(image, 0, 0);
                let base64Str;
                try {
                    base64Str = tempCanvas.toDataURL("image/png");
                } catch (e) {
                    return "";
                }
                resolve(base64Str);
            });
            image.src = pictureUrl;
        });
    }
}