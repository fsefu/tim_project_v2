import { useState } from "react";
import Card from "../../../../components/card";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { MdDownload } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import axios from "axios";

type RowObj = {
  Name: [string, boolean];
  ID: string;
  "Updated At": string;
  "Created At": string;
  "Definition Link": string;
  Type: string;
  Members: string;
  progress: string;
  quantity: number;
  date: string;
};

function ColumnsTable(props: { tableData: any }) {
  const { tableData } = props;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isDownloading, setIsDowloading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  let defaultData = tableData;

  const columns = [
    columnHelper.accessor("ID", {
      id: "ID",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white min-w-auto">
          ID
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white min-w-auto">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("Name", {
      id: "Name",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Name</p>
      ),
      cell: (info: any) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),

    columnHelper.accessor("Updated At", {
      id: "Updated At",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Updated At
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),

    columnHelper.accessor("Created At", {
      id: "Created At",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Created At
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),

    columnHelper.accessor("Members", {
      id: "Members",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Members
        </p>
      ),
      cell: (info: any) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("Type", {
      id: "Type",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">Type</p>
      ),
      cell: (info: any) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),

    columnHelper.accessor("Definition Link", {
      id: "Definition Link",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          Definition Link
        </p>
      ),
      cell: (info: any) => (
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          {`${info.getValue() ? "See Definition" : "No Definition"}`}
        </button>
      ),
    }),
  ]; // eslint-disable-next-line

  const [data, setData] = useState(() => [...defaultData]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const totalSize = data?.length;

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, data.length);
  const totalPages = Math.ceil(data.length / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPages = 3;

    pageNumbers.push(1);

    if (currentPage > maxPages + 2) {
      pageNumbers.push("...");
    }

    const startPage = Math.max(2, currentPage - maxPages);
    const endPage = Math.min(currentPage + maxPages, totalPages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (currentPage < totalPages - maxPages - 1) {
      pageNumbers.push("...");
    }

    pageNumbers.push(totalPages);

    return pageNumbers;
  };

  const perPageOption = [
    { value: 10, label: "10" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
    { value: 200, label: "200" },
    { value: 500, label: "500" },
    { value: totalSize, label: "All" },
  ];

  const handleSelectedPageSize = (event: any) => {
    setPageSize(event.target.value);
  };

  const handleDownload = async () => {
    setIsDowloading(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/download_excel/",
        {
          responseType: "blob", // Important for downloading files
          withCredentials: true,
        }
      );
      console.log("res: ", response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "lists_and_segments.xlsx");
      document.body.appendChild(link);
      link.click();
      setIsDowloading(false);
    } catch (error) {
      setIsDowloading(false);

      console.error("Error downloading Excel file:", error);
    }
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/update_api/",
        {
          withCredentials: true,
          maxRedirects: 5,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("res: ", response);
      if (response.status !== 200) {
        setIsUpdating(false);
        throw new Error("Network response was not ok");
      }
      console.log("data: ", response.data);
      setIsUpdating(false);

      return response.data;
    } catch (error) {
      setIsUpdating(false);

      throw new Error("Error:");
    }
  };

  return (
    <>
      <Card extra={"w-full pb-10 p-4 h-full"}>
        <header className="relative flex items-center justify-between">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            4-Columns Table
          </div>

          <div className="flex items-center">
            <p className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-200">
              Show
            </p>
            <form className="max-w-sm mx-auto mr-4">
              <select
                id="showid"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handleSelectedPageSize}
              >
                <option selected></option>
                {perPageOption.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </form>
            <button
              disabled={isDownloading}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
              onClick={handleDownload}
            >
              {isDownloading ? (
                <>
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 me-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Dowloading...
                </>
              ) : (
                <>
                  <MdDownload w-6 h-6 className="mr-2" />
                  Download
                </>
              )}
            </button>

            <button
              disabled={isUpdating}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
              onClick={handleUpdate}
            >
              {isUpdating ? (
                <>
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 me-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Updating...
                </>
              ) : (
                <>
                  <RxUpdate w-6 h-6 className="mr-2" />
                  Update
                </>
              )}
            </button>
          </div>
        </header>

        <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
          <table className="w-full">
            {/* Table header */}
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="!border-px !border-gray-400"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-start"
                    >
                      <div className="items-center justify-between text-xs text-gray-200">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{ asc: "", desc: "" }[
                          header.column.getIsSorted() as string
                        ] ?? null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {/* Table body */}
            <tbody>
              {table
                .getRowModel()
                .rows.slice(startIndex, endIndex)
                .map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        // className="min-w-[150px] border-white/0 py-3  pr-4"
                        className="min-w-auto border-white/0 py-3 pr-4"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Card>
      <div className="flex justify-end mt-4">
        <nav aria-label=" Page navigation example">
          <ul className="flex items-center -space-x-px h-10 text-base">
            <li>
              <button
                // href="#"
                className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-3 h-3 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
              </button>
            </li>
            {getPageNumbers().map((pageNumber, index) => (
              <li>
                <button
                  key={index}
                  onClick={() =>
                    handlePageChange(
                      typeof pageNumber === "number" ? pageNumber : 0
                    )
                  }
                  disabled={pageNumber === "..." || pageNumber === currentPage}
                  className={`${
                    pageNumber === currentPage
                      ? "z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                      : " flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
                >
                  {pageNumber}
                </button>
              </li>
            ))}

            <li>
              <button
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-3 h-3 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default ColumnsTable;
const columnHelper = createColumnHelper<RowObj>();
