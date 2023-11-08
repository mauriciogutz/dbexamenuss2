import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql";

export async function GET() {
    try {
        const results = await conn.query("SELECT * FROM properties");
        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const { name, address, state } = await request.json();
        if (!name || !address || !state) {
            return NextResponse.json(
                { message: "Nombre, dirección y estado son requeridos" },
                { status: 400 }
            );
        }

        const result = await conn.query("INSERT INTO properties SET ?", {
            name,
            address,
            state
        });
        return NextResponse.json({
            name,
            address,
            state,
            id: result.insertId
        });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}