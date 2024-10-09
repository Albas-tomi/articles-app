import React from "react";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import ReactPaginate from "react-paginate";

const Pagination = ({
  setItemPerPage,
  currentPage,
  pageCount,
  handlePageClick,
  itemPerPage,
}: any) => {
  return (
    <div className="w-full  flex justify-between items-end my-2">
      <select
        onChange={(e) => setItemPerPage(parseInt(e.target.value))}
        name="itemPerPage"
        value={itemPerPage}
        className="p-1 rounded-md text-slate-600 border border-slate-500"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={25}>25</option>
      </select>

      <ReactPaginate
        className="flex   items-center space-x-1 justify-center"
        breakLabel="..."
        nextLabel={
          <GrFormNextLink
            className={`text-2xl ${
              currentPage === pageCount - 1
                ? "text-slate-200 cursor-not-allowed"
                : "text-blue-600 hover:text-blue-800"
            }`}
          />
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        forcePage={currentPage}
        pageLinkClassName="bg-slate-200 text-gray-800    hover:bg-blue-100 hover:text-blue-600 px-2 min-w-10 h-10 flex justify-center items-center rounded-md transition-colors duration-300 ease-in-out"
        activeLinkClassName="bg-blue-600  text-white shadow-lg border border-blue-600 px rounded-md"
        previousLabel={
          <GrFormPreviousLink
            className={`text-2xl ${
              currentPage === 0
                ? "text-slate-200 cursor-not-allowed"
                : "text-blue-600 hover:text-blue-800"
            }`}
          />
        }
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
