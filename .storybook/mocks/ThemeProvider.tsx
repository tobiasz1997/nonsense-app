import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { useThemeContext as useAppThemeContext } from '../../src/providers/ThemeProvider';

export { default } from '../../src/providers/ThemeProvider';

export type ThemeValue = ReturnType<typeof useAppThemeContext>;

type Props = PropsWithChildren<{
	initialTheme: ThemeValue['theme'];
}>;

const StoryThemeContext = createContext<ThemeValue | null>(null);

export function ThemeStoryProvider({ children, initialTheme }: Props) {
	const [theme, setNewTheme] = useState(initialTheme);

	return (
		<StoryThemeContext.Provider value={{ theme, setNewTheme }}>
			<div className={theme === 'dark' ? 'dark' : undefined}>{children}</div>
		</StoryThemeContext.Provider>
	);
}

export function useThemeContext(): ThemeValue {
	const storyTheme = useContext(StoryThemeContext);
	const appTheme = useAppThemeContext();

	return storyTheme ?? appTheme;
}
