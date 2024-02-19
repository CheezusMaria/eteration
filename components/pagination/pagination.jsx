import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../pagination/pagination.module.scss";
const Pagination = ({ currentPage, totalPages, currentPath, currentQuery }) => {
  const router = useRouter();
  const renderPageNumbers = () => {
    const pages = [];
    const maxShowPage = 10;
    const firstAndLastPage = 2;

    const addPage = (pageNumber, isActive) => (
      <Link
        key={pageNumber}
        href={{
          pathname: currentPath,
          query: { ...currentQuery, page: pageNumber },
        }}
      >
        <span className={isActive ? "active" : ""}>{pageNumber}</span>
      </Link>
    );

    let blockStart = Math.max(
      firstAndLastPage + 1,
      currentPage - Math.floor(maxShowPage / 2)
    );
    let blockEnd = Math.min(blockStart + maxShowPage - 1, totalPages);
    if (blockEnd - blockStart < maxShowPage - 1) {
      blockStart = Math.max(1, blockEnd - maxShowPage + 1);
    }
    if (blockStart > 1) {
      for (let i = 1; i <= Math.min(firstAndLastPage, blockStart - 1); i++) {
        pages.push(addPage(i, currentPage === i));
      }
    }
    if (blockStart > firstAndLastPage + 1) {
      pages.push(
        <span className={styles.span} key="start-ellipsis">
          ...
        </span>
      );
    }
    for (let i = blockStart; i <= blockEnd; i++) {
      pages.push(addPage(i, currentPage === i));
    }
    if (blockEnd < totalPages - firstAndLastPage) {
      pages.push(
        <span className={styles.span} key="end-ellipsis">
          ...
        </span>
      );
    }
    if (blockEnd < totalPages) {
      for (
        let i = Math.max(totalPages - firstAndLastPage + 1, blockEnd + 1);
        i <= totalPages;
        i++
      ) {
        pages.push(addPage(i, currentPage === i));
      }
    }

    return pages;
  };

  return (
    <div className={styles.container}>
      {currentPage > 1 && (
        <Link
          href={{
            pathname: currentPath,
            query: { ...currentQuery, page: currentPage - 1 },
          }}
        >
          <span>&lt; Previous</span>
        </Link>
      )}

      <div className={styles.pageNumbers}>{renderPageNumbers()}</div>

      {currentPage < totalPages && (
        <Link
          href={{
            pathname: currentPath,
            query: { ...currentQuery, page: parseInt(currentPage, 10) + 1 },
          }}
        >
          <span className={styles.span}>Next &gt;</span>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
