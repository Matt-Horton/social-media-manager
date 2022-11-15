import {} from "@heroicons/react/24/outline";

export default function FacebookLoginBtn({ onClick }: { onClick: () => void }) {
  return (
    <div
      role="button"
      onClick={onClick}
      className="rounded-full px-3 py-2 bg-blue-500 w-max hover:bg-blue-400"
    >
      <p className="text-white font-semibold">Login with Facebook</p>
    </div>
  );
}
