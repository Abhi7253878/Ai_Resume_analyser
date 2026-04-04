import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  { title: "Resumind | Auth" },
  { name: "description", content: "Log into your account" },
];

const Auth = () => {
  const { isLoading, auth } = usePuterStore();

  return (
    <main className="bg-[url('/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
      
      <div className="gradient-border shadow-lg">
        
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10 w-[400px] text-center">
          
          {/* Heading */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome
            </h1>
            <h2 className="text-gray-500">
              Log In to Continue Your Job Journey
            </h2>
          </div>

          {/* Button */}
          <button
            disabled={isLoading}
            onClick={auth.signIn}
            className="primary-button w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r
              from-purple-500 to-blue-500 hover:opacity-90 transition"
          >
            {isLoading ? "Loading..." : "Continue with Puter"}
          </button>

        </section>

      </div>

    </main>
  );
};

export default Auth;