import { WebpayPlus, Options } from "transbank-sdk";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;

  const token = params.get("token_ws");
  const tbkToken = params.get("TBK_TOKEN");


  if (tbkToken) {
    return NextResponse.json({
      status: "canceled",
      tbkToken,
    });
  }


  if (!token) {
    return NextResponse.json(
      { error: "Missing token_ws" },
      { status: 400 }
    );
  }

  const tx = new WebpayPlus.Transaction(
    new Options(
      process.env.WEBPAY_COMMERCE_CODE!, 
      process.env.WEBPAY_API_KEY!,
      "https://webpay3gint.transbank.cl"
    )
  );

  try {
    const result = await tx.commit(token);

    return NextResponse.json({
      status: "success",
      result,
    });

  } catch (err: any) {
    console.log("Commit error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}