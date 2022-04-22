import React from 'react'
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table'
import ProgressBar from './progress-bar.component'
import { useEffect } from 'react'
import Details from './details'
import { useFilters } from 'react-table/dist/react-table.development'
import GlobalFilter from './global-filter'
function Table({ columns, data }) {
    const [counter, setCounter] = React.useState(0);
    const [details, setDetails] = React.useState(false);
    const [currentRow, setCurrentRow] = React.useState(0);
    const intervalRef = React.useRef(null);

    useEffect(() => {
        return () => stopCounter();
    }, []);

    useEffect(() => {
        if (counter === 0) return;
        if (counter >= 100) {
            setDetails(true);
            setTimeout(() => setDetails(false), 1000);
        }

    }, [counter])

    const startCounter = () => {
        setDetails(false);
        if (intervalRef.current) return;
        intervalRef.current = setInterval(() => {
            setCounter((prevCounter) => prevCounter + 1);

        }, 5);
    };

    const stopCounter = () => {
        setCounter(0);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
        state,
        preGlobalFilteredRows, 
        setGlobalFilter, 
    } = useTable(
        {
            columns,
            data,
            manualPagination: false,
            pageCount: 10,
            initialState: {
                sortBy: [
                    {
                        id: 'code',
                        desc: false
                    }
                ]
            }
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    )

    return (
        <div>
            <Details row={currentRow.original} show={details}  />

            <ProgressBar completed={counter} />
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
            />
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {"<<"}
                </button>{" "}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {"<"}
                </button>{" "}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {">"}
                </button>{" "}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {">>"}
                </button>{" "}
                <span>
                    Page{" "}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{" "}
                </span>
                <span>
                    | Go to page:{" "}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
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

            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? <span className="sorter"> {"\u25b4"}</span>
                                                : <span className="sorter"> {"\u25be"}</span>
                                            : ''}
                                    </span>

                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}
                                onMouseDown={
                                    (e) => {
                                        setCurrentRow(row);
                                        startCounter();
                                    }}

                                onMouseUp={stopCounter}
                                onMouseLeave={stopCounter}
                            >
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Table

