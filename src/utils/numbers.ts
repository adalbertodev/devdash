export const toPrefixedNumber = (number: number): string => {
	const prefixes = new Map<number, string>([
		[1_000, "k"],
		[1_000_000, "M"],
	]);

	let prefixedNumber = `${number}`;

	for (const [decimalPrefix, prefix] of Array.from(prefixes.entries())) {
		const numberDividedByDecimalPrefix = Math.round(number / decimalPrefix);

		if (numberDividedByDecimalPrefix < 1) {
			break;
		}

		prefixedNumber = `${numberDividedByDecimalPrefix}${prefix}`;
	}

	return prefixedNumber;
};
