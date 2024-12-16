import {apiRequest} from "../../Api/api.js";
import {UserInterface} from "../../interfaces/user-interface.ts";
import {ImageTypeEnum} from "../../enums/image-type-enum.ts";

export function userAccountService(event,
                                   user: UserInterface,
                                   type: string,
                                   callback: (result: string) => void): void {

    let reader = new FileReader();

    let myDataUrl = event.target.files[0];

    reader.onload = function () {
        const readerResult = reader.result as string;

        if (type === ImageTypeEnum.PROFILE_IMAGE) {
            user.image_categories.profile_image = readerResult;
        }

        if (type === ImageTypeEnum.COVER_IMAGE) {
            user.image_categories.cover_images.selected = readerResult;
            user.image_categories.cover_images.all_cover_images.push(readerResult);
        }

        callback(readerResult);
        apiRequest('login', user, 'PUT');
    };

    reader.readAsDataURL(myDataUrl);


}
