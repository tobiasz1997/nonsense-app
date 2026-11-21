import type { Meta, StoryObj } from '@storybook/nextjs';
import Button from '@components/ui/Button';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Popup from './Popup';

const meta = {
	title: 'Components/UI/Popup',
	component: PopupExample,
	tags: ['autodocs'],
	parameters: { layout: 'centered' }
} satisfies Meta<typeof PopupExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

function PopupExample() {
	const t = useTranslations('common');
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className="min-h-64 p-4">
			<Popup
				isOpen={isOpen}
				onOpenChange={setIsOpen}
				contentClassName="w-60 space-y-3"
				trigger={(props) => <Button {...props}>{t('filters')}</Button>}
			>
				<p>{t('noData')}</p>
				<Button onClick={() => setIsOpen(false)}>{t('close')}</Button>
			</Popup>
		</div>
	);
}
