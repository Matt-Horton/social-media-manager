export default function ProfilePicture({ imageSrc }: { imageSrc: string }) {
  return (
    <img
      src={
        imageSrc ? imageSrc : require("../images/default-profile-picture.jpeg")
      }
      className="w-10 h-10 rounded-full"
      alt="Profile picture"
    />
  );
}
