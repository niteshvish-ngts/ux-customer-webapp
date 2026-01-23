'use client';

import { auth, logoImage } from '@/components/shared/images/image';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function PhoneLoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    if (isVerified && phoneNumber) {
      console.log('Phone:', countryCode + phoneNumber);
    }
    router.push('/otp-verify');
  };

  return (
    <div className=" bg-gradient-to-br from-orange-80 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="flex justify-center mb-2">
  <div className="w-18 h-18 bg-white rounded-full shadow-lg flex items-center justify-center">
    <div className="w-18 h-18 bg-white rounded-full flex items-center justify-center relative">
      
      {/* LOGO IMAGE */}
      <Image
        src={logoImage.logoImg} 
        alt="Logo"
        width={44}
        height={44}
        className="object-contain"
      />

      {/* USER BADGE */}
      {/* <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-prime rounded-full border-2 border-white flex items-center justify-center">
        <span className="text-white text-xs font-bold font-heading">U</span>
      </div> */}

    </div>
  
</div>
        </div>

        {/* Welcome Text */}
        <h1 className="text-xl text-dark text-center mb-5 font-outfit font-medium">
          Welcome to UrbanXperts
        </h1>

        {/* Login Card */}
        <div className="w-full bg-white rounded-[30px] border border-border p-10 shadow-sm">
          {/* Phone Icon */}
          <div className="mb-3">
            <div className="inline-flex items-center justify-center relative">
              <Image
                src={auth.loginDialer}
                alt="Dialer"
                width={44}
                height={44}
                className="object-contain"
              />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-h4 text-dark mb-1">
            Enter Your Phone number
          </h2>
          
          {/* Subtitle */}
          <p className="text-body-sm text-dark-50 mb-7">
            We will send you a verification code on your provided number
          </p>

          {/* Phone Input */}
          <div className="mb-5">
            <div className="flex items-stretch border border-border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-prime focus-within:border-transparent transition-all">
              <div className="flex items-center px-4 bg-white border-r border-border">
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
                <span className="text-dark-30 text-sm">▼</span>
              </div>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                className="flex-1 px-4 py-4 focus:outline-none text-dark placeholder:text-dark-30 text-sm font-body"
                maxLength={10}
              />
            </div>
          </div>

          {/* Cloudflare Verification */}
          <div className="mb-5">
            <div className="flex items-center justify-between px-5 py-3 border border-border rounded-xl bg-white">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="verify"
                  checked={isVerified}
                  onChange={(e) => setIsVerified(e.target.checked)}
                  className="w-6 h-6 text-prime border-2 border-border rounded focus:ring-2 focus:ring-prime cursor-pointer"
                />
                <label htmlFor="verify" className="text-body-sm text-dark cursor-pointer select-none">
                  Verify you are human
                </label>
              </div>
              <div className="flex items-center gap-2">
  {/* Cloudflare Logo */}
  <Image
    src={auth.cloudflareLogo}
    alt="Cloudflare"
    width={75}
    height={25}
    className="object-contain"
  />

  {/* Text */}
  
</div>
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleSubmit}
            disabled={!isVerified || !phoneNumber}
            className="w-full bg-prime hover:bg-prime disabled:bg-dark-20 disabled:cursor-not-allowed text-white text-button py-3 rounded-xl transition-all shadow-sm"
          >
            Continue
          </button>

          {/* Terms */}
          <p className="text-caption text-dark-50 text-center mt-5 leading-relaxed">
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