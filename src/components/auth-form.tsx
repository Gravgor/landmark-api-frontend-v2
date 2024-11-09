"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  User,
  Lock,
  Eye,
  EyeOff,
  Mail,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { createAccount } from "@/app/actions/actions";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "@/hooks/use-auth";
import zxcvbn from "zxcvbn";


const SubmitButton = ({ pending, children }: any) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center"
    type="submit"
    disabled={pending}
  >
    {pending ? (
      <Loader2 className="w-5 h-5 animate-spin" />
    ) : (
      <>
        <span className="mr-2">{children}</span>
        <ChevronRight className="w-5 h-5" />
      </>
    )}
  </motion.button>
);

const InputField = ({ icon: Icon, ...props }: any) => (
  <motion.div whileFocus={{ scale: 1.02 }} className="relative">
    <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    <input
      {...props}
      className="w-full px-10 py-3 bg-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
    />
  </motion.div>
);

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [pending, setPending] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    if (password) {
      const result = zxcvbn(password);
      setPasswordStrength(result.score);
    } else {
      setPasswordStrength(0);
    }
  }, [password]);

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setErrors((prev) => ({
      ...prev,
      email: validateEmail(newEmail)
        ? ""
        : "Please enter a valid email address",
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setErrors((prev) => ({
      ...prev,
      password:
        newPassword.length >= 8
          ? ""
          : "Password must be at least 8 characters long",
    }));
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isLogin && !acceptTerms) {
      alert("Please accept the terms of service");
      return;
    }

    if (!isLogin) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("plan", selectedPlan.toLowerCase());

      try {
        const result = await createAccount(formData);

        if (result.success) {
            const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
            if (!stripe) {
            throw new Error("Stripe failed to initialize");
          }
          const { error } = await stripe.redirectToCheckout({
            sessionId: result.sessionId,
          });
          if (error) {
            console.error("Stripe redirect error:", error);
          }
        } else {
          console.error("Account creation failed:", result.message);
        }
      } catch (error) {
        console.error("Error during account creation:", error);
      }
    } else {
      try {
        const loginResponse = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (loginResponse.ok) {
          await login();
          router.push("/dashboard");
        } else {
          const errorData = await loginResponse.json();
          console.error("Login failed:", errorData.message);
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    }
  }

  const handleSocialLogin = (provider: string) => {
    // Handle social login
    console.log(`Logging in with ${provider}`);
  };

  const getStrengthColor = (strength: number) => {
    switch (strength) {
      case 0:
        return "bg-red-500";
      case 1:
        return "bg-orange-500";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-green-500";
      case 4:
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900/50 backdrop-blur-lg rounded-lg p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <MapPin className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              className={`w-full pl-10 pr-3 py-2 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                errors.email ? 'focus:ring-red-500' : 'focus:ring-blue-500'
              }`}
              placeholder="Email"
              required
            />
          </div>
          <AnimatePresence>
            {(emailFocused || email) && errors.email && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="text-red-500 text-xs mt-1"
              >
                {errors.email}
              </motion.p>
            )}
          </AnimatePresence>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              className={`w-full pl-10 pr-10 py-2 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                errors.password ? "focus:ring-red-500" : "focus:ring-blue-500"
              }`}
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          <AnimatePresence>
          {!isLogin && (passwordFocused || password) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                {errors.password && (
                  <p className="text-red-500 text-xs">{errors.password}</p>
                )}
                <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${getStrengthColor(passwordStrength)}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${(passwordStrength + 1) * 20}%` }}
                    transition={{ duration: 0.5 }}
                  ></motion.div>
                </div>
                <p className="text-xs text-gray-400">
                  Password strength: {
                    passwordStrength === 0 ? 'Very weak' :
                    passwordStrength === 1 ? 'Weak' :
                    passwordStrength === 2 ? 'Fair' :
                    passwordStrength === 3 ? 'Strong' :
                    'Very strong'
                  }
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {isLogin && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2 rounded border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
                />
                <label htmlFor="remember-me" className="text-sm text-gray-300">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-blue-400 hover:underline">
                Forgot password?
              </a>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold"
            type="submit"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </motion.button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2  text-gray-400">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              onClick={() => handleSocialLogin("Google")}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="ml-2">Google</span>
            </button>
            <button
              onClick={() => handleSocialLogin("GitHub")}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="ml-2">GitHub</span>
            </button>
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-gray-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-400 hover:underline focus:outline-none"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
