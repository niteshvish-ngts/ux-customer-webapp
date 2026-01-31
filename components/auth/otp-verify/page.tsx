'use client';

import Image from 'next/image';
import { auth, logoImage } from '@/components/shared/images/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OtpVerifyPage() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const router = useRouter();

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

const handleVerifyOTP = async () => {
  // verify logic ...
  router.push('/'); 
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

        {/* Card */}
        <div className="w-full bg-white rounded-[30px] border border-border p-6 md:p-8 shadow-sm">
          {/* Phone Icon */}
          <div className="mb-3">
            <Image
              src={auth.loginDialer}
              alt="Phone"
              width={44}
              height={44}
              className="object-contain"
            />
          </div>

          {/* Title with Edit phone */}
          <div className="mb-1.5">
            <h2 className="text-h4 text-dark font-heading font-semibold flex items-center justify-between flex-wrap gap-2">
              <span className="flex-1 min-w-0">Enter OTP Sent to +91 987****12</span>
              <button
                type="button"
                className="flex items-center gap-1 text-prime text-xs font-medium underline whitespace-nowrap"
              >
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
          </div>

          {/* Subtitle */}
          <p className="text-body-sm text-dark-50 mb-5 font-body">
            Please be patient OTP waiting time is 1 minute
          </p>

          {/* OTP Inputs */}
          <div className="flex justify-center gap-3 mb-5">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                maxLength={1}
                className="w-12 h-12 text-center text-lg font-body border border-border rounded-lg focus:ring-2 focus:ring-prime focus:border-transparent outline-none"
              />
            ))}
          </div>

          {/* Button */}
          <button
            onClick={handleVerifyOTP}
            disabled={otp.some((d) => !d)}
            className="w-full bg-prime hover:bg-prime/90 disabled:bg-dark-20 disabled:cursor-not-allowed text-white py-3 rounded-xl text-button transition-all shadow-sm font-body font-semibold"
          >
            Verify OTP
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
