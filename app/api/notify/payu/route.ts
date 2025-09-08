import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import axios from "axios";

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

  if (
    !tokens["signature"] ||
    tokens["signature"] === "" ||
    !tokens["algorithm"] ||
    tokens["algorithm"] === ""
  ) {
    return false;
  }

  return { signature: tokens.signature, algorithm: tokens.algorithm };
};

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const secondKey = process.env.PAYU_MD5;
  const signature = getSignatureObject(
    req.headers["x-openpayu-signature"] as string,
  );

  if (!signature) {
    return res.status(401).json({ message: "not ok" });
  } else {
    const concatnated = JSON.stringify(req.body) + secondKey;
    const exceptedSignature = crypto
      .createHash("md5")
      .update(concatnated)
      .digest("hex");

    if (signature.signature !== exceptedSignature) {
      return res.status(401).json({ message: "not ok" });
    }
  }

  const token = (
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/admin`, {
      username: "system",
      password: process.env.SYSTEM_PASSWORD,
    })
  ).data.token;

  const orderId = req.body.order.orderId;
  const status = req.body.order.status;

  if (status === "COMPLETED") {
    await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/orders/status/payu`,
      {
        id: orderId,
        value: status === "COMPLETED" ? "paid" : "canceled",
      },
      { headers: { Authorization: `Bearer ${token}` } },
    );
  }

  return res.status(200).json({ message: "ok" });
};
