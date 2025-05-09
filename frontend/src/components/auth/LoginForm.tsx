import React from 'react';

export default function LoginForm({formUserData, handleChange, handleLogin}: any) {
  return (
    <div className="min-h-screen  py-6 flex flex-col justify-center px-4 sm:px-6 lg:px-8 bg-black">
      <div className="relative py-3 max-w-md w-full mx-auto transform scale-95 sm:scale-100">
        {/* fond en gradient incliné */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg
                        transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-2xl"></div>
        {/* carte blanche */}
        <div className="relative bg-white shadow-lg rounded-2xl px-6 py-12 sm:px-10 sm:py-16">
        <div className="flex flex-row items-center justify-center space-x-2 mb-2">
          <h1 className="text-2xl font-semibold text-black">Welcome to</h1>
          <span className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-900">Galelli</span>
        </div>

         {/* Register Link */}
         <div className="text-center text-sm text-gray-600 mb-6">
              <span>Don't have an account? </span>
              <a href="/register" className="text-cyan-500 hover:text-cyan-700">Register</a>
            </div>

          <div className="space-y-6">
            {/* Email */}
            <div className="relative pt-2">
            <input
                id="email"
                type="text"
                placeholder="Email Address"
                className="peer w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent
                        focus:outline-none focus:border-cyan-500 transition py-3 px-1 leading-snug"
                name='email'
                onChange={handleChange}
                value={formUserData.email}
            />
            <label
                htmlFor="email"
                className="absolute left-1 top-0 text-gray-600 text-xs cursor-pointer
                        peer-placeholder-shown:text-sm peer-placeholder-shown:top-6
                        transition-all peer-focus:top-0 peer-focus:text-gray-600 peer-focus:text-xs"
            >
                Email Address
            </label>
            </div>

            {/* Password */}
            <div className="relative pt-2">
            <input
                id="password"
                type="password"
                placeholder="Password"
                className="peer w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent
                        focus:outline-none focus:border-cyan-500 transition py-3 px-1 leading-snug"
                name='password'
                onChange={handleChange}
                value={formUserData.password}
            />
            <label
                htmlFor="password"
                className="absolute left-1 top-0 text-gray-600 text-xs cursor-pointer
                        peer-placeholder-shown:text-sm peer-placeholder-shown:top-6
                        transition-all peer-focus:top-0 peer-focus:text-gray-600 peer-focus:text-xs"
            >
                Password
            </label>
            </div>
            
            {/* Submit */}
            <button onClick={handleLogin} className="w-full bg-cyan-500 text-white rounded-md py-2 hover:bg-cyan-600 transition">
              Sign In
            </button>
         
          </div>
        </div>
      </div>
    </div>
  );
}
