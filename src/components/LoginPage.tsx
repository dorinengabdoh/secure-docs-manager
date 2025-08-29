import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Archive, Globe } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useLanguageStore } from "../store/languageStore";
import { translations } from "../translations";
import { LoginCredentials } from "../types";

export const LoginPage: React.FC = () => {
  const { language, setLanguage } = useLanguageStore();
  const { login, isLoading } = useAuthStore();
  const t = translations[language];

  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = await login(credentials);
    if (!success) {
      setError(t.invalidCredentials);
    }
  };

  const handleDemoLogin = (email: string) => {
    setCredentials({
      email,
      password: "password123",
    });
  };

  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "en" : "fr");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Language Switch */}
      <div className="absolute top-6 right-6">
        <button
          onClick={toggleLanguage}
          className="flex items-center px-4 py-2 rounded-xl bg-white/80 backdrop-blur-md shadow-md hover:shadow-lg transition-all border border-gray-200 hover:scale-105"
        >
          <Globe className="h-4 w-4 mr-2 text-gray-600" />
          <span className="text-sm font-semibold text-gray-700">
            {language.toUpperCase()}
          </span>
        </button>
      </div>

      <div className="w-full max-w-4xl">
        {/* Logo + Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg mb-5">
            <Archive className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            {t.Connexion}
          </h1>
          <p className="text-gray-600">{t.signInToAccount}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Demo Accounts */}
          <div className="bg-white/70 backdrop-blur-md border border-blue-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all">
            <h3 className="text-sm font-bold text-blue-900 mb-4 tracking-wide uppercase">
              {t.demoCredentials}
            </h3>
            <div className="space-y-3">
              {[
                { email: "admin@example.com", label: t.adminAccount },
                { email: "user1@example.com", label: t.EditorAccount },
                { email: "user2@example.com", label: t.ApproverAccount },
                { email: "user3@example.com", label: t.ArchiverAccount },
              ].map((acc) => (
                <button
                  key={acc.email}
                  onClick={() => handleDemoLogin(acc.email)}
                  className="w-full text-left p-3 rounded-xl bg-white border border-blue-200 hover:bg-blue-50 transition-all hover:scale-[1.02]"
                >
                  <div className="text-sm font-semibold text-blue-800">
                    {acc.label}
                  </div>
                  <div className="text-xs text-blue-600">
                    {acc.email} / password123
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Login Form */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-2xl transition-all">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t.email}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={credentials.email}
                    onChange={(e) =>
                      setCredentials((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="admin@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {t.password}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="password123"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 shadow-sm">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Remember Me + Forgot */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 text-sm text-gray-700"
                  >
                    {t.rememberMe}
                  </label>
                </div>
                <button
                  type="button"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  {t.forgotPassword}
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl shadow-md text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02]"
              >
                {isLoading ? t.signingIn : t.signIn}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-10">
          <p className="text-sm text-gray-500">
            © 2025 Archive Management System
          </p>
        </div>
      </div>
    </div>
  );
};
