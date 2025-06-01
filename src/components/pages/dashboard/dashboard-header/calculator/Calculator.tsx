'use client'
import React, { useState } from 'react';
import { Calculator, Zap, TrendingUp, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface CalculationInputs {
    lastYearPurchasePrice: number;
    lastYearSellingPrice: number;
    annualPriceIncrease: number;
    energyConsumptionWithoutInstallation: number;
    energyConsumptionThisYear: number;
    energyProducedThisYear: number;
    selfConsumptionPercentage: number;
    installationCost: number;
    calculationYears: number;
}

interface YearlyResults {
    year: number;
    purchasePrice: number;
    sellingPrice: number;
    energyProduced: number;
    selfConsumption: number;
    energyFedToGrid: number;
    energyFromGrid: number;
    profitsFromSales: number;
    costWithoutInstallation: number;
    costWithInstallation: number;
    savings: number;
}

const SolarCalculator: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputs, setInputs] = useState<CalculationInputs>({
        lastYearPurchasePrice: 0.60,
        lastYearSellingPrice: 0.45,
        annualPriceIncrease: 5,
        energyConsumptionWithoutInstallation: 4000,
        energyConsumptionThisYear: 4000,
        energyProducedThisYear: 5000,
        selfConsumptionPercentage: 70,
        installationCost: 25000,
        calculationYears: 10
    });

    // Store the inputs used for calculation separately
    const [calculationInputs, setCalculationInputs] = useState<CalculationInputs | null>(null);
    const [results, setResults] = useState<YearlyResults[]>([]);
    const [cumulativeResults, setCumulativeResults] = useState({
        totalSavings: 0,
        totalCostWithoutInstallation: 0,
        totalCostWithInstallation: 0,
        netSavings: 0
    });

    const handleInputChange = (field: keyof CalculationInputs, value: number) => {
        setInputs(prev => ({ ...prev, [field]: value }));
    };

    const calculateSavings = () => {
        // Store the current inputs for calculation
        const inputsForCalculation = { ...inputs };
        setCalculationInputs(inputsForCalculation);

        const yearlyResults: YearlyResults[] = [];
        let cumulativeSavings = 0;
        let cumulativeCostWithout = 0;
        let cumulativeCostWith = 0;

        for (let year = 1; year <= inputsForCalculation.calculationYears; year++) {
            // Energy prices for the given year
            const multiplier = Math.pow(1 + inputsForCalculation.annualPriceIncrease / 100, year - 1);
            const purchasePrice = inputsForCalculation.lastYearPurchasePrice * multiplier;
            const sellingPrice = inputsForCalculation.lastYearSellingPrice * multiplier;

            // Energy calculations
            const selfConsumption = (inputsForCalculation.selfConsumptionPercentage / 100) * inputsForCalculation.energyProducedThisYear;
            const energyFedToGrid = inputsForCalculation.energyProducedThisYear - selfConsumption;
            const energyFromGrid = inputsForCalculation.energyConsumptionThisYear - selfConsumption;

            // Costs and profits
            const profitsFromSales = sellingPrice * energyFedToGrid;
            const costWithoutInstallation = purchasePrice * inputsForCalculation.energyConsumptionWithoutInstallation;
            const costWithInstallation = purchasePrice * energyFromGrid - profitsFromSales;
            const savings = costWithoutInstallation - costWithInstallation;

            cumulativeSavings += savings;
            cumulativeCostWithout += costWithoutInstallation;
            cumulativeCostWith += costWithInstallation;

            yearlyResults.push({
                year,
                purchasePrice,
                sellingPrice,
                energyProduced: inputsForCalculation.energyProducedThisYear,
                selfConsumption,
                energyFedToGrid,
                energyFromGrid,
                profitsFromSales,
                costWithoutInstallation,
                costWithInstallation,
                savings
            });
        }

        const netSavings = cumulativeSavings - inputsForCalculation.installationCost;

        setResults(yearlyResults);
        setCumulativeResults({
            totalSavings: cumulativeSavings,
            totalCostWithoutInstallation: cumulativeCostWithout,
            totalCostWithInstallation: cumulativeCostWith,
            netSavings
        });
    };

    return (
        <div className='hidden sm:block'>
            <Dialog open={isOpen} onOpenChange={setIsOpen} >
                <DialogTrigger asChild>
                    <Button size="lg" className="flex items-center gap-2 cursor-pointer" variant='secondary'>
                        <Calculator className="w-5 h-5" />
                        Solar PV Profitability Calculator
                    </Button>
                </DialogTrigger>
                <DialogContent className=" sm:max-w-[80vw]  max-h-[90vh] overflow-hidden flex flex-col">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-3">
                            <Zap className="w-6 h-6 text-yellow-500" />
                            Solar Panel Profitability Calculator
                        </DialogTitle>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Input panel */}
                            <div className="space-y-6">
                                <Card className='w-full'>
                                    <CardHeader>
                                        <CardTitle className="text-blue-900">Input Parameters</CardTitle>
                                        <CardDescription>
                                            Enter data about your solar installation
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="lastYearPurchasePrice">
                                                    Energy purchase price (last year) [zł/kWh]
                                                </Label>
                                                <Input
                                                    id="lastYearPurchasePrice"
                                                    type="number"
                                                    step="0.01"
                                                    value={inputs.lastYearPurchasePrice}
                                                    onChange={(e) => handleInputChange('lastYearPurchasePrice', parseFloat(e.target.value) || 0)}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastYearSellingPrice">
                                                    Energy selling price (last year) [zł/kWh]
                                                </Label>
                                                <Input
                                                    id="lastYearSellingPrice"
                                                    type="number"
                                                    step="0.01"
                                                    value={inputs.lastYearSellingPrice}
                                                    onChange={(e) => handleInputChange('lastYearSellingPrice', parseFloat(e.target.value) || 0)}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="annualPriceIncrease">
                                                Annual energy price increase [%]
                                            </Label>
                                            <Input
                                                id="annualPriceIncrease"
                                                type="number"
                                                step="0.1"
                                                value={inputs.annualPriceIncrease}
                                                onChange={(e) => handleInputChange('annualPriceIncrease', parseFloat(e.target.value) || 0)}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="energyConsumptionWithoutInstallation">
                                                    Energy consumption without installation [kWh/year]
                                                </Label>
                                                <Input
                                                    id="energyConsumptionWithoutInstallation"
                                                    type="number"
                                                    value={inputs.energyConsumptionWithoutInstallation}
                                                    onChange={(e) => handleInputChange('energyConsumptionWithoutInstallation', parseInt(e.target.value) || 0)}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="energyConsumptionThisYear">
                                                    Energy consumption with installation [kWh/year]
                                                </Label>
                                                <Input
                                                    id="energyConsumptionThisYear"
                                                    type="number"
                                                    value={inputs.energyConsumptionThisYear}
                                                    onChange={(e) => handleInputChange('energyConsumptionThisYear', parseInt(e.target.value) || 0)}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="energyProducedThisYear">
                                                    Energy production [kWh/year]
                                                </Label>
                                                <Input
                                                    id="energyProducedThisYear"
                                                    type="number"
                                                    value={inputs.energyProducedThisYear}
                                                    onChange={(e) => handleInputChange('energyProducedThisYear', parseInt(e.target.value) || 0)}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="selfConsumptionPercentage">
                                                    Self-consumption [%]
                                                </Label>
                                                <Input
                                                    id="selfConsumptionPercentage"
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    value={inputs.selfConsumptionPercentage}
                                                    onChange={(e) => handleInputChange('selfConsumptionPercentage', parseInt(e.target.value) || 0)}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="installationCost">
                                                    Installation cost [zł]
                                                </Label>
                                                <Input
                                                    id="installationCost"
                                                    type="number"
                                                    value={inputs.installationCost}
                                                    onChange={(e) => handleInputChange('installationCost', parseInt(e.target.value) || 0)}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="calculationYears">
                                                    Calculation period [years]
                                                </Label>
                                                <Input
                                                    id="calculationYears"
                                                    type="number"
                                                    min="1"
                                                    max="25"
                                                    value={inputs.calculationYears}
                                                    onChange={(e) => handleInputChange('calculationYears', parseInt(e.target.value) || 1)}
                                                />
                                            </div>
                                        </div>

                                        <Button
                                            onClick={calculateSavings}
                                            className="w-full"
                                            size="lg"
                                        >
                                            <TrendingUp className="w-5 h-5 mr-2" />
                                            Calculate Profitability
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Results panel */}
                            <div className="space-y-6">
                                {results.length > 0 && calculationInputs && (
                                    <>
                                        {/* Summary */}
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2 text-green-900">
                                                    <DollarSign className="w-5 h-5" />
                                                    Cumulative Summary
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <Card>
                                                        <CardContent className="p-3">
                                                            <div className="text-gray-600">Total savings</div>
                                                            <div className="text-xl font-bold text-green-600">
                                                                {cumulativeResults.totalSavings.toLocaleString('en-US', {
                                                                    minimumFractionDigits: 0,
                                                                    maximumFractionDigits: 0
                                                                })}zł
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                    <Card>
                                                        <CardContent className="p-3">
                                                            <div className="text-gray-600">Net profit (after costs)</div>
                                                            <div className={`text-xl font-bold ${cumulativeResults.netSavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                                {cumulativeResults.netSavings.toLocaleString('en-US', {
                                                                    minimumFractionDigits: 0,
                                                                    maximumFractionDigits: 0
                                                                })}zł
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                    <Card>
                                                        <CardContent className="p-3">
                                                            <div className="text-gray-600">Payback period</div>
                                                            <div className="text-xl font-bold text-blue-600">
                                                                {(() => {
                                                                    let cumulativeSavings = 0;
                                                                    for (let i = 0; i < results.length; i++) {
                                                                        cumulativeSavings += results[i].savings;
                                                                        if (cumulativeSavings >= calculationInputs.installationCost) {
                                                                            return `${i + 1} years`;
                                                                        }
                                                                    }
                                                                    return "> " + calculationInputs.calculationYears + " years";
                                                                })()}
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                    <Card>
                                                        <CardContent className="p-3">
                                                            <div className="text-gray-600">ROI</div>
                                                            <div className="text-xl font-bold text-blue-600">
                                                                {((cumulativeResults.netSavings / calculationInputs.installationCost) * 100).toFixed(1)}%
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {/* Annual results table */}
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Detailed Annual Results</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="overflow-x-auto">
                                                    <table className="w-full text-xs">
                                                        <thead className="bg-gray-100">
                                                        <tr>
                                                            <th className="p-2 text-left">Year</th>
                                                            <th className="p-2 text-right">Purchase price [zł/kWh]</th>
                                                            <th className="p-2 text-right">Energy from grid [kWh]</th>
                                                            <th className="p-2 text-right">Energy to grid [kWh]</th>
                                                            <th className="p-2 text-right">Cost without PV [zł]</th>
                                                            <th className="p-2 text-right">Cost with PV [zł]</th>
                                                            <th className="p-2 text-right">Savings [zł]</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {results.map((result) => (
                                                            <tr key={result.year} className="border-b border-gray-200">
                                                                <td className="p-2 font-medium">{result.year}</td>
                                                                <td className="p-2 text-right">{result.purchasePrice.toFixed(3)}</td>
                                                                <td className="p-2 text-right">{Math.max(0, result.energyFromGrid).toFixed(0)}</td>
                                                                <td className="p-2 text-right">{result.energyFedToGrid.toFixed(0)}</td>
                                                                <td className="p-2 text-right">{result.costWithoutInstallation.toFixed(0)}</td>
                                                                <td className="p-2 text-right">{result.costWithInstallation.toFixed(0)}</td>
                                                                <td className="p-2 text-right font-semibold text-green-600">
                                                                    {result.savings.toFixed(0)}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SolarCalculator;