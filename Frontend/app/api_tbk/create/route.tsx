import { WebpayPlus, Options } from "transbank-sdk";

export async function POST(req: Request) {
  const { amount, orderId } = await req.json(); // <-- read JSON body

  const buyOrder = orderId ?? "ORDER-" + Date.now();
  const sessionId = "SESSION-" + Math.random();

  const tx = new WebpayPlus.Transaction(
    new Options(
      process.env.WEBPAY_COMMERCE_CODE ?? "",
      process.env.WEBPAY_API_KEY ?? "",
      "https://webpay3gint.transbank.cl"
    )
  );

  const returnUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api_tbk/return`;

  const response = await tx.create(
    buyOrder,
    sessionId,
    amount, // <-- use the amount you received
    returnUrl
  );

  return Response.json(response);
}
