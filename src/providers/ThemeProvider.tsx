import { localStorageGet, localStorageSet } from '@utils/localStorage';
import {
	createContext,
	FC,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useState
} from 'react';
import { THEME_KEY } from '../const/storageKeys.const';

type ThemeType = 'light' | 'dark';
type ThemeContext = {
	theme: ThemeType;
	setNewTheme: (type: ThemeType) => void;
};

const ThemeContext = createContext<ThemeContext>({} as ThemeContext);

type Props = {
	children: ReactNode;
};

const ThemeProvider: FC<Props> = (props) => {
	const [theme, setTheme] = useState<ThemeType>('light');

	const setNewTheme = useCallback((type: ThemeType) => {
		if (type === 'dark') {
			document.documentElement.classList.add('dark');
			setTheme('dark');
			localStorageSet(THEME_KEY, 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			setTheme('light');
			localStorageSet(THEME_KEY, 'light');
		}
	}, []);

	useEffect(() => {
		const theme = localStorageGet(THEME_KEY);
		if (
			theme === 'dark' ||
			(!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			setNewTheme('dark');
		} else {
			setNewTheme('light');
		}
	}, [setNewTheme]);

	return (
		<ThemeContext.Provider value={{ theme, setNewTheme }}>
			{props.children}
		</ThemeContext.Provider>
	);
};

export const useThemeContext = () => useContext<ThemeContext>(ThemeContext);
export default ThemeProvider;
