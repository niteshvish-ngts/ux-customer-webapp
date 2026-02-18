'use client';

import Image from 'next/image';
import { auth, logoImage } from '@/components/shared/images/image';
import { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { verifyOtp } from '@/services/auth';

export default function OtpVerifyPage() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const phone = useMemo(() => searchParams.get('phone') ?? '', [searchParams]);

  useEffect(() => {
    if (!phone) router.replace('/login');
  }, [phone, router]);

  const maskedPhone = useMemo(() => {
    if (phone.length < 4) return '****';
    return '****' + phone.slice(-4);
  }, [phone]);

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
    const otpString = otp.join('');
    if (!otpString || otpString.length !== 6 || !phone) return;
    setError(null);
    setLoading(true);
    try {
      await verifyOtp({
        phone,
        otp: otpString,
        userType: 'CUSTOMER',
      });
      router.push('/');
    } catch (err: unknown) {
      const res = err && typeof err === 'object' && 'response' in err
        ? (err as { response?: { data?: { message?: string; errors?: string[] } } }).response?.data
        : null;
      const message = res?.message ?? res?.errors?.[0] ?? (err instanceof Error ? err.message : 'Verification failed');
      setError(message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEditPhone = () => router.push('/login');

  return (
    <div className="min-h-screen bg-white flex items-start justify-center pt-8 pb-8 px-5 relative overflow-hidden">
      {/* Decorative orange shapes in top corners */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#FFF5E2] rounded-full blur-3xl opacity-60 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFF5E2] rounded-full blur-3xl opacity-60 translate-x-1/2 -translate-y-1/2"></div>

      <div className="w-full max-w-lg relative z-10 mt-4">
        {/* Logo */}
        <div className="flex justify-center mb-3">
          <div className="flex items-center justify-center p-2">
            <Image
              src={logoImage.logoImg}
              alt="Logo"
              width={50}
              height={50}
              className="object-contain"
            />
          </div>
        </div>

        {/* Welcome Text */}
        <h1 className="text-xl text-dark text-center mb-6 font-heading font-medium">
          Welcome to UrbanXperts
        </h1>

        {/* Card */}
        <div className="w-full bg-white rounded-[30px] border border-border p-6 md:p-7 shadow-sm">
          {/* Phone Icon */}
          <div className="mb-4">
            <Image
              src={auth.loginDialer}
              alt="Phone"
              width={44}
              height={44}
              className="object-contain"
            />
          </div>

          {/* Title with Edit phone */}
          <div className="mb-2">
            <h2 className="text-h4 text-dark font-heading font-semibold flex items-center justify-between flex-wrap gap-1">
              <span className="flex-1 min-w-0">
                Enter OTP Sent to {phone ? `+91 ${maskedPhone}` : 'your number'}
              </span>
              <button
                type="button"
                onClick={handleEditPhone}
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
          <p className="text-body-sm text-dark-50 mb-6 font-body">
            Please be patient OTP waiting time is 1 minute
          </p>

          {error && (
            <p className="text-body-sm text-red-600 mb-3 font-body">{error}</p>
          )}

          {/* OTP Inputs */}
          <div className="flex justify-center gap-1.5 sm:gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                maxLength={1}
                inputMode="numeric"
                pattern="\d*"
                className="w-10 h-10 sm:w-16 sm:h-14 text-center text-base sm:text-lg font-body border border-border rounded-lg focus:ring-2 focus:ring-prime focus:border-transparent outline-none flex-shrink-0"
              />
            ))}
          </div>

          {/* Button */}
          <button
            onClick={handleVerifyOTP}
            disabled={otp.some((d) => !d) || loading || !phone}
            className="w-full bg-prime hover:bg-prime/90 disabled:bg-dark-20 disabled:cursor-not-allowed text-white py-3 rounded-xl text-button transition-all shadow-sm font-body font-semibold"
          >
            {loading ? 'Verifying…' : 'Verify OTP'}
          </button>

          {/* Terms */}
          <p className="text-caption text-muted-foreground text-start mt-6 leading-relaxed font-body text-sm">
            By continuing, you agree to our{' '}
            <a href="#" className="text-muted-foreground underline hover:text-dark-70">
              T&C
            </a>{' '}
            and{' '}
            <a href="#" className="text-muted-foreground underline hover:text-dark-70">
              privacy policy.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}