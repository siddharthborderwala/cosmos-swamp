import { matchChain } from "@/lib/match";
import { notFound } from "next/navigation";

export async function generateMetadata({
	params,
}: { params: { chainId: string } }) {
	const bestMatch = await matchChain(params.chainId, false);

	if (!bestMatch) {
		return {
			title: "Cosmos Swamp | by Leap",
			description: "All cosmos chains in one place.",
		};
	}

	return {
		title: `${bestMatch.chainName} - Cosmos Swamp | by Leap`,
		description: `${bestMatch.chainName} chain info.`,
		// TODO: title, description and image for twitter and open graph
	};
}

async function ChainPage({ params }: { params: { chainId: string } }) {
	const bestMatch = await matchChain(params.chainId, false);

	if (!bestMatch) {
		return notFound();
	}

	// TODO: get block height from chain RPC
	const blockHeight = "123123";

	// TODO: get price from https://api.leapwallet.io/v2/market/changes?currency=USD&ecosystems=cosmos-ecosystem
	const tokenPrice = 10.01;
	const tokenPriceChange = -0.0423;

	return (
		<div className="h-screen bg-background text-foreground p-8 flex gap-8">
			{/* TODO: Add chain details and token details + price */}
			{/* TODO: add swap widget from @LeapElements with default values for source chain and asset */}
		</div>
	);
}

export default ChainPage;
