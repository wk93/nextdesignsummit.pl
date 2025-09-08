import crypto from "crypto";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

interface Signature {
  signature: string;
  algorithm: string;
}

const getSignatureObject = (signature?: string): Signature | false => {
  if (!signature) {
    return false;
  }

  const parts = signature.split(";");
  const tokens: Record<string, string> = {};
  parts.forEach((part) => {
    const tok = part.split("=");
    tokens[tok[0]] = tok[1];
  });

  if (!tokens["signature"] || !tokens["algorithm"]) {
    return false;
  }

  return { signature: tokens.signature, algorithm: tokens.algorithm };
};

export async function POST(req: NextRequest) {
  try {
    const secondKey = process.env.PAYU_MD5;
    const signature = getSignatureObject(
      req.headers.get("x-openpayu-signature") ?? undefined,
    );

    if (!signature) {
      return NextResponse.json({ message: "not ok" }, { status: 401 });
    }

    const body = await req.json();

    const concatnated = JSON.stringify(body) + secondKey;
    const expectedSignature = crypto
      .createHash("md5")
      .update(concatnated)
      .digest("hex");

    if (signature.signature !== expectedSignature) {
      return NextResponse.json({ message: "not ok" }, { status: 401 });
    }

    const token = (
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/admin`, {
        username: "system",
        password: process.env.SYSTEM_PASSWORD,
      })
    ).data.token;

    const orderId = body.order.orderId;
    const status = body.order.status;

    if (status === "COMPLETED") {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/status/payu`,
        {
          id: orderId,
          value: "paid",
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
    }

    return NextResponse.json({ message: "ok" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
