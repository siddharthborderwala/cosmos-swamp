'use client'

import { CircleNotch, MagnifyingGlass } from "@phosphor-icons/react";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			disabled={pending}
			className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
		>
			{pending ? <CircleNotch size={20} /> : <MagnifyingGlass size={20} />}
		</button>
	);
}