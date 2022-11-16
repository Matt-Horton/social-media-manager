export type Period = "day" | "week" | "days_28" | "lifetime";

export const getAccountInfo = async (
  instagramUserId: string,
  fields: string[],
  accessToken: string
) => {
  console.log("Getting account info with data: ", {
    instagramUserId,
    fields,
    accessToken,
  });
  const response = await fetch(
    `https://graph.facebook.com/v15.0/${instagramUserId}?fields=${fields.join(
      ","
    )}&access_token=${accessToken}`
  );
  const jsonResponse = await response.json();
  console.log("Account info", jsonResponse);
  return jsonResponse;
};

export const getUserPages = async (accessToken: string) => {
  console.log("Getting user pages with data: ", { accessToken });
  const response = await fetch(
    `https://graph.facebook.com/v15.0/me/accounts?access_token=${accessToken}`
  );
  const jsonResponse = await response.json();
  console.log("User pages: ", jsonResponse);
  return jsonResponse;
};

export const getFacebookPageInstagramAccount = async (
  pageId: number,
  accessToken: string
) => {
  console.log("Getting instagram account with data: ", { pageId, accessToken });
  const response = await fetch(
    `https://graph.facebook.com/v15.0/${pageId}?fields=instagram_business_account&access_token=${accessToken}`
  );
  const jsonResponse = await response.json();
  console.log("Instagram account: ", jsonResponse);
  return jsonResponse;
};

export const getInsights = async (
  instagramUserId: string,
  metrics: string[],
  period: Period,
  accessToken: string
) => {
  const response = await fetch(
    `https://graph.facebook.com/v15.0/${instagramUserId}/insights?metric=${metrics.join(
      ","
    )}&period=${period}&access_token=${accessToken}`
  );
  const jsonResponse = await response.json();
  return jsonResponse;
};
