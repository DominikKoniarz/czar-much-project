import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "./lib/prisma";

export default async function middleware(_: NextRequest) {
	return NextResponse.next();
}
