export interface UserInterface {
    "id": string | number,
    "name": string,
    "email": string,
    "password": string,
    "image_categories": {
        "profile_image": string,
        "cover_images": {
            selected: string,
            all_cover_images: string []
        },
        "all_images": []
    }
}
