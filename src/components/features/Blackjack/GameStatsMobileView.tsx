import { FC, useState } from 'react';
import GameResultPanel from '@components/features/Blackjack/GameResultPanel';
import GameStatsPanel from '@components/features/Blackjack/GameStatsPanel';
import PlayerStatsPanel from '@components/features/Blackjack/PlayerStatsPanel';
import Button from '@components/ui/Button';
import Modal from '@components/ui/Modal';
import ModalBox from '@components/ui/ModalBox';

const GameStatsMobileView: FC = () => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	return (
		<>
			<Button
				size="small"
				variant="secondary"
				onClick={() => setIsModalVisible(true)}
			>
				stats
			</Button>

			{isModalVisible && (
				<Modal>
					<ModalBox onClose={() => setIsModalVisible(false)}>
						<div className="gap-3 flex-col flex mt-6">
							<GameResultPanel />
							<PlayerStatsPanel />
							<GameStatsPanel />
						</div>
					</ModalBox>
				</Modal>
			)}
		</>
	);
};

export default GameStatsMobileView;
