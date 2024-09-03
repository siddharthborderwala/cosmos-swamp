import type { CosmosChainData } from "@leapwallet/elements-hooks";
import Fuse from "fuse.js";

export async function matchChain(
	query: string,
	loose = false,
): Promise<CosmosChainData | null> {
	const response = await fetch(
		"https://assets.leapwallet.io/cosmos-registry/v1/elements-data/chains.json",
	);
	const chains: CosmosChainData[] = await response.json();

	const options = {
		keys: ["chainId", "chainName", "key"],
		threshold: loose ? 0.4 : 0.2,
	};

	const fuse = new Fuse(chains, options);
	const result = fuse.search(query);

	return result.length > 0 ? result[0].item : null;
}
