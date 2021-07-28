import React from "react";

type SearchProps = {
  handleSearchNote: (searchText: string) => void;
};

export const Search = ({ handleSearchNote }: SearchProps) => {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search notes..."
        onChange={(e) => handleSearchNote(e.target.value)}
      />
    </div>
  );
};
