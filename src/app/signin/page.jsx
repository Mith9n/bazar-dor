"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

function GoogleIcon() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4 shrink-0"
        >
            <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.31v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.09Z"
            />
            <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.15v2.84A11 11 0 0 0 12 23Z"
            />
            <path
                fill="#FBBC05"
                d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.15a11 11 0 0 0 0 9.88l3.69-2.84Z"
            />
            <path
                fill="#EA4335"
                d="M12 4.37c1.62 0 3.06.56 4.21 1.64l3.15-3.15A10.55 10.55 0 0 0 12 0 11 11 0 0 0 2.15 7.06l3.69 2.84C6.71 7.3 9.14 4.37 12 4.37Z"
            />
        </svg>
    );
}

function GitHubIcon() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4 shrink-0 fill-current"
        >
            <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.59 1.21 3.22.93.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.04-1.14 3.04-1.14.61 1.54.23 2.68.12 2.96.72.78 1.15 1.77 1.15 2.99 0 4.29-2.62 5.23-5.11 5.51.4.35.75 1.03.75 2.08v3.06c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
        </svg>
    );
}

export default function SignInPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!email || !password) {
            setError("Please enter your email and password.");
            return;
        }

        setLoading(true);

        try {
            const { data, error } = await signIn.email({
                email,
                password,
            });

            if (error) {
                setError(error.message || "Invalid email or password.");
                return;
            }

            if (data) {
                toast.success("লগইন সফল হয়েছে!");
                router.push("/");
                router.refresh();
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = async (provider) => {
        setError("");
        setSocialLoading(provider);

        try {
            await signIn.social({
                provider,
                callbackURL: "/",
            });
        } catch (err) {
            setError("Social login failed. Please try again.");
            setSocialLoading("");
        }
    };

    return (
        <main className="page-container min-h-screen bg-[#F0F5F0] flex items-center justify-center py-12">
            <div className="w-full max-w-md">

                <div className="text-center mb-8">

                    <h1 className="text-3xl font-bold text-gray-900">
                        সাইন ইন
                    </h1>

                    <p className="mt-2 text-gray-500">
                        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-7">
                    <form onSubmit={handleSubmit} className="space-y-5">

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Email Address
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setError("");
                                }}
                                required
                                autoComplete="email"
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError("");
                                    }}
                                    required
                                    autoComplete="current-password"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 pr-12 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                                <p className="text-sm text-red-600">
                                    {error}
                                </p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-xl bg-green-600 px-4 py-3.5 font-semibold text-white shadow-md transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <div className="relative my-7">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200" />
                        </div>

                        <div className="relative flex justify-center">
                            <span className="bg-white px-4 text-sm text-gray-400">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <button
                            type="button"
                            onClick={() => handleSocialLogin("google")}
                            disabled={socialLoading !== ""}
                            className="inline-flex min-w-0 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-2.5 py-2.5 text-sm font-semibold text-gray-800 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <GoogleIcon />
                            <span className="whitespace-nowrap">
                                {socialLoading === "google"
                                    ? "সংযোগ হচ্ছে..."
                                    : "Google দিয়ে চালিয়ে যান"}
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={() => handleSocialLogin("github")}
                            disabled={socialLoading !== ""}
                            className="inline-flex min-w-0 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-2.5 py-2.5 text-sm font-semibold text-gray-800 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <GitHubIcon />
                            <span className="whitespace-nowrap">
                                {socialLoading === "github"
                                    ? "সংযোগ হচ্ছে..."
                                    : "GitHub দিয়ে চালিয়ে যান"}
                            </span>
                        </button>
                    </div>

                    <p className="text-center text-sm text-gray-500 mt-7">
                       অ্যাকাউন্ট নেই?{" "}
                        <Link
                            href="/signup"
                            className="font-semibold text-green-600 hover:text-green-700"
                        >
                        সাইন আপ করুন
                        </Link>
                    </p>
                </div>
            </div>

        </main>
    );
}