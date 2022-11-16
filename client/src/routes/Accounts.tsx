import FacebookLoginBtn from "../components/FacebookLoginBtn";
import { useSocialAccountsContext } from "../context/SocialAccountsContext";
import {
  getAccountInfo,
  getFacebookPageInstagramAccount,
  getUserPages,
} from "../services/instagram-service";

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

export default function Accounts() {
  const { instagramAccount, addFacebookAccessToken, addInstagramAccountInfo } =
    useSocialAccountsContext();

  const loginWithFacebook = () => {
    window.FB.login(
      (response: any) => {
        console.log("Response: ", response);
        const accessToken = response.authResponse.accessToken;
        populateInstagramAccountInfo(accessToken);
      },
      {
        scope:
          "instagram_basic, pages_show_list, instagram_manage_insights, pages_read_engagement",
      }
    );
  };

  const populateInstagramAccountInfo = async (accessToken: string) => {
    const userPages = await getUserPages(accessToken);
    console.log("Facebook Access Token: ", accessToken);
    const pageId = userPages.data[0].id;
    const instagramAccount = await getFacebookPageInstagramAccount(
      pageId,
      accessToken
    );

    const instagramUserInfo = await getAccountInfo(
      instagramAccount.instagram_business_account.id,
      ["id", "name", "username", "profile_picture_url"],
      accessToken
    );

    addFacebookAccessToken(accessToken);
    addInstagramAccountInfo({
      id: instagramUserInfo.id,
      name: instagramUserInfo.name,
      username: instagramUserInfo.username,
      profilePictureURL: instagramUserInfo.profile_picture_url,
    });
  };

  return (
    <div className="pt-8">
      <h1 className="text-3xl text-gray-700 font-bold pb-8 pl-4">Accounts</h1>
      <div className="bg-gray-100 p-4 rounded-3xl flex flex-row justify-between items-center">
        <div>
          <h2 className="text-1xl text-gray-600 font-bold">
            Instagram Account
          </h2>
          {instagramAccount ? (
            <div className="flex flex-row items-center mt-4">
              <img
                src={instagramAccount.profilePictureURL}
                alt="Instagram profile image"
                className="w-8 h-8 rounded-xl mr-2"
              />
              <div>
                <p className="text-sm text-gray-700 font-semibold">
                  {instagramAccount.name}
                </p>
                <p className="text-sm text-gray-500">
                  @{instagramAccount.username}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              You don't have a facebook account connected
            </p>
          )}
        </div>
        <FacebookLoginBtn onClick={loginWithFacebook} />
      </div>
    </div>
  );
}
