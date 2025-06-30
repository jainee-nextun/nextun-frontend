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
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    referral: "",
    terms: false,
    marketingConsent: false,
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
    <>
    
    <div className="min-h-screen w-full flex items-center justify-center p-6"
  style={{
    backgroundImage: 'url("/images/authbg.png")',
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>

 
  <div className="w-full md:w-[60%] relative flex items-center justify-center px-4 md:px-12 min-h-screen">

  

  <Card className="bg-[#FAFAFE] border-none shadow-none rounded-3xl w-full max-w-[640px] min-w-[500px] py-12 px-10 flex flex-col justify-center">
<div className="flex justify-start w-full">

  <img src="/images/logo.svg" alt="Nextun Logo" className="w-28 mb-4" />
</div>

    
    <div className="space-y-8">

      <h2 className="text-4xl md:text-4xl font-serif text-left leading-tight w-full">
        {isLogin ? (
        <>
          Login to Your Nextun Account
        </>
        ) : (
        <>
          Create Your Nextun Account
        </>
        )}
      </h2>


      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        {!isLogin && (
  <div className="flex gap-4">
    <div className="w-1/2">
      <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
      <Input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={form.firstName}
        onChange={handleChange}
        className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md"
      />
    </div>
    <div className="w-1/2">
      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
      <Input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={form.lastName}
        onChange={handleChange}
        className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md"
      />
    </div>
  </div>
)}
  {/* Email */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Your email</label>
    <Input
      type="email"
      placeholder="name@company.com"
      name="email"
      value={form.email}
      onChange={handleChange}
      className={`w-full px-4 py-2 text-sm border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
    />
    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
  </div>

  {/* Password */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
    <Input
      type={showPassword ? "text" : "password"}
      placeholder="••••••••"
      name="password"
      value={form.password}
      onChange={handleChange}
      className={`w-full px-4 py-2 text-sm border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
    />
    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
  </div>

  {/* Confirm Password */}
  {!isLogin && (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password*</label>
    <Input
      type={showConfirmPassword ? "text" : "password"}
      name="confirmPassword"
      placeholder="••••••••"
      value={form.confirmPassword}
      onChange={handleChange}
      className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md"
    />
  </div>
)}

{/* Referral Code (Only for Signup) */}
{!isLogin && (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Referral Code (Optional)</label>
    <Input
      type="text"
      name="referral"
      placeholder="ABC123"
      value={form.referral}
      onChange={handleChange}
      className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md"
    />
  </div>
)}

{/* Checkbox for Terms */}
{!isLogin && (
  <div className="flex items-start text-sm text-gray-700 gap-2">
    <input
      type="checkbox"
      name="terms"
      checked={form.terms}
      onChange={handleChange}
      className="mt-1"
    />
    <label htmlFor="terms" className="leading-snug">
      I certify that I am 18 years of age or older, agree to the{" "}
      <Link href="#" className="text-blue-600 underline">User Agreement</Link>, and acknowledge the{" "}
      <Link href="#" className="text-blue-600 underline">Privacy Policy</Link>.
    </label>
  </div>
)}

{/* Checkbox for Marketing */}
{!isLogin && (
  <div className="flex items-start text-sm text-gray-700 gap-2">
    <input
      type="checkbox"
      name="marketingConsent"
      checked={form.marketingConsent}
      onChange={handleChange}
      className="mt-1"
    />
    <label htmlFor="marketingConsent" className="leading-snug">
      Keep me in the loop with exclusive offers, trading insights & early access to promotions.
    </label>
  </div>
)}

{/* Primary Button */}
<Button
  type="submit"
  className="w-full py-3 mt-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition"
>
  {isLogin ? "Sign in" : "Create Account"}
</Button>

{/* Remove extra white button from signup */}
{isLogin && (
  <Button
    type="button"
    onClick={() => router.push("/signup")}
    className="w-full py-3 mt-3 bg-white text-gray-800 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-100 transition"
  >
    Create Account
  </Button>
)}

{/* Footer text for Signup */}
{!isLogin && (
  <p className="text-center text-sm text-gray-600 mt-6">
    Already have an account?{" "}
    <Link href="/login" className="text-blue-600 underline">Login Here</Link>
  </p>
)}


</form>


     {isLogin && (
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
)}

    </div>
  </Card>
</div>

</div>
</>
  );
}
