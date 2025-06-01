import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useMemo, useState } from "react";
import { PRICE_PER_KWH } from "@/constants/pricing";

interface Props {
	title: string;
	currentValue: number;
	maxValue: number;
	totalValue: number;
	type?: "prod" | "use";
}

export const AnimatedNumber = ({
	value,
	duration = 500,
}: {
	value: number;
	duration?: number;
}) => {
	const [displayValue, setDisplayValue] = useState(0);
	const [hasAnimated, setHasAnimated] = useState(false);

	useEffect(() => {
		if (hasAnimated) {
			setDisplayValue(value);
			return;
		}

		let startTime: number;
		let animationFrame: number;

		const animate = (timestamp: number) => {
			if (!startTime) startTime = timestamp;
			const progress = Math.min((timestamp - startTime) / duration, 1);

			setDisplayValue(value * progress);

			if (progress < 1) {
				animationFrame = requestAnimationFrame(animate);
			} else {
				setHasAnimated(true);
			}
		};

		animationFrame = requestAnimationFrame(animate);

		return () => {
			if (animationFrame) {
				cancelAnimationFrame(animationFrame);
			}
		};
	}, [value, duration, hasAnimated]);

	return <span>{Number(displayValue.toLocaleString()).toFixed(2)}</span>;
};

const HomeCardWithText = ({
	title,
	currentValue,
	maxValue,
	totalValue,
	type,
}: Props) => {
	const money = useMemo(() => totalValue * PRICE_PER_KWH, [totalValue]);

	const cardStyles = useMemo(
		() =>
			type === "prod"
				? "border-primary bg-secondary/20"
				: type === "use"
				? "border-destructive bg-destructive/10"
				: "border-blue-500",
		[type]
	);
console.log('totalValue', totalValue)
	return (
		<Card
			className={`border-2 bg-white ${cardStyles} min-w-[200px] gap-2 py-4`}
		>
			<CardHeader className="px-3">
				<CardTitle className="text-3xl whitespace-nowrap">{title}</CardTitle>
			</CardHeader>
			<CardContent className="px-2">
				<div className="text-end font-extrabold">
					<span className="text-6xl">
						<AnimatedNumber value={totalValue} duration={1000} />{" "}
					</span>
					kWh
				</div>
				<div className="flex items-center justify-between px-2">
					<span>Current</span>
					<span className="font-bold">
						<span className="text-xl">
							<AnimatedNumber value={currentValue} duration={800} />{" "}
						</span>
						kWh
					</span>
				</div>
				<div className="flex items-center justify-between px-2">
					<span>Maximum</span>
					<span className="font-bold">
						<span className="text-xl">
							<AnimatedNumber value={maxValue} duration={800} />{" "}
						</span>
						kWh
					</span>
				</div>
				<div className="flex items-center justify-between px-2">
					<span>{type === "prod" ? "Saved" : "Spent"} money</span>
					<span className="font-bold">
						<span className="text-xl">
							<AnimatedNumber value={money} duration={800} />{" "}
						</span>
						zł
					</span>
				</div>
			</CardContent>
		</Card>
	);
};
export default HomeCardWithText;
