import { useQuery } from "@tanstack/react-query";
import { useSocialAccountsContext } from "../context/SocialAccountsContext";
import { getInsights } from "../services/instagram-service";

export default function DashboardOutlet() {
  const { instagramAccount, facebookAccessToken } = useSocialAccountsContext();

  const { data, isLoading, isError } = useQuery(["instagram-insights"], () => {
    if (instagramAccount) {
      return getInsights(
        instagramAccount?.id,
        ["impressions", "profile_views", "reach", "follower_count"],
        "day",
        facebookAccessToken
      );
    } else {
      return Promise.resolve({});
    }
  });

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
