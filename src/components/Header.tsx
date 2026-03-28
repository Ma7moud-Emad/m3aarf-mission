import type { HeaderProps } from "../types";

import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import { useStore } from "../store/store";

export default function Header({ count }: HeaderProps) {
  const search = useStore((state) => state.search);
  const setSearch = useStore((state) => state.setSearch);

  return (
    <header className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-4 flex-wrap gap-3">
      {/* Brand */}
      <div className="d-flex align-items-center gap-2">
        <div className="bg-primary rounded p-2 d-flex align-items-center justify-content-center">
          <HiOutlineSquares2X2 size={24} color="white" />
        </div>
        <div>
          <h1 className="brand-title text-dark fs-5 mb-0 text-uppercase">
            Kanban Board
          </h1>
          <p className="text-secondary mb-0 small">{count} tasks</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-body-secondary d-flex align-items-center gap-2 px-3 py-2 rounded border">
        <IoSearch className="text-muted" />
        <input
          type="text"
          placeholder="Search tasks…"
          className="border-0 bg-transparent text-dark"
          style={{ minWidth: "200px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          id="search-input"
        />
      </div>
    </header>
  );
}
