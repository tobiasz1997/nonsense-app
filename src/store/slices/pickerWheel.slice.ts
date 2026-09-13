import { decryptJson } from '@api/crypto.api';
import { WheelOption } from '@interfaces/wheelOption';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { colorList } from '@utils/lists/color-list';
import { shuffleArray } from '@utils/shuffle';
import { v4 as uuidv4 } from 'uuid';

type pickerWheelStateType = {
	winner: WheelOption | null;
	options: WheelOption[];
	winnerModal: boolean;
	optionsFormModal: boolean;
	optionFormModal: boolean;
	optionSettings: boolean;
	getSetOptionsModal: boolean;
	editedOption: WheelOption | null;
};

const initialState: pickerWheelStateType = {
	winner: null,
	// options: [
	// {
	// 	id: uuidv4(),
	// 	name: 'Adam Kowaslki',
	// 	color: '#eab308',
	// 	active: true,
	// 	stars: 1
	// },
	// {
	// 	id: uuidv4(),
	// 	name: 'Jan Powilok-Smyczek',
	// 	color: '#f97316',
	// 	active: true,
	// 	stars: 0
	// },
	// {
	// 	id: uuidv4(),
	// 	name: 'Sebastian Walaszek',
	// 	color: '#ef4444',
	// 	active: true,
	// 	stars: 2
	// },
	// { id: uuidv4(), name: 'Zbigniew Rudzki', color: '#ec4899', active: true },
	// {
	// 	id: uuidv4(),
	// 	name: 'Adam Kowaslki',
	// 	color: '#eab308',
	// 	active: true,
	// 	stars: 1
	// },
	// {
	// 	id: uuidv4(),
	// 	name: 'Jan Powilok-Smyczek',
	// 	color: '#f97316',
	// 	active: true,
	// 	stars: 0
	// },
	// {
	// 	id: uuidv4(),
	// 	name: 'Sebastian Walaszek',
	// 	color: '#ef4444',
	// 	active: true,
	// 	stars: 2
	// },
	// { id: uuidv4(), name: 'Zbigniew Rudzki', color: '#ec4899', active: true },
	// {
	// 	id: uuidv4(),
	// 	name: 'Adam Kowaslki',
	// 	color: '#eab308',
	// 	active: true,
	// 	stars: 1
	// },
	// {
	// 	id: uuidv4(),
	// 	name: 'Jan Powilok-Smyczek',
	// 	color: '#f97316',
	// 	active: true,
	// 	stars: 0
	// },
	// {
	// 	id: uuidv4(),
	// 	name: 'Sebastian Walaszek',
	// 	color: '#ef4444',
	// 	active: true,
	// 	stars: 2
	// },
	// { id: uuidv4(), name: 'Zbigniew Rudzki', color: '#ec4899', active: true }
	// ],
	options: [],
	winnerModal: false,
	optionsFormModal: false,
	optionFormModal: false,
	optionSettings: false,
	getSetOptionsModal: false,
	editedOption: null
};

const pickerWheelSlice = createSlice({
	name: 'pickerWheel',
	initialState: initialState,
	reducers: {
		setWinner: (state, action: PayloadAction<WheelOption>) => {
			state.winner = action.payload;
			state.winnerModal = true;
		},
		clearWinner: (state) => {
			state.winner = null;
		},
		clearWinnerAndCloseModal: (state) => {
			state.winner = null;
			state.winnerModal = false;
		},
		closeWinnerModal: (state) => {
			state.winnerModal = false;
		},
		openManageOptionsFormModal: (state) => {
			state.optionsFormModal = true;
		},
		openGetSetOptionsModal: (state) => {
			state.getSetOptionsModal = true;
		},
		closeGetSetOptionsModal: (state) => {
			state.getSetOptionsModal = false;
		},
		openManageOptionFormModal: (
			state,
			action: PayloadAction<string | undefined>
		) => {
			if (action.payload) {
				state.editedOption =
					state.options.find((option) => option.id === action.payload) ?? null;
			}
			state.optionFormModal = true;
		},
		clearOptionsAndCloseModal: (state) => {
			state.options = [];
			state.optionsFormModal = false;
		},
		closeManageOptionsFormModal: (state) => {
			state.optionsFormModal = false;
		},
		closeManageOptionFormModal: (state) => {
			state.editedOption = null;
			state.optionFormModal = false;
		},
		showHideOptionSettings: (state) => {
			state.optionSettings = !state.optionSettings;
		},
		addOptions: (state, action: PayloadAction<string[]>) => {
			state.options = action.payload.map(
				(name, index) =>
					({
						id: uuidv4(),
						name,
						active: true,
						stars: 0,
						color: colorList[index % colorList.length]
					}) as WheelOption
			);
			state.optionsFormModal = false;
		},
		addOption: (state, action: PayloadAction<WheelOption>) => {
			state.options.push({
				id: uuidv4(),
				name: action.payload.name,
				active: action.payload.active,
				stars: action.payload.stars,
				color: action.payload.color
			});
			state.editedOption = null;
			state.optionFormModal = false;
		},
		editOption: (state, action: PayloadAction<WheelOption>) => {
			const index = state.options.findIndex((x) => x.id === action.payload.id);
			state.options[index] = {
				id: action.payload.id,
				name: action.payload.name,
				active: action.payload.active,
				stars: action.payload.stars,
				color: action.payload.color
			};
			state.editedOption = null;
			state.optionFormModal = false;
		},
		deleteOption: (state, action: PayloadAction<string>) => {
			state.options = state.options.filter((x) => x.id !== action.payload);
		},
		manageOptionActive: (
			state,
			action: PayloadAction<{ active: boolean; id: string }>
		) => {
			const index = state.options.findIndex((x) => x.id === action.payload.id);
			state.options[index].active = action.payload.active;
		},
		shuffleOptions: (state) => {
			state.options = shuffleArray(state.options);
		},
		setStarRating: (
			state,
			action: PayloadAction<{ star: number; id: string }>
		) => {
			const index = state.options.findIndex((x) => x.id === action.payload.id);
			state.options[index].stars = action.payload.star;
		},
		setColor: (state, action: PayloadAction<{ color: string; id: string }>) => {
			const index = state.options.findIndex((x) => x.id === action.payload.id);
			state.options[index].color = action.payload.color;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(decryptJson.fulfilled, (state, action) => {
			state.options = action.payload.data;
			state.getSetOptionsModal = false;
		});
	}
});

export const {
	setWinner,
	clearWinner,
	clearWinnerAndCloseModal,
	closeWinnerModal,
	openManageOptionsFormModal,
	openManageOptionFormModal,
	openGetSetOptionsModal,
	closeManageOptionsFormModal,
	closeManageOptionFormModal,
	clearOptionsAndCloseModal,
	closeGetSetOptionsModal,
	showHideOptionSettings,
	manageOptionActive,
	addOptions,
	addOption,
	editOption,
	deleteOption,
	shuffleOptions,
	setStarRating,
	setColor
} = pickerWheelSlice.actions;

export default pickerWheelSlice.reducer;
