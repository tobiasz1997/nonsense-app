import Link from 'next/link';
import { useEffect } from 'react';
import { getUsers } from '@api/users.api';
import Pagination from '@components/ui/Pagination';
import useNumberHelper from '@hooks/useNumberHelper';
import { IUser } from '@interfaces/IUser';
import { AppPage } from '@interfaces/appPage';
import { filteredData, setPage } from '@store/slices/users.slice';
import { useAppDispatch, useAppSelector } from '@store/store';

const UsersPage: AppPage = () => {
	const users = useAppSelector(
		(state) => filteredData(state.usersSlice) as IUser[]
	);
	const status = useAppSelector((state) => state.usersSlice.status);
	const usersData = useAppSelector((state) => state.usersSlice);
	const dispatch = useAppDispatch();

	const { convertNumberToArrayOfNumbers } = useNumberHelper();

	useEffect(() => {
		status === 'idle' && dispatch(getUsers());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSetPage = (page: number) => {
		dispatch(setPage(page));
	};

	return (
		<div className="na-p-page space-y-5">
			<h1 className="na-title">Users</h1>

			<section className="space-y-5 overflow-x-scroll rounded-xl bg-pistachio p-5 shadow-xl dark:bg-zinc-500">
				<table className="w-full rounded-xl border-2 border-orange">
					<thead className="hidden md:table-header-group">
						<tr className="w-full border-b border-orange text-left font-bold text-green-dark dark:text-pistachio">
							<th className="w-[1fr] p-3">Name</th>
							<th className="p-3">Email</th>
							<th className="p-3">Phone</th>
							<th className="p-3">Website</th>
						</tr>
					</thead>
					<tbody>
						{status === 'loading' &&
							convertNumberToArrayOfNumbers(5).map((x) => (
								<tr
									key={x}
									className="grid border-b border-orange sm:grid-cols-2 md:table-row"
								>
									<td>
										<div className="h-5 m-1 md:m-3 animate-pulse rounded bg-yellow" />
									</td>
									<td>
										<div className="h-5 m-1 md:m-3 animate-pulse rounded bg-yellow" />
									</td>
									<td>
										<div className="h-5 m-1 md:m-3 animate-pulse rounded bg-yellow" />
									</td>
									<td>
										<div className="h-5 m-1 md:m-3 animate-pulse rounded bg-yellow" />
									</td>
								</tr>
							))}
						{status === 'succeeded' &&
							(users.length > 0 ? (
								users.map((user) => (
									<tr
										key={user.id}
										className="grid border-b border-orange text-sm dark:text-pistachio sm:grid-cols-2 md:table-row"
									>
										<td className="col-span-1 p-1 font-bold md:p-3">
											{user.name}
										</td>
										<td className="p-1 md:p-3">{user.email}</td>
										<td className="p-1 md:p-3">{user.phone}</td>
										<td className="p-1 md:p-3">
											<Link href={user.website} className="hover:text-green">
												{user.website}
											</Link>
										</td>
									</tr>
								))
							) : (
								<tr className="text-sm dark:text-pistachio flex justify-center md:block">
									<td className="p-1 md:p-3">No data</td>
								</tr>
							))}
					</tbody>
				</table>

				<Pagination
					itemCount={usersData.users.length}
					pageSize={usersData.pageSize}
					page={usersData.page}
					setPage={handleSetPage}
				/>
			</section>
		</div>
	);
};

UsersPage.layoutType = 'full';
export default UsersPage;
