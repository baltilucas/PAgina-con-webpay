export async function GET(req: Request) {
const { searchParams: params } = new URL(req.url)
  const price = params.get("price")

  return Response.json({ message: "Hello from API!", price });
}