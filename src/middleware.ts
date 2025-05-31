import { NextResponse } from "next/server";
// import { prisma } from "./lib/prisma";

export default async function middleware() {
    return NextResponse.next();
}
