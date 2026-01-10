'use client';

import Image from 'next/image';
import { auth } from '@/components/shared/images/image';
import { useState } from 'react';

export default function OtpVerifyPage() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex flex-col items-center justify-center px-4">

      {/* Heading */}
      <h1 className="text-xl text-dark text-center mb-5 font-outfit font-medium">
        Welcome to UrbanXperts
      </h1>

      {/* Card */}
      <div className="w-full max-w-lg bg-white rounded-[30px] border border-border p-10 shadow-sm text-center">

        {/* Icon */}
        <div className="mb-4 flex justify-center">
          <Image
            src={auth.loginDialer}
            alt="Phone"
            width={36}
            height={36}
          />
        </div>

        {/* Title */}
       

<h2 className="text-h4 text-dark mb-1 flex items-center justify-center gap-2">
  <span>Enter OTP Sent to +91 987****12</span>

  <button
    type="button"
    className="flex items-center gap-1 text-prime text-xs font-medium underline"
  >
    {/* Pencil Image */}
    <Image
      src={auth.pencilImg}
      alt="Edit phone"
      width={14}
      height={14}
      className="object-contain"
    />

    <span>Edit phone</span>
  </button>
</h2>


        {/* Subtitle */}
        <p className="text-body-sm text-dark-50 mb-6">
          Please be patient OTP waiting time is 1 minute
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              maxLength={1}
              className="w-12 h-12 text-center text-lg border border-border rounded-lg focus:ring-2 focus:ring-prime focus:border-transparent outline-none"
            />
          ))}
        </div>

        {/* Button */}
        <button
          disabled={otp.some((d) => !d)}
          className="w-full bg-prime hover:bg-prime disabled:bg-dark-20 disabled:cursor-not-allowed text-white py-3 rounded-xl text-button transition"
        >
          Verify OTP
        </button>

        {/* Terms */}
        <p className="text-caption text-dark-50 text-center mt-4">
          By continuing, you agree to our{' '}
          <a href="#" className="underline text-dark">T&C</a>{' '}
          and{' '}
          <a href="#" className="underline text-dark">privacy policy</a>.
        </p>

      </div>
    </div>
  );
}
