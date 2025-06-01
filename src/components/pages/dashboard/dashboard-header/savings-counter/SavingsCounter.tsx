import { useState } from "react";

interface Props {
    type: "saved" | "spent";
}

const SavingsCounter = ({ type }: Props) => {
    const [savingCounter] = useState(0.0);

    return (
        <div
            className={`rounded-2xl border-2 ${
                type === "saved"
                    ? "border-primary bg-secondary/20"
                    : "border-gray-400 bg-gray-100"
            }  h-10 items-center gap-2 p-2 text-sm flex`}
        >
            {type === "saved" ? "Saved" : "Spent"}:{" "}
            <span className="text-xl font-bold">{savingCounter}</span> zł
        </div>
    );
};

export default SavingsCounter;
