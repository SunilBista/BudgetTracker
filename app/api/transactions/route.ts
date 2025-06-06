import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(transactions);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, amount, description, category, currency } = body;
    const newTransaction = await prisma.transaction.create({
      data: {
        type,
        amount,
        description,
        category,
        currency,
      },
    });
    return NextResponse.json(newTransaction);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add transaction" },
      { status: 500 }
    );
  }
}
