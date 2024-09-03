import { matchChain } from "@/lib/match";

// TODO: implement search route using matchChain
export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const query = searchParams.get("q");

	if (!query) {
		return new Response(null, { status: 400 });
	}

	const chain = await matchChain(query);

	return new Response(JSON.stringify(chain), { status: 200 });
}
