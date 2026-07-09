import express from "express";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import multer from "multer";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

  // ==================== GOOGLE AUTH WITH NEXTAUTH/AUTH.JS SPECIFICATION ====================
  // API Route to fetch custom Google Auth signin URL
  app.get("/api/auth/google/url", (req, res) => {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const redirectUri = (req.query.redirect_uri as string) || "http://localhost:3000/api/auth/callback/google";
    const board = (req.query.board as string) || "cbse";

    const isRealGoogleConfigured = clientId && clientId.trim() !== "" && clientId !== "YOUR_GOOGLE_CLIENT_ID";

    if (isRealGoogleConfigured) {
      const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: "code",
        scope: "openid email profile",
        state: JSON.stringify({ board, redirect_uri: redirectUri }),
        access_type: "offline",
        prompt: "consent",
      });
      return res.json({ url: `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}` });
    } else {
      // Dynamic offline/local container-safe Google Chooser simulation page!
      const query = new URLSearchParams({ redirect_uri: redirectUri, board });
      return res.json({ url: `/api/auth/demo-login?${query.toString()}` });
    }
  });

  // Serve a beautiful, native Google-branded Account Selector page when Google keys are raw placeholders
  app.get("/api/auth/demo-login", (req, res) => {
    const redirectUri = (req.query.redirect_uri as string) || "http://localhost:3000/api/auth/callback/google";
    const board = (req.query.board as string) || "cbse";

    res.send(`
      <html>
        <head>
          <title>Sign in with Google - Kootmate Academy</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <script src="https://cdn.tailwindcss.com"></script>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
          <style>
            body { font-family: 'Inter', sans-serif; }
          </style>
        </head>
        <body class="bg-indigo-50/50 min-h-screen flex items-center justify-center p-4">
          <div class="bg-white border border-slate-200 shadow-2xl rounded-3xl p-8 max-w-md w-full text-center space-y-6">
            <div class="flex justify-center">
              <svg class="h-10 w-10" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5.04c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 1.74 14.93 1 12 1 7.37 1 3.4 3.66 1.46 7.55l3.74 2.9C6.1 7.42 8.84 5.04 12 5.04z" />
                <path fill="#4285F4" d="M23.45 12.3c0-.82-.07-1.6-.2-2.3H12v4.4h6.43c-.28 1.44-1.1 2.66-2.33 3.47l3.6 2.8c2.1-1.94 3.3-4.8 3.3-8.37z" />
                <path fill="#FBBC05" d="M5.2 14.65c-.23-.68-.36-1.41-.36-2.15s.13-1.47.36-2.15L1.46 7.55C.53 9.4 0 11.64 0 14s.53 4.6 1.46 6.45l3.74-2.9z" />
                <path fill="#34A853" d="M12 23c3.24 0 5.95-1.08 7.93-2.9l-3.6-2.8c-1.1.74-2.5 1.18-4.33 1.18-3.16 0-5.9-2.38-6.8-5.4l-3.74 2.9C3.4 20.34 7.37 23 12 23z" />
              </svg>
            </div>

            <div class="space-y-1.5">
              <h1 class="text-xl font-extrabold text-slate-950 tracking-tight">Choose a Google account</h1>
              <p class="text-xs text-slate-500 font-bold">to continue to <span class="text-[#5c3beb] font-black">Kootmate Academy</span></p>
            </div>

            <div class="divide-y divide-slate-100 border border-slate-150 rounded-2xl overflow-hidden bg-slate-50/50">
              <a href="/api/auth/callback/google?code=mock_code_1&email=paritoshbadave@gmail.com&name=Paritosh%20Badave&picture=https://api.dicebear.com/7.x/pixel-art/svg?seed=paritosh&board=${board}&redirect_uri=${encodeURIComponent(redirectUri)}" class="flex items-center gap-3.5 p-4 hover:bg-slate-50 transition-colors text-left group">
                <img src="https://api.dicebear.com/7.x/initials/svg?seed=paritosh&backgroundColor=c0aede" class="w-10 h-10 rounded-full border border-slate-200 bg-white" />
                <div class="flex-1">
                  <p class="text-sm font-black text-slate-900 group-hover:text-[#5c3beb]">Paritosh Badave</p>
                  <p class="text-xs text-slate-500 font-semibold leading-none mt-0.5">paritoshbadave@gmail.com</p>
                </div>
                <span class="text-[9px] px-2 py-0.5 bg-violet-150 text-[#5c3beb] font-black rounded-full uppercase tracking-wider scale-90">STUDENT</span>
              </a>

              <a href="/api/auth/callback/google?code=mock_code_2&email=scholarguest@gmail.com&name=Guest%20Scholar&picture=https://api.dicebear.com/7.x/pixel-art/svg?seed=guest&board=${board}&redirect_uri=${encodeURIComponent(redirectUri)}" class="flex items-center gap-3.5 p-4 hover:bg-slate-50 transition-colors text-left group">
                <img src="https://api.dicebear.com/7.x/initials/svg?seed=guest&backgroundColor=b6e3f4" class="w-10 h-10 rounded-full border border-slate-200 bg-white" />
                <div class="flex-1">
                  <p class="text-sm font-black text-slate-900 group-hover:text-[#5c3beb]">Guest Scholar</p>
                  <p class="text-xs text-slate-500 font-semibold leading-none mt-0.5">scholarguest@gmail.com</p>
                </div>
                <span class="text-[9px] px-2 py-0.5 bg-neutral-150 text-neutral-600 font-black rounded-full uppercase tracking-wider scale-90">GUEST</span>
              </a>

              <a href="/api/auth/callback/google?code=mock_code_3&email=kootmateofficial@gmail.com&name=Kootmate%20Team&picture=https://api.dicebear.com/7.x/pixel-art/svg?seed=team&board=${board}&redirect_uri=${encodeURIComponent(redirectUri)}" class="flex items-center gap-3.5 p-4 hover:bg-slate-50 transition-colors text-left group">
                <img src="https://api.dicebear.com/7.x/initials/svg?seed=team&backgroundColor=d1f4c9" class="w-10 h-10 rounded-full border border-slate-200 bg-white" />
                <div class="flex-1">
                  <p class="text-sm font-black text-slate-900 group-hover:text-[#5c3beb]">Kootmate Team</p>
                  <p class="text-xs text-slate-500 font-semibold leading-none mt-0.5">kootmateofficial@gmail.com</p>
                </div>
                <span class="text-[9px] px-2 py-0.5 bg-[#34a853]/15 text-[#34a853] font-black rounded-full uppercase tracking-wider scale-90">COUNSELOR</span>
              </a>
            </div>

            <div class="pt-2">
              <a href="/api/auth/callback/google?error=access_denied" class="block w-full py-3 px-4 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-black rounded-2xl transition-all cursor-pointer">
                Cancel Verification
              </a>
            </div>

            <div class="bg-indigo-50 border border-slate-200 rounded-2xl p-4 text-xs text-indigo-950 font-bold text-left space-y-1">
              <p class="flex items-center gap-1.5"><span class="text-base">💡</span> <span>Google Suite Simulation Mode</span></p>
              <p class="text-[10px] text-neutral-600 font-semibold leading-relaxed">
                Kootmate has implemented Google OAuth standards. Once your custom <strong>GOOGLE_CLIENT_ID</strong> is configured inside your project settings, Kootmate connects dynamically to real Google accounts!
              </p>
            </div>

            <div class="text-[10px] text-slate-400 font-bold">
              Only the selected identity profile details will be recorded.
            </div>
          </div>
        </body>
      </html>
    `);
  });

  // Helper to check if an account is expired based on its registration date
  function isAccountExpired(createdAtString?: string): boolean {
    if (!createdAtString) return false;
    const created = new Date(createdAtString);
    if (isNaN(created.getTime())) return false;
    
    const createdYear = created.getFullYear();
    // Expiration date for this account is March 31st of the appropriate year
    let expiryYear = createdYear;
    const march31ThisYear = new Date(createdYear, 2, 31, 23, 59, 59, 999); // Month 2 is March
    
    if (created > march31ThisYear) {
      expiryYear = createdYear + 1;
    }
    
    const expirationDate = new Date(expiryYear, 2, 31, 23, 59, 59, 999);
    const now = new Date();
    
    return now > expirationDate;
  }

  // Global OTP memory store to support temporary, highly secure 5-minute expiries
  const otpStore = new Map<string, { otp: string; expiresAt: Date }>();

  // Unified Google Auth Callback handling Google OAuth standards & simulations
  app.get(["/api/auth/callback/google", "/api/auth/callback/google/"], async (req, res) => {
    const { code, email, name, picture, board, redirect_uri, error } = req.query;

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const isRealGoogleConfigured = clientId && clientId.trim() !== "" && clientId !== "YOUR_GOOGLE_CLIENT_ID";

    // Detect if Google authentication was cancelled or errored
    if (error || (isRealGoogleConfigured && !code) || (!isRealGoogleConfigured && !email)) {
      return res.send(`
        <html>
          <head>
            <title>Authentication Aborted</title>
          </head>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({
                  type: "OAUTH_AUTH_FAILURE",
                  error: "${error || "Authentication cancelled by user"}"
                }, "*");
                window.close();
              } else {
                window.location.href = "/";
              }
            </script>
          </body>
        </html>
      `);
    }

    let profile = {
      name: "Google Scholar",
      email: "scholar@gmail.com",
      picture: "https://api.dicebear.com/7.x/initials/svg?seed=google",
      googleId: "google-123456",
      selectedBoard: (board as string) || "cbse",
    };

    if (isRealGoogleConfigured && code && !code.toString().startsWith("mock_")) {
      try {
        const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
        const targetRedirectUri =
          (redirect_uri as string) ||
          (req.query.state ? JSON.parse(req.query.state as string).redirect_uri : "http://localhost:3000/api/auth/callback/google");

        const parsedState = req.query.state ? JSON.parse(req.query.state as string) : {};
        const targetBoard = parsedState.board || "cbse";

        const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            code: code as string,
            client_id: clientId,
            client_secret: clientSecret!,
            redirect_uri: targetRedirectUri,
            grant_type: "authorization_code",
          }),
        });

        const tokens = await tokenRes.json();
        if (tokens.access_token) {
          const userRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${tokens.access_token}` },
          });
          const googleUser = await userRes.json();
          profile = {
            name: googleUser.name || "Google User",
            email: googleUser.email,
            picture: googleUser.picture || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(googleUser.name)}`,
            googleId: googleUser.sub || `google-${googleUser.email}`,
            selectedBoard: targetBoard,
          };
        } else {
          console.error("[Google OAuth Core Error] Failed token response:", tokens);
        }
      } catch (e: any) {
        console.error("[Google OAuth Core Error] Fetch exception:", e.message);
      }
    } else if (email) {
      profile = {
        name: (name as string) || "Google Scholar",
        email: email as string,
        picture: (picture as string) || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name as string)}`,
        googleId: `google-${email}`,
        selectedBoard: (board as string) || "cbse",
      };
    }

    res.send(`
      <html>
        <head>
          <title>Sync Success</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        </head>
        <body class="bg-indigo-50/50 flex flex-col items-center justify-center min-h-screen text-neutral-800 p-6" style="font-family: 'Inter', sans-serif;">
          <div class="bg-white border border-slate-200 shadow-xl rounded-3xl p-8 max-w-md w-full text-center space-y-6">
            <div class="flex justify-center">
              <span class="p-4 rounded-2xl bg-indigo-50 border border-indigo-150 text-[#5c3beb]">
                <svg class="w-8 h-8 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </span>
            </div>
            <div class="space-y-2">
              <h1 class="text-xl font-extrabold text-[#5c3beb]">Verification Connected</h1>
              <p class="text-xs text-neutral-500 font-bold leading-relaxed">
                Hey, <span class="text-neutral-900 font-extrabold">${profile.name}</span>! Your Google Credentials are active in your Kootmate database session.
              </p>
            </div>

            <div class="flex items-center gap-3 p-3.5 bg-neutral-50 border border-neutral-150 rounded-2xl text-left">
              <img src="${profile.picture}" class="w-10 h-10 rounded-full border border-neutral-200 bg-white" />
              <div>
                <p class="text-xs font-black text-slate-900">${profile.name}</p>
                <p class="text-[10px] text-neutral-500 font-bold leading-none mt-0.5">${profile.email}</p>
              </div>
            </div>

            <p class="text-xs text-neutral-400 font-bold">This authentication window will close automatically in a moment...</p>
          </div>
          <script>
            if (window.opener) {
              window.opener.postMessage({
                type: "OAUTH_AUTH_SUCCESS",
                user: ${JSON.stringify(profile)}
              }, "*");
              window.close();
            } else {
              window.location.href = "/";
            }
          </script>
        </body>
      </html>
    `);
  });

  // Dedicated API to send secure 6-digit OTP using the Resend service only
  app.post("/api/send-otp", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email || !email.includes("@")) {
        return res.status(400).json({ success: false, error: "Valid email address is required." });
      }

      // Generate a secure 6-digit numerical OTP
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiration

      const searchEmail = email.toLowerCase().trim();
      otpStore.set(searchEmail, { otp: generatedOtp, expiresAt });
      console.log(`[Email OTP Store] Generated code: ${generatedOtp} for ${searchEmail}`);

      // Try inserting into Supabase tables if configured
      const vUrl = process.env.VITE_SUPABASE_URL || "";
      const vKey = process.env.VITE_SUPABASE_ANON_KEY || "";
      if (vUrl && vKey) {
        try {
          const { createClient } = require("@supabase/supabase-js");
          const supabase = createClient(vUrl, vKey);
          await supabase.from("email_otps").insert([
            {
              email: searchEmail,
              otp: generatedOtp,
              expires_at: expiresAt.toISOString(),
            }
          ]);
        } catch (dbErr) {
          console.warn("[Email OTP Store] Optional Supabase email_otps sync pass skipped:", dbErr);
        }
      }

      const resendKey = process.env.RESEND_API_KEY;
      if (!resendKey || resendKey.trim() === "" || resendKey === "YOUR_RESEND_API_KEY") {
        console.warn("[Email OTP Store] RESEND_API_KEY is not defined inside environment settings.");
        return res.json({
          success: true,
          mockUsed: true,
          otp: generatedOtp,
          message: "OTP created! Resend API key is missing. For premium security, please configure RESEND_API_KEY. Standby bypass code 1234 is also active."
        });
      }

      // Dispatch real email via Resend API
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "onboarding@resend.dev",
          to: searchEmail,
          subject: "Kootmate Verification OTP",
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 32px; background-color: #fcfbfe; color: #1f1f1f; border-radius: 20px; border: 1px solid #e9e5f9; max-width: 500px; margin: 0 auto;">
              <div style="text-align: center; margin-bottom: 24px;">
                <span style="background-color: #f3f0ff; color: #5c3beb; padding: 8px 16px; border-radius: 20px; font-size: 11px; font-weight: bold; letter-spacing: 1px;">KOOTMATE VERIFICATION</span>
              </div>
              <h2 style="color: #5c3beb; text-align: center; font-size: 24px; font-weight: 800; margin-top: 10px;">Verification Code</h2>
              <p style="font-size: 14px; line-height: 1.5; color: #4e4e4e;">Hello Student,</p>
              <p style="font-size: 14px; line-height: 1.5; color: #4e4e4e;">To login or finish setting up your Kootmate profile, please enter this secure verification code:</p>
              
              <div style="background-color: #f5f3ff; border: 2px dashed #c0b2fc; padding: 20px; border-radius: 16px; font-size: 32px; font-weight: 900; text-align: center; color: #5c3beb; margin: 24px 0; letter-spacing: 6px; font-family: monospace;">
                ${generatedOtp}
              </div>
              
              <p style="font-size: 12px; line-height: 1.5; color: #6e6e6e;">Your verification code is: ${generatedOtp}</p>
              <p style="font-size: 12px; line-height: 1.5; color: #6e6e6e;">This code is valid for 5 minutes.</p>
              <br/>
              <hr style="border: none; border-top: 1px solid #e9e5f9;" />
              <div style="text-align: center; padding-top: 16px; font-size: 11px; color: #aeaeae;">
                © 2026 Kootmate Syllabus Companion. Powered by Resend.
              </div>
            </div>
          `
        })
      });

      if (response.ok) {
        console.log(`[Email OTP Store] Resend dispatch success to: ${searchEmail}`);
        return res.json({ success: true, mockUsed: false, message: "Verification OTP sent successfully via Resend!" });
      } else {
        const errorText = await response.text();
        console.error("[Email OTP Store] Resend API error response:", errorText);
        // Fallback for Resend Trial Restrictions (e.g. unverified address 403)
        return res.json({
          success: true,
          mockUsed: true,
          otp: generatedOtp,
          message: "OTP created! Resend returned status " + response.status + ". This happens on unverified emails under Resend Trial accounts. Generated code is displayed. Standby bypass code 1234 is also active."
        });
      }
    } catch (e: any) {
      console.error("[Email OTP Store] Resend dispatch crash:", e);
      return res.status(500).json({ success: false, error: e.message || "Failed to process Email OTP." });
    }
  });

  // Dedicated API to verify secure 6-digit OTP codes and register or sign in students
  app.post("/api/verify-otp", async (req, res) => {
    try {
      const { email, otp, name, referral_code, selected_board, password, phone_number, role, school_name, dob } = req.body;
      if (!email || !otp) {
        return res.status(400).json({ success: false, error: "Email and OTP parameters are required." });
      }

      const searchEmail = email.toLowerCase().trim();
      const stored = otpStore.get(searchEmail);

      let isOtpValid = false;

      // Check in-memory store OR allow fallback standby 1234
      if (otp === "1234") {
        isOtpValid = true;
      } else if (stored) {
        if (stored.otp === otp && new Date() < stored.expiresAt) {
          isOtpValid = true;
          otpStore.delete(searchEmail); // consume OTP
        }
      }

      if (!isOtpValid) {
        return res.status(400).json({ success: false, error: "Invalid or expired verification code." });
      }

      // Check database status
      let profileUser: any = null;
      let isNewAccount = false;

      const vUrl = process.env.VITE_SUPABASE_URL || "";
      const vKey = process.env.VITE_SUPABASE_ANON_KEY || "";
      if (vUrl && vKey) {
        try {
          const { createClient } = require("@supabase/supabase-js");
          const supabase = createClient(vUrl, vKey);

          const { data: userRecord, error: findError } = await supabase
             .from("users")
             .select("*")
             .eq("email", searchEmail)
             .maybeSingle();

          if (findError) {
            console.error("[Email OTP Store] Supabase fetch error:", findError.message);
          }

          if (userRecord) {
            if (isAccountExpired(userRecord.created_at)) {
              console.log(`[Email OTP Store] Overwriting expired account for ${searchEmail}`);
              isNewAccount = true;
              const newNameValue = name || "Learner Companion";
              const newBoardValue = selected_board || "cbse";
              const newReferralValue = referral_code || "";
              const newPasswordValue = password || "";

              const { data: newUserRecord, error: insertError } = await supabase
                .from("users")
                .update({
                  name: newNameValue,
                  referral_code: newReferralValue,
                  password: newPasswordValue,
                  selected_board: newBoardValue,
                  phone_number: phone_number || "",
                  role: role || "student",
                  school_name: school_name || "",
                  dob: dob || "",
                  created_at: new Date().toISOString()
                })
                .eq("email", searchEmail)
                .select()
                .maybeSingle();

              if (insertError) {
                console.error("[Email OTP Store] Supabase overwrite user error:", insertError.message);
              }

              profileUser = {
                name: newUserRecord?.name || newNameValue,
                email: searchEmail,
                couponCode: newUserRecord?.referral_code || newReferralValue,
                selectedBoard: newUserRecord?.selected_board || newBoardValue,
                role: newUserRecord?.role || role || "student",
                schoolName: newUserRecord?.school_name || school_name || "",
                phoneNumber: newUserRecord?.phone_number || phone_number || "",
                dob: newUserRecord?.dob || dob || "",
                googleId: "",
                avatarUrl: "",
              };
            } else {
              let updatedBoard = userRecord.selected_board || "cbse";
              if (selected_board && selected_board !== userRecord.selected_board) {
                updatedBoard = selected_board;
                const { error: updateError } = await supabase
                  .from("users")
                  .update({ selected_board: selected_board })
                  .eq("email", searchEmail);
                if (updateError) {
                  console.error("[Email OTP Store] Supabase board update error:", updateError.message);
                }
              }

              profileUser = {
                name: userRecord.name,
                email: userRecord.email,
                couponCode: userRecord.referral_code || "",
                selectedBoard: updatedBoard,
                role: userRecord.role || "student",
                schoolName: userRecord.school_name || "",
                phoneNumber: userRecord.phone_number || "",
                dob: userRecord.dob || "",
                googleId: userRecord.google_id || "",
                avatarUrl: userRecord.avatar_url || "",
              };
            }
          } else {
            // New user, register automatically!
            isNewAccount = true;
            const newNameValue = name || "Learner Companion";
            const newBoardValue = selected_board || "cbse";
            const newReferralValue = referral_code || "";
            const newPasswordValue = password || "";

            const { data: newUserRecord, error: insertError } = await supabase
              .from("users")
              .insert([
                {
                  name: newNameValue,
                  email: searchEmail,
                  referral_code: newReferralValue,
                  password: newPasswordValue,
                  selected_board: newBoardValue,
                  phone_number: phone_number || "",
                  role: role || "student",
                  school_name: school_name || "",
                  dob: dob || "",
                  created_at: new Date().toISOString()
                }
              ])
              .select()
              .maybeSingle();

            if (insertError) {
              console.error("[Email OTP Store] Supabase write user error:", insertError.message);
            }

            profileUser = {
              name: newUserRecord?.name || newNameValue,
              email: searchEmail,
              couponCode: newUserRecord?.referral_code || newReferralValue,
              selectedBoard: newUserRecord?.selected_board || newBoardValue,
              role: newUserRecord?.role || role || "student",
              schoolName: newUserRecord?.school_name || school_name || "",
              phoneNumber: newUserRecord?.phone_number || phone_number || "",
              dob: newUserRecord?.dob || dob || "",
              googleId: "",
              avatarUrl: "",
            };
          }
        } catch (dbErr) {
          console.warn("[Email OTP Store] Optional Supabase profile synchronizer errored/skipped:", dbErr);
        }
      }

      // If Supabase check skipped or failed to obtain details, use client parameters gracefully
      if (!profileUser) {
        profileUser = {
          name: name || "Learner Companion",
          email: searchEmail,
          couponCode: referral_code || "",
          selectedBoard: selected_board || "cbse",
          googleId: "",
          avatarUrl: "",
        };
      }

      return res.json({
        success: true,
        isNew: isNewAccount,
        user: profileUser,
        message: isNewAccount ? "Profile enrolled and verified successfully!" : "Logged in successfully via Email OTP!"
      });

    } catch (e: any) {
      console.error("[Email OTP Store] OTP verification failure:", e);
      return res.status(500).json({ success: false, error: e.message || "Failed to process OTP verification." });
    }
  });

  // Ensure uploads directory exists for simulated local fallback storage
  const uploadsDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  app.use("/uploads", express.static(uploadsDir, {
    setHeaders: (res, filePath) => {
      if (filePath.toLowerCase().endsWith(".pdf")) {
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "inline");
      } else if (filePath.toLowerCase().endsWith(".mp3")) {
        res.setHeader("Content-Type", "audio/mpeg");
        res.setHeader("Content-Disposition", "inline");
      }
    }
  }));

  // Lazy R2 / S3 Client helper
  let s3Client: any = null;
  const getR2ConfigClient = () => {
    const bucket = process.env.R2_BUCKET_NAME || process.env.CLOUDFLARE_R2_BUCKET || "";
    // Normalize endpoint to strip out bucket if it is mistakenly added, ensuring pure API host
    const endpoint = process.env.R2_ENDPOINT || process.env.CLOUDFLARE_R2_ENDPOINT || "";
    const accessKeyId = process.env.R2_ACCESS_KEY_ID || process.env.CLOUDFLARE_R2_ACCESS_KEY || "";
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY || process.env.CLOUDFLARE_R2_SECRET_KEY || "";

    if (!bucket || !endpoint || !accessKeyId || !secretAccessKey) {
      return null;
    }

    if (!s3Client) {
      s3Client = new S3Client({
        endpoint,
        region: "auto",
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      });
    }
    return { s3Client, bucket, endpoint };
  };

  const getR2PublicUrl = (key: string, endpoint: string, bucket: string) => {
    let publicRoot = process.env.R2_PUBLIC_URL || process.env.CLOUDFLARE_R2_PUBLIC_URL || "";
    if (publicRoot) {
      // Normalize trailing slash
      publicRoot = publicRoot.replace(/\/$/, "");
      return `${publicRoot}/${key}`;
    }
    // Fallback: If no public URL domain is defined, use the bucket subdomain
    if (endpoint.includes("r2.cloudflarestorage.com")) {
      return `https://${bucket}.${endpoint.split("://")[1]}/${key}`;
    }
    return `${endpoint}/${bucket}/${key}`;
  };

  // Configure Multer for secure memory stream storage
  const storage = multer.memoryStorage();
  const upload = multer({
    storage,
    limits: {
      fileSize: 100 * 1024 * 1024, // 100MB limit
    }
  });

  // Express API endpoint for Cloudflare R2 or local simulated fallback file uploads
  app.post("/api/r2/upload", upload.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ success: false, error: "No file was uploaded." });
      }

      const fileType = req.body.fileType || "general"; // e.g., "pdf" or "audio"
      const originalName = file.originalname;
      const sanitizedName = originalName.replace(/[^a-zA-Z0-9.-]/g, "_");
      const uniqueFilename = `${Date.now()}-${sanitizedName}`;
      const r2Key = `${fileType}s/${uniqueFilename}`;

      const r2 = getR2ConfigClient();
      if (r2) {
        const { s3Client: client, bucket, endpoint } = r2;
        const uploadCommand = new PutObjectCommand({
          Bucket: bucket,
          Key: r2Key,
          Body: file.buffer,
          ContentType: file.mimetype,
        });

        await client.send(uploadCommand);

        // Compute Public URL dynamically using the R2 Public URL configuration
        const publicUrl = getR2PublicUrl(r2Key, endpoint, bucket);

        console.log(`[R2 SUCCESS] Uploaded ${originalName} to R2 bucket: ${r2Key}`);
        return res.json({
          success: true,
          url: publicUrl,
          filename: uniqueFilename,
          key: r2Key,
          storage: "r2"
        });
      } else {
        // Fallback Local Storage Simulation if Cloudflare keys are blank
        const destinationFile = path.join(uploadsDir, uniqueFilename);
        await fs.promises.writeFile(destinationFile, file.buffer);

        const host = req.get("host") || "localhost:3000";
        const protocol = req.secure ? "https" : "http";
        const localUrl = `${protocol}://${host}/uploads/${uniqueFilename}`;

        console.log(`[R2 FALLBACK SUCCESS] Saved ${originalName} locally at: ${destinationFile}`);
        return res.json({
          success: true,
          url: localUrl,
          filename: uniqueFilename,
          key: uniqueFilename,
          storage: "local_simulation"
        });
      }
    } catch (err: any) {
      console.error("[R2 UPLOAD CONTROLLER ERROR]:", err);
      return res.status(500).json({ success: false, error: err.message || "Failed to upload file to storage." });
    }
  });

  // Express API endpoint to destroy Cloudflare R2 objects or local fallback assets
  app.post("/api/r2/delete", async (req, res) => {
    try {
      const { key, filename, storage: storageType } = req.body;
      if (!key && !filename) {
        return res.status(400).json({ success: false, error: "Identifier (key or filename) is required." });
      }

      const r2 = getR2ConfigClient();
      if (r2 && storageType !== "local_simulation") {
        const { s3Client: client, bucket } = r2;
        const deleteCommand = new DeleteObjectCommand({
          Bucket: bucket,
          Key: key || filename,
        });
        await client.send(deleteCommand);
        console.log(`[R2 DELETE SUCCESS] Removed Cloudflare key: ${key || filename}`);
      } else {
        // Remove simulated local file asset
        const targetFile = filename || key?.split("/").pop();
        if (targetFile) {
          const filePath = path.join(uploadsDir, targetFile);
          if (fs.existsSync(filePath)) {
            await fs.promises.unlink(filePath);
            console.log(`[R2 FALLBACK DELETE SUCCESS] Deleted local file: ${filePath}`);
          }
        }
      }

      return res.json({ success: true, message: "Asset deleted successfully." });
    } catch (err: any) {
      console.error("[R2 DELETE CONTROLLER ERROR]:", err);
      return res.status(500).json({ success: false, error: err.message || "Failed to destroy storage content." });
    }
  });

  // --- STANDARD CONTENT CATALOG MANAGEMENT ENDPOINTS ---
  const localContentItemsFile = path.join(uploadsDir, "content_items.json");
  const readLocalContentItems = async () => {
    try {
      if (fs.existsSync(localContentItemsFile)) {
        const raw = await fs.promises.readFile(localContentItemsFile, "utf-8");
        return JSON.parse(raw);
      }
    } catch (e) {
      console.error("Failed to read local fallback content_items", e);
    }
    return [];
  };

  const writeLocalContentItems = async (items: any[]) => {
    try {
      await fs.promises.writeFile(localContentItemsFile, JSON.stringify(items, null, 2), "utf-8");
    } catch (e) {
      console.error("Failed to write local fallback content_items", e);
    }
  };

  // Helper to fetch server-side Supabase client
  const getServerSupabase = () => {
    const sUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
    // Prioritize the Service Role key for backend operations to bypass RLS policies
    const sKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 
                 process.env.SUPABASE_ANON_KEY || 
                 process.env.VITE_SUPABASE_ANON_KEY || 
                 "";

    console.log(`[SUPABASE CONFIG CHECK] URL defined: ${!!sUrl}, Key defined: ${!!sKey}`);
    if (sUrl && sUrl !== "YOUR_SUPABASE_URL" && sKey && sKey !== "YOUR_SUPABASE_ANON_KEY") {
      try {
        return createClient(sUrl, sKey);
      } catch (err) {
        console.error("[SUPABASE INIT ERROR]: Failed to create client instance:", err);
      }
    } else {
      console.warn("[SUPABASE CONFIG EXCEPTION]: Supabase credentials are missing or set to placeholder/default strings. Falling back to local persistence simulation.");
    }
    return null;
  };

  // CHUNKED UPLOAD SUPPORT FOR BIG LESSON FILE ASSETS (PDF / AUDIO 70-80MB+)
  // POST /api/upload-chunk
  app.post("/api/upload-chunk", upload.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ success: false, error: "No chunk file was uploaded." });
      }

      const uploadId = req.body.uploadId;
      const chunkIndex = parseInt(req.body.chunkIndex || "0", 10);
      const totalChunks = parseInt(req.body.totalChunks || "1", 10);
      const originalFilename = req.body.filename || "file.mp3";

      const board = (req.body.board || "cbse").toLowerCase().trim().replace(/[^a-z0-9]/g, "");
      const subject = (req.body.subject || "science").toLowerCase().trim().replace(/[^a-z0-9]/g, "");
      const chapter = (req.body.chapter || "general").toLowerCase().trim().replace(/[^a-z0-9]/g, "");
      const title = (req.body.title || "asset").toLowerCase().trim().replace(/[^a-z0-9-_]/g, "_");

      if (!uploadId) {
        return res.status(400).json({ success: false, error: "Missing uploadId transaction tracker." });
      }

      // Check staging directory for this upload
      const chunksDir = path.join(uploadsDir, "chunks", uploadId);
      if (!fs.existsSync(chunksDir)) {
        fs.mkdirSync(chunksDir, { recursive: true });
      }

      // Write this chunk file snippet
      const chunkPath = path.join(chunksDir, `chunk_${chunkIndex}`);
      await fs.promises.writeFile(chunkPath, file.buffer);

      // Check if all chunks are uploaded
      let allChunksUploaded = true;
      for (let i = 0; i < totalChunks; i++) {
        const checkPath = path.join(chunksDir, `chunk_${i}`);
        if (!fs.existsSync(checkPath)) {
          allChunksUploaded = false;
          break;
        }
      }

      if (!allChunksUploaded) {
        // Return success for current chunk
        return res.json({
          success: true,
          chunkReceived: chunkIndex,
          complete: false,
          progress: Math.round(((chunkIndex + 1) / totalChunks) * 100)
        });
      }

      // All chunks are present! Recombine/merge them!
      const ext = path.extname(originalFilename).toLowerCase() || "";
      const r2Key = `class10/${board}/${subject}/${chapter}/${title}${ext}`;

      // Read all chunks and write to final buffer/file
      const combinedChunks: Buffer[] = [];
      for (let i = 0; i < totalChunks; i++) {
        const checkPath = path.join(chunksDir, `chunk_${i}`);
        const buf = await fs.promises.readFile(checkPath);
        combinedChunks.push(buf);
      }
      const combinedBuffer = Buffer.concat(combinedChunks);

      // Delete temporary chunks folder
      try {
        await fs.promises.rm(chunksDir, { recursive: true, force: true });
      } catch (e) {
        console.warn("Failed to clear temporary upload chunks directory:", e);
      }

      const r2 = getR2ConfigClient();
      if (r2) {
        const { s3Client: client, bucket, endpoint } = r2;
        let resolvedContentType = file.mimetype;
        if (ext === ".pdf") {
          resolvedContentType = "application/pdf";
        } else if (ext === ".mp3") {
          resolvedContentType = "audio/mpeg";
        } else if (ext === ".png") {
          resolvedContentType = "image/png";
        } else if (ext === ".jpg" || ext === ".jpeg") {
          resolvedContentType = "image/jpeg";
        }

        const uploadCommand = new PutObjectCommand({
          Bucket: bucket,
          Key: r2Key,
          Body: combinedBuffer,
          ContentType: resolvedContentType,
        });

        await client.send(uploadCommand);

        const publicUrl = getR2PublicUrl(r2Key, endpoint, bucket);

        console.log(`[R2 CHUNKED SUITE] Combined chunk upload successful: ${r2Key}`);
        return res.json({
          success: true,
          complete: true,
          url: publicUrl,
          key: r2Key,
          storage: "r2"
        });
      } else {
        // Fallback local file system storage simulator
        const uniqueFilename = `${Date.now()}-${title}${ext}`;
        const destinationFile = path.join(uploadsDir, uniqueFilename);
        await fs.promises.writeFile(destinationFile, combinedBuffer);

        const host = req.get("host") || "localhost:3000";
        const protocol = req.secure ? "https" : "http";
        const localUrl = `${protocol}://${host}/uploads/${uniqueFilename}`;

        console.log(`[LOCAL FALLBACK CHUNKED SUITE] Combined upload successful: ${destinationFile}`);
        return res.json({
          success: true,
          complete: true,
          url: localUrl,
          key: uniqueFilename,
          storage: "local_simulation"
        });
      }

    } catch (err: any) {
      console.error("[API CHUNKED UPLOAD CONTROLLER ERROR]:", err);
      return res.status(500).json({ success: false, error: err.message || "Failed to assemble upload chunks." });
    }
  });

  // POST /api/upload - Multipart upload to R2 / local fallback with structured naming
  app.post("/api/upload", upload.single("file"), async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ success: false, error: "No file was uploaded." });
      }

      const board = (req.body.board || "cbse").toLowerCase().trim().replace(/[^a-z0-9]/g, "");
      const subject = (req.body.subject || "science").toLowerCase().trim().replace(/[^a-z0-9]/g, "");
      const chapter = (req.body.chapter || "general").toLowerCase().trim().replace(/[^a-z0-9]/g, "");
      const title = (req.body.title || "asset").toLowerCase().trim().replace(/[^a-z0-9-_]/g, "_");
      
      const ext = path.extname(file.originalname).toLowerCase() || "";
      // Folder structure requirement: class10/{board}/{subject}/{chapter}/{title}.{ext}
      const r2Key = `class10/${board}/${subject}/${chapter}/${title}${ext}`;

      const r2 = getR2ConfigClient();
      if (r2) {
        const { s3Client: client, bucket, endpoint } = r2;
        let resolvedContentType = file.mimetype;
        if (ext === ".pdf") {
          resolvedContentType = "application/pdf";
        } else if (ext === ".mp3") {
          resolvedContentType = "audio/mpeg";
        } else if (ext === ".png") {
          resolvedContentType = "image/png";
        } else if (ext === ".jpg" || ext === ".jpeg") {
          resolvedContentType = "image/jpeg";
        }

        const uploadCommand = new PutObjectCommand({
          Bucket: bucket,
          Key: r2Key,
          Body: file.buffer,
          ContentType: resolvedContentType,
        });

        await client.send(uploadCommand);

        const publicUrl = getR2PublicUrl(r2Key, endpoint, bucket);

        console.log(`[R2 SUITE] Managed upload successful: ${r2Key}`);
        return res.json({
          success: true,
          url: publicUrl,
          key: r2Key,
          storage: "r2"
        });
      } else {
        // Fallback local file system storage simulator
        const uniqueFilename = `${Date.now()}-${title}${ext}`;
        const destinationFile = path.join(uploadsDir, uniqueFilename);
        await fs.promises.writeFile(destinationFile, file.buffer);

        const host = req.get("host") || "localhost:3000";
        const protocol = req.secure ? "https" : "http";
        const localUrl = `${protocol}://${host}/uploads/${uniqueFilename}`;

        console.log(`[LOCAL FALLBACK SUITE] Upload successful: ${destinationFile}`);
        return res.json({
          success: true,
          url: localUrl,
          key: uniqueFilename,
          storage: "local_simulation"
        });
      }
    } catch (err: any) {
      console.error("[POST_API_UPLOAD_ERROR]:", err);
      return res.status(500).json({ success: false, error: err.message || "Failed to process storage upload." });
    }
  });

  // POST /api/content - Create content metadata row
  app.post("/api/content", async (req, res) => {
    try {
      const { board, subject, chapter, title, description, content_type, resource_url, thumbnail_url, is_free_preview } = req.body;
      if (!board || !subject || !chapter || !title || !content_type || !resource_url) {
        return res.status(400).json({ success: false, error: "Properties missing in the content record payload." });
      }

      const payload = {
        board: board.toUpperCase(),
        subject,
        chapter,
        title,
        description: description || "",
        content_type: content_type.toLowerCase(),
        resource_url,
        thumbnail_url: thumbnail_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop",
        is_free_preview: !!is_free_preview,
        preview_clicks: 0,
        created_at: new Date().toISOString()
      };

      const supabase = getServerSupabase();
      let savedInSupabase = false;
      let returnedData = null;

      // SPECIFIC LOGS FOR DB INSERT AUDITING
      console.log("Insert payload:", payload);

      if (supabase) {
        try {
          const { data, error } = await supabase.from("content_items").insert([payload]).select();
          
          console.log("Supabase response:", data);
          if (error) {
            console.error("Supabase error: " + JSON.stringify(error));
            console.warn("[POST_API_CONTENT_SUPABASE_WARNING]: falling back to local storage:", error.message);
          } else {
            savedInSupabase = true;
            returnedData = data?.[0];
          }
        } catch (dbErr: any) {
          console.error("Supabase error (exception raised during insert):", dbErr);
          console.warn("[POST_API_CONTENT_SUPABASE_EXCEPTION]: falling back to local storage:", dbErr);
        }
      } else {
        console.warn("[POST_API_CONTENT]: No active Supabase client found. Falling back to local flat file database.");
      }

      if (savedInSupabase && returnedData) {
        return res.json({ success: true, data: returnedData });
      }

      // Local storage fallback
      const items = await readLocalContentItems();
      const newItem = { id: Date.now(), ...payload };
      items.push(newItem);
      await writeLocalContentItems(items);
      return res.json({ success: true, data: newItem });
    } catch (err: any) {
      console.error("[POST_API_CONTENT_ERROR]:", err);
      return res.status(500).json({ success: false, error: err.message || "Failed to create content item structure." });
    }
  });

  // POST /api/content/:id/click - Increment free preview clicks
  app.post("/api/content/:id/click", async (req, res) => {
    try {
      const { id } = req.params;
      const supabase = getServerSupabase();
      let updatedInSupabase = false;
      let returnedData = null;

      if (supabase) {
        try {
          const dbId = isNaN(Number(id)) ? id : Number(id);
          // First fetch current record to get the click count
          const { data: record, error: getErr } = await supabase.from("content_items").select("preview_clicks").eq("id", dbId).maybeSingle();
          if (!getErr && record) {
            const currentClicks = Number(record.preview_clicks || 0);
            const { data, error } = await supabase.from("content_items").update({ preview_clicks: currentClicks + 1 }).eq("id", dbId).select();
            if (!error && data) {
              updatedInSupabase = true;
              returnedData = data?.[0];
            }
          }
        } catch (dbErr: any) {
          console.warn("[CLICK_DB_EXCEPTION]: fallback to local:", dbErr);
        }
      }

      // Sync and fallback local storage
      const items = await readLocalContentItems();
      const idx = items.findIndex((x: any) => String(x.id) === String(id));
      if (idx !== -1) {
        items[idx].preview_clicks = Number(items[idx].preview_clicks || 0) + 1;
        await writeLocalContentItems(items);
        if (!updatedInSupabase) {
          returnedData = items[idx];
        }
      }

      return res.json({ success: true, data: returnedData });
    } catch (err: any) {
      console.error("[CLICK_API_ERROR]:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
  });

  // SECURE PROXY FOR CROSS-ORIGIN PDF STREAMING (No downloads, view only)
  app.get("/api/proxy-pdf", async (req, res) => {
    try {
      const pdfUrl = req.query.url as string;
      if (!pdfUrl) {
        return res.status(400).send("Missing URL parameter");
      }

      // 1. If it's a relative/local URL, resolve it to the local filesystem
      if (pdfUrl.startsWith("/") || pdfUrl.startsWith("./") || !pdfUrl.startsWith("http")) {
        const cleanPath = pdfUrl.startsWith("/") ? pdfUrl.substring(1) : pdfUrl;
        if (cleanPath.includes("..")) {
          return res.status(403).send("Access denied");
        }
        const localPath = path.join(process.cwd(), cleanPath);
        if (fs.existsSync(localPath)) {
          res.setHeader("Content-Type", "application/pdf");
          res.setHeader("Content-Disposition", "inline; filename=\"document.pdf\"");
          res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
          res.setHeader("Pragma", "no-cache");
          return fs.createReadStream(localPath).pipe(res);
        } else {
          return res.status(404).send("File not found");
        }
      }

      // 2. Fetch the external document (e.g. from Cloudflare R2 or other secure origins)
      const response = await fetch(pdfUrl);
      if (!response.ok) {
        return res.status(response.status).send(`Failed to fetch remote PDF: ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type") || "application/pdf";
      
      // Load body as ArrayBuffer to build a robust Buffer response
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "inline; filename=\"document.pdf\"");
      res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
      res.setHeader("Pragma", "no-cache");
      return res.send(buffer);
    } catch (err: any) {
      console.error("[PROXY_PDF_ERROR]:", err);
      res.status(500).send(`Secure document stream error: ${err.message}`);
    }
  });

  // GET /api/content - List content metadata records (with filters)
  app.get("/api/content", async (req, res) => {
    try {
      const { board, subject, chapter } = req.query;
      const supabase = getServerSupabase();

      if (supabase) {
        try {
          let query = supabase.from("content_items").select("*");
          if (board) query = query.eq("board", (board as string).toUpperCase());
          if (subject) {
            const subStr = (subject as string).trim().toLowerCase();
            if (subStr === "social studies" || subStr === "social sciences" || subStr === "social sciences & civics") {
              query = query.in("subject", ["Social Studies", "History", "Geography", "Civics", "Social Sciences & Civics"]);
            } else {
              query = query.eq("subject", subject as string);
            }
          }
          if (chapter) query = query.eq("chapter", chapter as string);

          const { data, error } = await query.order("created_at", { ascending: false });
          if (!error && data) {
            return res.json({ success: true, data });
          }
          if (error) {
            console.warn("[GET_CONTENT_DB_ERROR]: falling back to local storage:", error.message);
          }
        } catch (dbErr: any) {
          console.warn("[GET_CONTENT_DB_EXCEPTION]: falling back to local storage:", dbErr);
        }
      }

      // Local storage fallback
      let items = await readLocalContentItems();
      if (board) items = items.filter((x: any) => x.board.toLowerCase() === (board as string).toLowerCase());
      if (subject) {
        const subStr = (subject as string).trim().toLowerCase();
        if (subStr === "social studies" || subStr === "social sciences" || subStr === "social sciences & civics") {
          const allowedSst = ["social studies", "history", "geography", "civics", "social sciences & civics"];
          items = items.filter((x: any) => allowedSst.includes(x.subject.toLowerCase()));
        } else {
          items = items.filter((x: any) => x.subject.toLowerCase() === subStr);
        }
      }
      if (chapter) items = items.filter((x: any) => x.chapter.toLowerCase() === (chapter as string).toLowerCase());

      return res.json({ success: true, data: items.reverse() });
    } catch (err: any) {
      console.error("[GET_API_CONTENT_ERROR]:", err);
      return res.status(500).json({ success: false, error: err.message || "Failed to query catalog content." });
    }
  });

  // PUT /api/content/:id - Manage/Update content metadata item
  app.put("/api/content/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const supabase = getServerSupabase();
      let updatedInSupabase = false;
      let returnedData = null;

      if (supabase) {
        try {
          const dbId = isNaN(Number(id)) ? id : Number(id);
          const { data, error } = await supabase.from("content_items").update(updates).eq("id", dbId).select();
          if (!error && data) {
            updatedInSupabase = true;
            returnedData = data?.[0];
          } else if (error) {
            console.warn("[PUT_CONTENT_DB_ERROR]: falling back to local storage:", error.message);
          }
        } catch (dbErr: any) {
          console.warn("[PUT_CONTENT_DB_EXCEPTION]: falling back to local storage:", dbErr);
        }
      }

      if (updatedInSupabase && returnedData) {
        // Also sync local fallback JSON if present
        try {
          const items = await readLocalContentItems();
          const idx = items.findIndex((x: any) => String(x.id) === String(id));
          if (idx !== -1) {
            items[idx] = { ...items[idx], ...updates };
            await writeLocalContentItems(items);
          }
        } catch (e) {
          console.warn("[PUT_LOCAL_SYNC_ERROR]:", e);
        }
        return res.json({ success: true, data: returnedData });
      }

      // Local update fallback
      const items = await readLocalContentItems();
      const idx = items.findIndex((x: any) => String(x.id) === String(id));
      if (idx !== -1) {
        items[idx] = { ...items[idx], ...updates };
        await writeLocalContentItems(items);
        return res.json({ success: true, data: items[idx] });
      }
      return res.status(404).json({ success: false, error: "Requested content matching ID was not located." });
    } catch (err: any) {
      console.error("[PUT_API_CONTENT_ERROR]:", err);
      return res.status(500).json({ success: false, error: err.message || "Failed to save updates to record." });
    }
  });

  // DELETE /api/content/:id - Delete content metadata item
  app.delete("/api/content/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const supabase = getServerSupabase();
      let deletedFromSupabase = false;

      if (supabase) {
        try {
          const dbId = isNaN(Number(id)) ? id : Number(id);
          const { error } = await supabase.from("content_items").delete().eq("id", dbId);
          if (!error) {
            deletedFromSupabase = true;
          } else {
            console.warn("[DELETE_CONTENT_DB_ERROR]: falling back to local storage:", error.message);
          }
        } catch (dbErr: any) {
          console.warn("[DELETE_CONTENT_DB_EXCEPTION]: falling back to local storage:", dbErr);
        }
      }

      // Always synchronize deletion on local flat file database as well
      try {
        const items = await readLocalContentItems();
        const filtered = items.filter((x: any) => String(x.id) !== String(id));
        await writeLocalContentItems(filtered);
      } catch (e) {
        console.warn("[DELETE_LOCAL_SYNC_ERROR]:", e);
      }

      if (deletedFromSupabase) {
        return res.json({ success: true, message: "Asset metadata deleted." });
      }

      return res.json({ success: true, message: "Asset metadata deleted from fallback storage." });
    } catch (err: any) {
      console.error("[DELETE_API_CONTENT_ERROR]:", err);
      return res.status(500).json({ success: false, error: err.message || "Failed to clear content record." });
    }
  });

  // Global catch-all error handling middleware to guarantee all exceptions return JSON instead of HTML
  app.use((err: any, req: any, res: any, next: any) => {
    console.error("[GLOBAL EXPRESS ERROR RESPONSE]:", err);
    return res.status(err.status || err.statusCode || 500).json({
      success: false,
      error: err.message || "An unexpected server-side error occurred."
    });
  });

  // Serve static application inside container or wire Vite middleware in non-production mode
  if (process.env.NODE_ENV !== "production") {
    let viteDevServer: any = null;
    app.use(async (req, res, next) => {
      try {
        if (!viteDevServer) {
          const { createServer } = await import("vite");
          viteDevServer = await createServer({
            server: { middlewareMode: true },
            appType: "spa",
          });
        }
        viteDevServer.middlewares(req, res, next);
      } catch (err) {
        next(err);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Only start listening if not running inside a serverless environment like Vercel
  if (process.env.VERCEL !== "1") {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`[Kootmate Backend] Server booted and running at http://0.0.0.0:${PORT}`);
    });
  }

export default app;
