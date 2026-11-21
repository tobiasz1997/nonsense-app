import { useReducer } from 'react';

type CalculatorState = {
	isCalculatorOpen: boolean;
	amount: string;
	vat: string;
};

type CalculatorAction =
	| { type: 'toggle' }
	| { type: 'amountChanged'; value: string }
	| { type: 'vatChanged'; value: string };

const INITIAL_STATE: CalculatorState = {
	isCalculatorOpen: false,
	amount: '1',
	vat: '0'
};

export const useCurrencyCalculator = (rate: number) => {
	const [state, dispatch] = useReducer(calculatorReducer, INITIAL_STATE);

	const parsedAmount = parseCalculatorNumber(state.amount);
	const parsedVat = parseCalculatorNumber(state.vat);
	const calculatedValue =
		parsedAmount !== undefined && parsedVat !== undefined
			? parsedAmount * (1 + parsedVat / 100) * rate
			: undefined;
	const hasValidResult =
		calculatedValue !== undefined && Number.isFinite(calculatedValue);

	const handleToggleCalculator = () => {
		dispatch({ type: 'toggle' });
	};

	const handleAmountChange = (value: string) => {
		dispatch({ type: 'amountChanged', value });
	};

	const handleVatChange = (value: string) => {
		dispatch({ type: 'vatChanged', value });
	};

	return {
		...state,
		parsedAmount,
		parsedVat,
		calculatedValue,
		hasValidResult,
		handleToggleCalculator,
		handleAmountChange,
		handleVatChange
	};
};

const calculatorReducer = (
	state: CalculatorState,
	action: CalculatorAction
): CalculatorState => {
	switch (action.type) {
		case 'toggle':
			return { ...INITIAL_STATE, isCalculatorOpen: !state.isCalculatorOpen };
		case 'amountChanged':
			return { ...state, amount: action.value };
		case 'vatChanged':
			return { ...state, vat: action.value };
	}
};

const parseCalculatorNumber = (value: string): number | undefined => {
	const normalized = value.trim().replace(',', '.');
	if (!/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(normalized)) {
		return undefined;
	}
	const number = Number(normalized);
	return Number.isFinite(number) ? number : undefined;
};
