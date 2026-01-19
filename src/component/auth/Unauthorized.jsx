import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-6xl font-bold text-red-600">403</h1>

      <p className="mt-4 text-xl font-semibold text-gray-800">
        Access Denied
      </p>

      <p className="mt-2 text-gray-600 text-center max-w-md">
        You do not have permission to access this page.
        Please contact the administrator if you believe this is a mistake.
      </p>

      <div className="mt-6 flex gap-4">
        <Link
          to="/"
          className="px-6 py-2 rounded bg-sky-600 text-white hover:bg-sky-700"
        >
          Login Again
        </Link>

        {/* <Link
          to="/login"
          className="px-6 py-2 rounded border border-gray-400 text-gray-700 hover:bg-gray-200"
        >
          Login Again
        </Link> */}
      </div>
    </div>
  );
};

export default Unauthorized;
