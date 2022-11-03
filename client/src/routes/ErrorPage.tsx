export default function ErrorPage() {
  return (
    <div
      id="error-page"
      className="justify-center items-center flex flex-col bg-slate-100 h-screen"
    >
      <h1 className="text-4xl text-gray-800 mb-4">Oops!</h1>
      <p className="text-1xl text-gray-600">
        Sorry, an unexpected error has occured.
      </p>
    </div>
  );
}
