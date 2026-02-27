import React, { Suspense } from "react";
import OtpVerifyPage from "@/components/auth/otp-verify/page";

export default function OtpVerify() {
  return (
    <Suspense fallback={null}>
      <OtpVerifyPage />
    </Suspense>
  );
}

