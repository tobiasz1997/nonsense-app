import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { FC } from 'react';
import ThemeTileCheckbox from '@components/features/Header/ThemeTileCheckbox';
import { useThemeContext } from '@providers/ThemeProvider';

const ThemePanel: FC = () => {
	const { theme, setNewTheme } = useThemeContext();

	return (
		<div className="flex h-full p-2">
			<ThemeTileCheckbox
				checked={theme === 'light'}
				icon={<SunIcon className="text-yellow" />}
				styles={
					'peer-checked:bg-beige rounded-l border-y border-l border-green-dark peer-checked:text-orange'
				}
				onChange={() => setNewTheme('light')}
			/>
			<ThemeTileCheckbox
				checked={theme === 'dark'}
				icon={<MoonIcon className="text-cyan-500" />}
				styles={
					'peer-checked:bg-zinc-700 rounded-r border-y border-r border-green-dark peer-checked:text-cyan-500'
				}
				onChange={() => setNewTheme('dark')}
			/>
		</div>
	);
};

export default ThemePanel;
