'use client';

import { auth, logoImage } from '@/components/shared/images/image';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { sendOtp } from '@/services/auth';

export default function PhoneLoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!isVerified || !phoneNumber) return;
    setError(null);
    setLoading(true);
    try {
      await sendOtp({
        phone: phoneNumber,
        userType: 'CUSTOMER',
      });
      router.push(`/otp-verify?phone=${encodeURIComponent(phoneNumber)}`);
    } catch (err: unknown) {
      const message =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { data?: { message?: string; errors?: string[] } } }).response?.data?.message ||
            (err as { response?: { data?: { errors?: string[] } } }).response?.data?.errors?.[0]
          : err instanceof Error
            ? err.message
            : 'Failed to send OTP';
      setError(message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-start justify-center pt-8 pb-8 px-4 relative overflow-hidden">
      {/* Decorative orange shapes in top corners */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#FFF5E2] rounded-full blur-3xl opacity-60 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFF5E2] rounded-full blur-3xl opacity-60 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="w-full max-w-lg relative z-10 mt-4">
        {/* Logo */}
        <div className="flex justify-center mb-3">
          <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center p-2">
            <Image
              src={logoImage.logoImg} 
              alt="Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
        </div>

        {/* Welcome Text */}
        <h1 className="text-xl text-dark text-center mb-6 font-heading font-medium">
          Welcome to UrbanXperts
        </h1>

        {/* Login Card */}
        <div className="w-full bg-white rounded-[30px] border border-border p-6 md:p-8 shadow-sm">
          {/* Phone Icon */}
          <div className="mb-3">
            <Image
              src={auth.loginDialer}
              alt="Dialer"
              width={44}
              height={44}
              className="object-contain"
            />
          </div>

          {/* Title */}
          <h2 className="text-h4 text-dark mb-1.5 font-heading font-semibold">
            Enter Your Phone number
          </h2>
          
          {/* Subtitle */}
          <p className="text-body-sm text-dark-50 mb-5 font-body">
            We will send you a verification code on your provided number
          </p>

          {/* Phone Input */}
          <div className="mb-4">
            <div className="flex items-stretch border border-border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-prime focus-within:border-transparent transition-all">
              <div className="flex items-center px-4 py-3.5 bg-white border-r border-border">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="text-dark focus:outline-none text-sm bg-transparent pr-2 appearance-none cursor-pointer font-body"
                >
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+86">+86</option>
                </select>
                <span className="text-dark-30 text-xs ml-1">▼</span>
              </div>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                className="flex-1 px-4 py-3.5 focus:outline-none text-dark placeholder:text-dark-30 text-sm font-body"
                maxLength={10}
              />
            </div>
          </div>

          {/* Error message */}
          {error && (
            <p className="text-body-sm text-red-600 mb-3 font-body">{error}</p>
          )}

          {/* Cloudflare Verification */}
          <div className="mb-5">
            <div className="flex items-center justify-between px-5 py-3 border border-border rounded-xl bg-white">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="verify"
                  checked={isVerified}
                  onChange={(e) => setIsVerified(e.target.checked)}
                  className="w-5 h-5 text-prime border-2 border-border rounded focus:ring-2 focus:ring-prime cursor-pointer"
                />
                <label htmlFor="verify" className="text-body-sm text-dark cursor-pointer select-none font-body">
                  Verify you are human
                </label>
              </div>
              <div className="flex flex-col items-end">
                <Image
                  src={auth.cloudflareLogo}
                  alt="Cloudflare"
                  width={75}
                  height={25}
                  className="object-contain"
                />
                <p className="text-[10px] text-dark-30 mt-0.5 font-body">Privacy • Terms</p>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleSubmit}
            disabled={!isVerified || !phoneNumber || loading}
            className="w-full bg-prime hover:bg-prime/90 disabled:bg-dark-20 disabled:cursor-not-allowed text-white text-button py-3 rounded-xl transition-all shadow-sm font-body font-semibold"
          >
            {loading ? 'Sending…' : 'Continue'}
          </button>

          {/* Terms */}
          <p className="text-caption text-dark-50 text-center mt-5 leading-relaxed font-body">
            By continuing, you agree to our{' '}
            <a href="#" className="text-dark underline hover:text-dark-70">
              T&C
            </a>{' '}
            and{' '}
            <a href="#" className="text-dark underline hover:text-dark-70">
              privacy policy.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}