import { FC, useMemo } from 'react';

import Button from '@components/ui/Button';
import FormSelect from '@components/ui/FormSelect';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

type PaginationProps = {
	itemCount: number;
	pageSize: number;
	page: number;
	setPage: (page: number) => void;
};

const Pagination: FC<PaginationProps> = ({
	itemCount,
	pageSize,
	page,
	setPage
}) => {
	const numberOfPages = useMemo(
		() => Math.ceil(itemCount / pageSize),
		[pageSize, itemCount]
	);

	const pagesArray = useMemo(
		() => Array.from({ length: numberOfPages }, (_, i) => i + 1),
		[numberOfPages]
	);

	const handlePageChange = (page: number) => {
		setPage(page);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<>
			{itemCount > 0 && itemCount > pageSize && (
				<div className="mt-10 flex w-full items-center justify-center space-x-2">
					<div>
						<Button
							onClick={() => handlePageChange(page - 1)}
							disabled={page === 1}
							data-testid="left"
						>
							<ChevronLeftIcon className="h-5 w-5" />
						</Button>
					</div>

					<div className="w-20">
						<FormSelect
							value={page}
							options={pagesArray.map((item) => {
								return {
									label: `${item}`,
									value: item
								};
							})}
							onChange={(e) =>
								handlePageChange(parseInt(e.currentTarget.value))
							}
						/>
					</div>

					<div>
						<Button
							onClick={() => handlePageChange(page + 1)}
							disabled={page === numberOfPages}
							data-testid="right"
						>
							<ChevronRightIcon className="h-5 w-5" />
						</Button>
					</div>
				</div>
			)}
		</>
	);
};

export default Pagination;
