import { NextResponse, connection } from "next/server";

const API_URL = "https://api.abcz.workers.dev/api/bazardor/categories";

export async function GET() {
    await connection();

    try {
        const response = await fetch(API_URL, {
            next: { revalidate: 60 },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: "Categories API failed" },
                { status: response.status }
            );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error("Categories API returned invalid data");
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Categories API error:", error);

        return NextResponse.json(
            { error: "Failed to load categories" },
            { status: 500 }
        );
    }
}
