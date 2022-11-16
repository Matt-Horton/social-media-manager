import React, { createContext, useContext, useState } from "react";

export type InstagramAccountInfo = {
  id: string;
  name: string;
  username: string;
  profilePictureURL: string;
};

type SocialAccountsContextType = {
  facebookAccessToken: string;
  instagramAccount: InstagramAccountInfo | undefined;
  addFacebookAccessToken: (accessToken: string) => void;
  addInstagramAccountInfo: (accountInfo: InstagramAccountInfo) => void;
};

const SocialAccountsContext = createContext<SocialAccountsContextType>({
  facebookAccessToken: "",
  instagramAccount: undefined,
  addFacebookAccessToken: (_accessToken) => null,
  addInstagramAccountInfo: (_accountInfo) => null,
});

export const useSocialAccountsContext = () => {
  return useContext(SocialAccountsContext);
};

export const SocialAccountsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [facebookAccessToken, setFacebookAccessToken] = useState<string>("");
  const [instagramAccount, setInstagramAccount] =
    useState<InstagramAccountInfo>();

  const addFacebookAccessToken = (accessToken: string) => {
    setFacebookAccessToken(accessToken);
  };

  const addInstagramAccountInfo = (accountInfo: InstagramAccountInfo) => {
    setInstagramAccount(accountInfo);
  };

  return (
    <SocialAccountsContext.Provider
      value={{
        facebookAccessToken,
        instagramAccount,
        addFacebookAccessToken,
        addInstagramAccountInfo,
      }}
    >
      {children}
    </SocialAccountsContext.Provider>
  );
};
