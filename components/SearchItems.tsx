//@ts-nocheck
"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Input } from "./ui/input";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleNameSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("name", term);
    } else {
      params.delete("name");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  function handleEmailSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("email", term);
    } else {
      params.delete("email");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex w-full gap-10">
      <Input
        type="Name"
        placeholder="John Doe"
        onChange={(e) => handleNameSearch(e.target.value)}
        value={searchParams.get("name") || ""}
      />
      <Input
        type="Email"
        placeholder="example@example.com"
        onChange={(e) => handleEmailSearch(e.target.value)}
        value={searchParams.get("email") || ""}
      />
    </div>
  );
}
