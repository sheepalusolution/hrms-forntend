{/* Loading Logo Component */}
import logo from "../assets/logo/logo.png";

const LogoLoading = ({ src = logo, size = 16 }) => {
  return (
    <div className="flex justify-center items-center">
      <img
        src={src}
        alt="Loading..."
        className="w-24 h-auto animate-pulse-logo"
      />
      <style jsx>{`
        @keyframes pulse-logo {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.15); opacity: 0.65; }
        }
        .animate-pulse-logo {
          animation: pulse-logo 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LogoLoading;
