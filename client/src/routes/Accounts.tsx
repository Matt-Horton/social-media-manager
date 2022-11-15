import FacebookLoginBtn from "../components/FacebookLoginBtn";

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

export default function Accounts() {
  const loginWithFacebook = () => {
    window.FB.login(
      function (response: any) {
        console.log("Facebook login response: ", response);
      },
      { scope: "instagram_basic, pages_show_list" }
    );
  };
  return (
    <div className="pt-8">
      <h1 className="text-3xl text-gray-700 font-bold pb-8 pl-4">Accounts</h1>
      <div className="bg-gray-100 p-4 rounded-3xl flex flex-row justify-between">
        <div>
          <h2 className="text-1xl text-gray-600 font-bold">Facebook Account</h2>
          <p className="text-sm text-gray-500">
            You don't have a facebook account connected
          </p>
        </div>
        <FacebookLoginBtn onClick={loginWithFacebook} />
      </div>
    </div>
  );
}
