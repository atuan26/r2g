import { useMemo } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import {
	useFlexLayout,
	usePagination,
	useResizeColumns,
	useSortBy,
	useTable,
} from "react-table";

const defaultPropGetter = () => ({});

const Table = ({
	columns,
	data,
	getHeaderProps = defaultPropGetter,
	getColumnProps = defaultPropGetter,
	getRowProps = defaultPropGetter,
	getCellProps = defaultPropGetter,
}) => {
	const defaultColumn = useMemo(
		() => ({
			minWidth: 30,
			width: 200,
			maxWidth: 400,
		}),
		[]
	);
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		prepareRow,

		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data: data.results,
			defaultColumn,
			autoResetSortBy: false,
			// initialState: { pageIndex: 0 },
		},
		useSortBy,
		useResizeColumns,
		useFlexLayout,
		usePagination
	);

	return (
		<div className="w-full rounded-lg p-6">
			<div className="overflow-auto w-full">
				<table className="table bg-white shadow" {...getTableProps()}>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th
										className="border p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900"
										{...column.getHeaderProps(
											column.getSortByToggleProps()
										)}
									>
										{column.render("Header")}
										<div
											{...column.getResizerProps()}
											className={`resizer ${column.isResizing
												? "isResizing"
												: ""
												}`}
											onClick={(e) => {
												e.preventDefault();
												e.stopPropagation();
											}}
										/>
										{column.isSorted ? (
											column.isSortedDesc ? (
												<TiArrowSortedDown className="inline text-gray-400" />
											) : (
												<TiArrowSortedUp className="inline text-gray-400" />
											)
										) : (
											""
										)}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{page.map((row, i) => {
							prepareRow(row);
							return (
								<tr
									className="text-gray-700 hover:!bg-gray-500 dark:hover:!bg-gray-700"
									{...row.getRowProps()}
								>
									{row.cells.map((cell) => {
										return (
											<td
												className="border p-4 dark:border-dark-5 overflow-hidden"
												{...cell.getCellProps([
													{
														className:
															cell.column
																.className,
														style: cell.column
															.style,
													},
													getCellProps(cell),
													getColumnProps(cell),
												])}
											>
												{cell.render("Cell")}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			<div className="pagination">
				<button
					onClick={() => gotoPage(0)}
					disabled={!canPreviousPage}
				>
					{"<<"}
				</button>{" "}
				<button
					onClick={() => previousPage()}
					disabled={!canPreviousPage}
				>
					{"<"}
				</button>{" "}
				<span>
					Page{" "}
					<strong>
						{pageIndex + 1} of {pageOptions.length}
					</strong>{" "}
				</span>
				<button onClick={() => nextPage()} disabled={!canNextPage}>
					{">"}
				</button>{" "}
				<button
					onClick={() => gotoPage(pageCount - 1)}
					disabled={!canNextPage}
				>
					{">>"}
				</button>{" "}
				<span className="hidden">
					| Go to page:{" "}
					<input
						type="number"
						defaultValue={pageIndex + 1}
						onChange={(e) => {
							const page = e.target.value
								? Number(e.target.value) - 1
								: 0;
							gotoPage(page);
						}}
						style={{ width: "100px" }}
					/>
				</span>{" "}
				<select
					value={pageSize}
					onChange={(e) => {
						setPageSize(Number(e.target.value));
					}}
				>
					{[10, 20, 30, 40, 50].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default Table;