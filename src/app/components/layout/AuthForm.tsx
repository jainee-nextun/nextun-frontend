"use client";
// @ts-nocheck
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Checkbox } from "../ui/Checkbox";
interface AuthFormProps {
  isLogin?: boolean;
}

export default function AuthForm({ isLogin = false }: AuthFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [errors, setErrors] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function validateEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }
  function validatePassword(password: string) {
    return password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors: any = {};
    if (!form.email) newErrors.email = "Email is required.";
    else if (!validateEmail(form.email)) newErrors.email = "Enter a valid email.";
    if (!form.password) newErrors.password = "Password is required.";
    else if (!isLogin && !validatePassword(form.password)) newErrors.password = "Password must be at least 8 characters, include a letter and a number.";
    if (!isLogin) {
      if (!form.confirmPassword) newErrors.confirmPassword = "Confirm your password.";
      else if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
      if (!form.terms) newErrors.terms = "You must agree to the terms.";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Submit logic here
      // alert(isLogin ? "Login successful!" : "Signup successful!");
      router.push("/dashboard");
    }
  };

  return (
    <div
  className="flex flex-col md:flex-row h-auto md:h-screen w-full p-10"
  style={{
    backgroundImage: 'url("/images/authbg.png")',
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Left Panel */}
<div className="hidden md:flex w-full md:w-[50%] h-screen md:h-screen flex flex-col justify-center items-center px-6 md:px-20 py-6 md:py-0">
  <img src="/images/logo.svg" alt="Nextun Logo" className="w-40 mb-1 self-start" />
  <img src="/images/auth.png" alt="auth chart" className="w-[140%] max-w-[800px] h-auto object-contain"/>
</div>


  {/* Right Panel */}
  <div className="w-full md:w-[60%] h-full flex items-center justify-center px-4 md:px-12 py-6 md:py-0">
  <Card className="px-18 py-18 bg-[#FAFAFE] border-none shadow-none rounded-3xl w-full max-w-[640px]">
    <div className="flex md:hidden justify-center">
  <img src="/images/logo.svg" alt="Nextun Logo" className="w-28 mb-4" />
  </div>
    <div className="space-y-8">

      <h2 className="text-4xl md:text-4xl font-serif text-center leading-tight">
        {isLogin ? (
        <>
          Login to <br />
          Your Nextun Account
        </>
        ) : (
        <>
          Create Your Nextun Account
        </>
        )}
      </h2>


      <form className="space-y-5 font-body" onSubmit={handleSubmit} noValidate>
        {/* Email */}
        <div>
          <label className="block text-lg font-small mb-3">Email</label>
          <Input
            type="email"
            placeholder="Enter your email address"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 text-sm bg-[#F5F5F5] rounded-xl border ${errors.email ? 'border-red-500' : 'border-[#E5E5E5]'} focus:outline-none focus:ring-2 focus:ring-[#34A853]`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        {/* Password */}
        <div className="relative">
          <label className="block text-lg font-small mb-2">
            {isLogin ? "Password" : "Create Password"}
          </label>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder={isLogin ? "Enter your password" : "Create a strong password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            className={`w-full px-4 py-3 text-sm bg-[#F5F5F5] rounded-xl border ${errors.password ? 'border-red-500' : 'border-[#E5E5E5]'} focus:outline-none focus:ring-2 focus:ring-[#34A853] pr-12`}
          />
          <div className="absolute right-3 inset-y-0 flex items-center top-9">
            <button type="button" onClick={() => setShowPassword((v) => !v)} className="p-1 focus:outline-none">
              {showPassword ? (
                // Eye-off SVG
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M17.94 17.94A10.06 10.06 0 0 1 12 20c-5 0-9.27-3.11-11-8 1.06-2.7 2.99-4.93 5.47-6.3M9.53 4.21A9.77 9.77 0 0 1 12 4c5 0 9.27 3.11 11 8a11.05 11.05 0 0 1-2.04 3.34M1 1l22 22" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              ) : (
                // Eye SVG
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="10" ry="7" stroke="#888" strokeWidth="2"/><circle cx="12" cy="12" r="3" stroke="#888" strokeWidth="2"/></svg>
              )}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>
        {/* Confirm Password */}
        {!isLogin && (
          <div className="relative">
            <label className="block text-lg font-small mb-2">Confirm Password</label>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-3 text-sm bg-[#F5F5F5] rounded-xl border ${errors.confirmPassword ? 'border-red-500' : 'border-[#E5E5E5]'} focus:outline-none focus:ring-2 focus:ring-[#34A853] pr-12`}
            />
            <div className="absolute right-3 inset-y-0 flex items-center top-9">
              <button type="button" onClick={() => setShowConfirmPassword((v) => !v)} className="p-1 focus:outline-none">
                {showConfirmPassword ? (
                  // Eye-off SVG
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M17.94 17.94A10.06 10.06 0 0 1 12 20c-5 0-9.27-3.11-11-8 1.06-2.7 2.99-4.93 5.47-6.3M9.53 4.21A9.77 9.77 0 0 1 12 4c5 0 9.27 3.11 11 8a11.05 11.05 0 0 1-2.04 3.34M1 1l22 22" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                ) : (
                  // Eye SVG
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="10" ry="7" stroke="#888" strokeWidth="2"/><circle cx="12" cy="12" r="3" stroke="#888" strokeWidth="2"/></svg>
                )}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>
        )}
        {/* Terms */}
        {!isLogin && (
          <div className="flex items-start gap-2">
            <Checkbox id="terms" name="terms" checked={form.terms} onChange={handleChange} />
            <label htmlFor="terms" className="text-sm text-gray-700 leading-snug">
              I have read and agree to{" "}
              <Link href="#" className="text-blue-600 underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-blue-600 underline">
                Terms of Services
              </Link>.
            </label>
          </div>
        )}
        {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms}</p>}

        {/* Forgot */}
        {isLogin && (
          <div className="text-sm text-blue-600 hover:underline">
            <Link href="#">Forgot Password?</Link>
          </div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          className="w-full bg-[#00C26A] hover:bg-[#00a75a] text-white py-3 text-base rounded-full font-medium transition"
        >
          Next
        </Button>
      </form>

      {/* Auth Link */}
      <div className="text-sm text-center font-body">
        {isLogin ? (
          <>
            Don’t have an account?{" "}
            <Link href="/signup" className="text-blue-600 underline">
              Sign Up →
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 underline">
              Log in →
            </Link>
          </>
        )}
      </div>

      {/* Google Button */}
      <Button
      variant="outline"
      className="w-full py-3 rounded-full flex justify-center items-center mt-6 space-x-2 bg-white text-gray-700 border border-[#DADCE0] hover:bg-gray-50 text-sm font-medium transition"
    >
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
        <path d="M1 1h22v22H1z" fill="none" />
      </svg>
      <span>Continue With Google</span>
    </Button>
    </div>
  </Card>
</div>

</div>

  );
}
