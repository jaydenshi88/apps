// @ts-nocheck
"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import parseAndPrepareDataForDB from "@/lib/seed";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

export function TablePagination(props: { totalPages: number }) {
  const { totalPages } = props;
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const currentPage = Number(params.get("page")) || 1;
  const { replace } = useRouter();
  const pathname = usePathname();

  const handlePageChange = (page: number) => {
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => handlePageChange(currentPage - 1)}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              onClick={() => handlePageChange(page)}
              isActive={currentPage === page}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export const SeedButton = () => {
  return <Button onClick={() => parseAndPrepareDataForDB()}>Click me</Button>;
};
