// import OtpForm from "./OtpForm";
// import GoogleButton from "./GoogleButton";

// export default function AuthCard({
//   onLoggedIn,
//   onError,
// }: {
//   onLoggedIn: () => void;
//   onError: (m: string) => void;
// }) {
//   return (
//     <div className="grid md:grid-cols-2 gap-8 items-center">
//       <div className="hidden md:block">
//         {/* Modern abstract gradient background instead of hero image */}
//         <div className="relative w-full h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
//           {/* Animated flowing shapes */}
//           <div className="absolute inset-0">
//             <svg
//               viewBox="0 0 400 400"
//               className="w-full h-full"
//               style={{
//                 background:
//                   "radial-gradient(circle at 30% 20%, rgba(120, 119, 198, 0.3), transparent 50%), radial-gradient(circle at 80% 80%, rgba(120, 119, 198, 0.3), transparent 50%)",
//               }}
//             >
//               {/* Flowing wave shapes */}
//               <defs>
//                 <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
//                   <stop
//                     offset="0%"
//                     style={{
//                       stopColor: "rgba(59, 130, 246, 0.8)",
//                       stopOpacity: 1,
//                     }}
//                   />
//                   <stop
//                     offset="50%"
//                     style={{
//                       stopColor: "rgba(147, 51, 234, 0.8)",
//                       stopOpacity: 1,
//                     }}
//                   />
//                   <stop
//                     offset="100%"
//                     style={{
//                       stopColor: "rgba(29, 78, 216, 0.8)",
//                       stopOpacity: 1,
//                     }}
//                   />
//                 </linearGradient>
//               </defs>

//               {/* Main flowing shape */}
//               <path
//                 d="M 50,200 C 150,100 200,300 300,200 C 350,150 380,250 400,200 L 400,400 L 0,400 Z"
//                 fill="url(#grad1)"
//                 className="animate-pulse"
//               />

//               {/* Secondary flowing shape */}
//               <path
//                 d="M 0,250 C 100,200 150,350 250,250 C 300,200 350,300 400,250 L 400,400 L 0,400 Z"
//                 fill="rgba(59, 130, 246, 0.3)"
//                 className="animate-pulse"
//                 style={{ animationDelay: "1s" }}
//               />
//             </svg>
//           </div>

//           {/* Content overlay */}
//           <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8">
//             <div className="text-center">
//               <h2 className="text-3xl font-bold mb-4">Welcome to Notes</h2>
//               <p className="text-blue-100 text-lg">
//                 Organize your thoughts, capture your ideas
//               </p>
//             </div>
//           </div>

//           {/* Subtle pattern overlay */}
//           <div
//             className="absolute inset-0 opacity-10"
//             style={{
//               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//             }}
//           />
//         </div>
//       </div>

//       <div className="card">
//         <h1 className="text-2xl font-semibold mb-2">Create your account</h1>
//         <p className="text-gray-600 mb-6">
//           Sign up with email + OTP or continue with Google.
//         </p>
//         <OtpForm onLoggedIn={onLoggedIn} onError={onError} />
//         <div className="my-6 flex items-center gap-4">
//           <div className="h-px bg-gray-200 flex-1"></div>
//           <span className="text-xs text-gray-500">OR</span>
//           <div className="h-px bg-gray-200 flex-1"></div>
//         </div>
//         <GoogleButton onSuccess={onLoggedIn} onError={onError} />
//       </div>
//     </div>
//   );
// }

import OtpForm from "./OtpForm";
import GoogleButton from "./GoogleButton";
import { useState } from "react";

export default function AuthCard({
  onLoggedIn,
  onError,
}: {
  onLoggedIn: () => void;
  onError: (m: string) => void;
}) {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div className="hidden md:block">
        <div className="relative w-full h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
          <div className="absolute inset-0">
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full"
              style={{
                background:
                  "radial-gradient(circle at 30% 20%, rgba(120, 119, 198, 0.3), transparent 50%), radial-gradient(circle at 80% 80%, rgba(120, 119, 198, 0.3), transparent 50%)",
              }}
            >
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop
                    offset="0%"
                    style={{
                      stopColor: "rgba(59, 130, 246, 0.8)",
                      stopOpacity: 1,
                    }}
                  />
                  <stop
                    offset="50%"
                    style={{
                      stopColor: "rgba(147, 51, 234, 0.8)",
                      stopOpacity: 1,
                    }}
                  />
                  <stop
                    offset="100%"
                    style={{
                      stopColor: "rgba(29, 78, 216, 0.8)",
                      stopOpacity: 1,
                    }}
                  />
                </linearGradient>
              </defs>

              <path
                d="M 50,200 C 150,100 200,300 300,200 C 350,150 380,250 400,200 L 400,400 L 0,400 Z"
                fill="url(#grad1)"
                className="animate-pulse"
              />

              <path
                d="M 0,250 C 100,200 150,350 250,250 C 300,200 350,300 400,250 L 400,400 L 0,400 Z"
                fill="rgba(59, 130, 246, 0.3)"
                className="animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </svg>
          </div>

          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Welcome to Notes</h2>
              <p className="text-blue-100 text-lg">
                Organize your thoughts, capture your ideas
              </p>
            </div>
          </div>

          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
      </div>

      <div className="card">
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 rounded-lg p-1 flex">
            <button
              onClick={() => setIsSignUp(true)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                isSignUp
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setIsSignUp(false)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                !isSignUp
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Sign In
            </button>
          </div>
        </div>

        <h1 className="text-2xl font-semibold mb-2">
          {isSignUp ? "Create your account" : "Welcome back"}
        </h1>
        <p className="text-gray-600 mb-6">
          {isSignUp
            ? "Sign up with email + OTP or continue with Google."
            : "Sign in to your account using email + OTP or Google."}
        </p>

        <OtpForm
          isSignUp={isSignUp}
          onLoggedIn={onLoggedIn}
          onError={onError}
        />

        <div className="my-6 flex items-center gap-4">
          <div className="h-px bg-gray-200 flex-1"></div>
          <span className="text-xs text-gray-500">OR</span>
          <div className="h-px bg-gray-200 flex-1"></div>
        </div>
        <GoogleButton onSuccess={onLoggedIn} onError={onError} />
      </div>
    </div>
  );
}
