import {useEffect, useState} from "react";
import {apiRequest} from "../../Api/api.js";
import {UserInterface} from "../../interfaces/user-interface.ts";
import {userAccountService} from "./user-account-service.ts";
import {ImageTypeEnum} from "../../enums/image-type-enum.ts";
import {Link} from "react-router-dom";


const UserAccount = () => {
    const [file, setFile] = useState('');
    const [imageCover, setImageCover] = useState('');
    const [user, setUser] = useState<UserInterface>();

    useEffect(() => {
        (async () => {
            // setUser(await apiRequest('login'))
        })();
    }, []);

    const profileImage = user?.image_categories?.profile_image;

    // user.image_categories.cover_images.all_cover_images = [];
    // user.image_categories.cover_images.selected = "";
    // user.image_categories.profile_image = '';
    // apiRequest('login', user, 'PUT');

    if (profileImage && profileImage?.length > 0) {
        setFile(profileImage);
    }

    const profileCoverImage = user?.image_categories?.cover_images.selected;
    if (profileCoverImage && profileCoverImage?.length > 0) {
        setImageCover(profileCoverImage);
    }

    function handleChange(event) {
        if (user) {
            userAccountService(event, user,
                ImageTypeEnum.PROFILE_IMAGE,
                ((res) => {
                    setFile(res)
                }));
        }
    }

    function handleCoverImageChange(event) {
        if (user) {
            userAccountService(event,
                user,
                ImageTypeEnum.COVER_IMAGE,
                ((res) => {
                    setImageCover(res)
                }));
        }

    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden ">

                <header className="text-white p-4">
                    <div className="relative">
                        <input id="cover_img" type="file" className='invisible' onChange={handleCoverImageChange}/>
                        {imageCover ?
                            <img src={imageCover} alt="Profile Image" className="profile_coverimage" width="100"/> :
                            <p>No image available</p>}
                        <label htmlFor="img" className="profile_coverimage-label">
                            <button type="cover_img" onClick={() => document.getElementById('cover_img').click()}>Change
                                Cover
                                Image
                            </button>
                        </label>
                    </div>
                </header>

                <div className='flex items-center gap-2 user__account'>
                    <div className="relative">
                        <input id="img" type="file" className='invisible' onChange={handleChange}/>
                        {file ? <img src={file} alt="Profile Image" className="profile_image" width="100"/> :
                            <p>No image available</p>}
                        <label htmlFor="img" className="profile_image-changeimage">
                            <button type="button" onClick={() => document.getElementById('img').click()}>+</button>
                        </label>
                    </div>
                    <h3>{user?.name && user?.name}</h3>
                </div>
                <hr/>
                <div className="user__info">
                    <nav>
                        <Link to="/account/photos"
                              className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">Photos</Link>
                    </nav>
                    {/*<Outlet/>*/}
                </div>
            </div>
        </div>
    );
};

export default UserAccount;
