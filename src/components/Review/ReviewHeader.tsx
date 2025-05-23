"use client";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type TSortByStatus = "newest" | "oldest" | "mostPopular";

const ReviewHeader = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const sortByParam = searchParams.get("sortBy") as TSortByStatus | null;
  const searchTerm = searchParams.get("searchTerm");

  const [sortBy, setSortBy] = useState<TSortByStatus>(sortByParam || "newest");
  const [searchText, setSearchText] = useState<string>(searchTerm || "");
  const [showSearchedFor, setShowSearchedFor] = useState(
    searchTerm ? true : false
  );

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as TSortByStatus);
    params.delete("page");
    params.set("sortBy", e.target.value);
    router.push(`?${params.toString()}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const onSearchSubmit = () => {
    setShowSearchedFor(true);
    params.delete("page");
    params.set("searchTerm", searchText);
    router.push(`?${params.toString()}`);
  };

  const handleClearButton = () => {
    setSearchText("");
    setShowSearchedFor(false);
    params.delete("page");
    params.delete("searchTerm");
    router.push(`?${params.toString()}`);
  };
  return (
    <div className="flex flex-col-reverse md:flex-row items-stretch gap-5 md:gap-10">
      <div className="flex items-stretch w-full">
        {showSearchedFor ? (
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold pl-5">
              Search for &quot;{searchText}&quot;
            </h2>
            <button
              type="button"
              onClick={handleClearButton}
              className="bg-black dark:bg-white  text-white dark:text-black px-4 py-1 rounded-full font-semibold"
            >
              Clear
            </button>
          </div>
        ) : (
          <>
            <input
              type="text"
              className="w-full bg-white/10 border outline-none py-2 px-5"
              placeholder="Search by titles/descriptions"
              value={searchText}
              onChange={handleSearchChange}
            />
            <button
              onClick={onSearchSubmit}
              type="button"
              className="bg-white/10 p-2 border border-l-0"
            >
              <Search />
            </button>
          </>
        )}
      </div>

      <div className="flex items-stretch shrink-0">
        <h2 className="font-semibold bg-white/10 px-5 py-2 border border-r-0">
          Sort By
        </h2>
        <select
          name="sortBy"
          id="sortBy"
          className="bg-white/10  py-2.5 px-5 border outline-none"
          value={sortBy}
          onChange={handleSortByChange}
        >
          <option className="dark:bg-black/80" value="newest">
            Newest
          </option>
          <option className="dark:bg-black/80" value="oldest">
            Oldest
          </option>
          <option className="dark:bg-black/80" value="mostPopular">
            Most Popular
          </option>
        </select>
      </div>
    </div>
  );
};

export default ReviewHeader;
