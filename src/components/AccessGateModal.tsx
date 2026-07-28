import React, { useState } from 'react';
import { Lock, Key, CreditCard, CheckCircle2, AlertCircle, Loader2, X, ShieldCheck, Sparkles } from 'lucide-react';
import { getSubjectDisplayName, normalizeSubjectKey } from '../lib/accessUtils';

interface AccessGateModalProps {
  isOpen: boolean;
  subjectKey: string;
  subjectName?: string;
  onClose: () => void;
  onAccessGranted: (subjectKey: string) => void;
}

export default function AccessGateModal({
  isOpen,
  subjectKey,
  subjectName,
  onClose,
  onAccessGranted
}: AccessGateModalProps) {
  const [couponCode, setCouponCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);

  if (!isOpen) return null;

  const displayName = subjectName || getSubjectDisplayName(subjectKey);
  const normKey = normalizeSubjectKey(subjectKey);

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) {
      setErrorMessage('Please enter a referral or coupon code.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');
    setShowPaymentInfo(false);

    try {
      const token = localStorage.getItem('session_token');
      const email = localStorage.getItem('user_email');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      if (email) {
        headers['X-User-Email'] = email;
      }

      const res = await fetch('/api/referral/redeem', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          code: couponCode.trim(),
          subjectKey: normKey,
          userEmail: email
        })
      });

      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        const text = await res.text();
        throw new Error(`Server returned non-JSON response: ${text.substring(0, 100)}`);
      }

      const data = await res.json();

      if (data.success) {
        setSuccessMessage(data.message || 'Coupon redeemed successfully! Access granted.');
        setCouponCode('');
        setTimeout(() => {
          onAccessGranted(normKey);
          onClose();
        }, 1200);
      } else {
        setErrorMessage(data.error || 'Invalid or expired coupon code.');
      }
    } catch (err: any) {
      console.error('Failed to redeem referral code:', err);
      setErrorMessage(err.message || 'Network error occurred while validating code. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl border border-neutral-200 shadow-2xl p-6 sm:p-8 space-y-6 text-neutral-900 animate-in zoom-in-95 duration-200 text-left"
        id="referral-access-gate-modal"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-black rounded-full uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5 text-amber-600" />
            <span>Protected Subject Area</span>
          </div>

          <h3 className="text-2xl font-black text-neutral-900 tracking-tight leading-snug">
            {displayName} Access
          </h3>

          <p className="text-xs text-neutral-500 font-medium leading-relaxed">
            This subject requires a valid referral or coupon code to unlock full chapter modules, study materials, and mindmaps.
          </p>
        </div>

        {/* Coupon Code Entry Form */}
        <form onSubmit={handleRedeem} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-black text-neutral-750 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-[#5c3beb]" />
              <span>Enter Referral / Coupon Code</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value);
                  setErrorMessage('');
                }}
                placeholder="Coupon Code"
                className="w-full px-4 py-3 border-2 border-neutral-250 focus:border-[#5c3beb] focus:ring-2 focus:ring-[#5c3beb]/20 rounded-2xl text-sm font-mono tracking-wider font-extrabold text-neutral-900 placeholder:normal-case placeholder:font-normal placeholder:tracking-normal placeholder:text-neutral-400 outline-none transition-all"
                disabled={isSubmitting}
                id="referral-code-input"
              />
            </div>
          </div>

          {/* Error Message Alert */}
          {errorMessage && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-xs font-bold flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Message Alert */}
          {successMessage && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-2.5 pt-2">
            <button
              type="submit"
              disabled={isSubmitting || !couponCode.trim()}
              className="w-full py-3.5 bg-[#5c3beb] hover:bg-[#4a2ed1] disabled:bg-neutral-300 text-white font-black text-xs uppercase tracking-wider rounded-2xl transition-all cursor-pointer shadow-lg hover:shadow-indigo-200 flex items-center justify-center gap-2 active:scale-[0.99]"
              id="redeem-coupon-btn"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Validating Code...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Redeem Code</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setShowPaymentInfo(!showPaymentInfo)}
              className="w-full py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-black text-xs uppercase tracking-wider rounded-2xl border border-neutral-250 transition-all cursor-pointer flex items-center justify-center gap-2"
              id="pay-now-static-btn"
            >
              <CreditCard className="w-4 h-4 text-neutral-600" />
              <span>Pay Now</span>
            </button>
          </div>
        </form>

        {/* Static Payment Information Notice */}
        {showPaymentInfo && (
          <div className="p-4 bg-indigo-50/70 border border-indigo-150 rounded-2xl text-left text-xs space-y-1.5 animate-in fade-in">
            <p className="font-black text-indigo-950 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#5c3beb]" />
              Online Payment Gateway
            </p>
            <p className="text-neutral-600 text-[11px] font-medium leading-relaxed">
              Instant online payment integration is coming soon! Please contact your institute or platform admin to receive a referral coupon code for direct course activation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
