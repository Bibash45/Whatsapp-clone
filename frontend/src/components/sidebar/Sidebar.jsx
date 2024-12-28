import React, { use, useState } from "react";
import { SidebarHeader } from "./header";
import { Notifications } from "../notifications";
import { Search, SearchResults } from "./search";
import { Conversations } from "./conversations";

const Sidebar = () => {
  const [searchResults, setSearchResults] = useState([]);
  console.log(searchResults);

  return (
    <div className="flex0030 max-w-[30%] h-full select-none">
      {/* sidebar header */}
      <SidebarHeader />
      {/* notification */}
      <Notifications />
      {/* search */}
      <Search
        searchLength={searchResults.length}
        setSearchResults={setSearchResults}
      />
      {searchResults.length > 0 ? (
        <>
          <SearchResults
            searchResults={searchResults}
            setSearchResults={setSearchResults}
          />
        </>
      ) : (
        <>
          {/* conversations */}
          <Conversations />
        </>
      )}
    </div>
  );
};

export default Sidebar;
