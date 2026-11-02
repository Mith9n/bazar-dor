"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCallbackURL } from "@/lib/auth-client";

/**
 * সাইন ইন ↔ সাইন আপ লিংকে callbackURL টানে নিয়ে যায়,
 * যাতে লগইন ফ্লোর মাঝখানেও মূল গন্তব্য না হারায়।
 */
export default function CallbackLink({
    href,
    children,
    className,
}) {
    const router = useRouter();

    return (
        <Link
            href={href}
            className={className}
            onClick={(event) => {
                const callbackURL = getCallbackURL(null);

                if (!callbackURL) return;

                event.preventDefault();

                const separator = href.includes("?") ? "&" : "?";

                router.push(
                    `${href}${separator}callbackURL=${encodeURIComponent(
                        callbackURL
                    )}`
                );
            }}
        >
            {children}
        </Link>
    );
}
