import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { Header, ScrollToTop, Spinner } from "../components/index";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState("Recommended");
  const [loading, setLoading] = useState(false);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=bvvivAeO3fEKT66GAXKZU6DRfHSdNksv"
      );
      const shuffledBooks = shuffleArray(res.data.results.books);
      setBooks(shuffledBooks);
      setSelectedSortOption("Recommended");
      setFilteredBooks(shuffledBooks);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const sortBooks = (books) => {
      switch (selectedSortOption) {
        case "Title Ascending (A-Z)":
          return [...books].sort((a, b) => a.title.localeCompare(b.title));
        case "Title Descending (Z-A)":
          return [...books].sort((a, b) => b.title.localeCompare(a.title));
        case "Author Ascending (A-Z)":
          return [...books].sort((a, b) => a.author.localeCompare(b.author));
        case "Rank By Top 10":
          return [...books].sort((a, b) => a.rank - b.rank).slice(0, 10);
        case "Most Weeks on List":
          return [...books].sort((a, b) => b.weeks_on_list - a.weeks_on_list);
        case "Recommended":
        default:
          return [...books];
      }
    };

    setBooks((prevBooks) => sortBooks(prevBooks));
  }, [selectedSortOption]);

  useEffect(() => {
    const results = books.filter(
      (book) =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredBooks(results);
  }, [search, books]);

  const descTrim = (content, maxLength = 120) => {
    if (content.length > maxLength) {
      return content.slice(0, maxLength) + "...";
    }
    return content;
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center w-full h-auto bg-gray-100">
        <div className="flex flex-row w-4/5 justify-center items-center">
          <div className="flex w-3/4 mx-auto mb-10 pt-20 gap-1">
            <FiSearch className="text-3xl m-auto relative left-12 text-gray-400" />
            <input
              type="text"
              placeholder="Search Your Book..."
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-400 rounded-md focus:border-gray-600 focus:outline-none"
            />
          </div>

          <div className="relative flex items-center mt-10 justify-center flex-row bg-white w-1/5 h-14 rounded-md cursor-pointer border border-gray-400">
            <span className="font-nunito text-md text-gray-900 mr-2">
              Sort by:
            </span>
            <div className="relative">
              <button className="text-md font-bold text-gray-800 border-none cursor-pointer py-3 px-4">
                {selectedSortOption}
              </button>
              <div className="absolute top-full left-0 mt-2 w-full bg-white shadow-lg dropdown-content">
                <h1
                  className="text-sm text-gray-800 py-3 px-4 no-underline block hover:bg-gray-200 cursor-pointer"
                  onClick={() => setSelectedSortOption("Recommended")}
                >
                  Recommended
                </h1>
                <h1
                  className="text-sm text-gray-800 py-3 px-4 no-underline block hover:bg-gray-200 cursor-pointer"
                  onClick={() => setSelectedSortOption("Title Ascending (A-Z)")}
                >
                  Title Ascending (A-Z)
                </h1>
                <h1
                  className="text-sm text-gray-800 py-3 px-4 no-underline block hover:bg-gray-200 cursor-pointer"
                  onClick={() =>
                    setSelectedSortOption("Title Descending (Z-A)")
                  }
                >
                  Title Descending (Z-A)
                </h1>
                <h1
                  className="text-sm text-gray-800 py-3 px-4 no-underline block hover:bg-gray-200 cursor-pointer"
                  onClick={() =>
                    setSelectedSortOption("Author Ascending (A-Z)")
                  }
                >
                  Author Ascending (A-Z)
                </h1>
                <h1
                  className="text-sm text-gray-800 py-3 px-4 no-underline block hover:bg-gray-200 cursor-pointer"
                  onClick={() => setSelectedSortOption("Rank By Top 10")}
                >
                  Rank By Top 10
                </h1>
                <h1
                  className="text-sm text-gray-800 py-3 px-4 no-underline block hover:bg-gray-200 cursor-pointer"
                  onClick={() => setSelectedSortOption("Most Weeks on List")}
                >
                  Most Weeks on List
                </h1>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <div className="mx-auto w-4/5 flex flex-wrap gap-11 py-10">
            {filteredBooks.map((curElem) => {
              return (
                <div
                  key={curElem.rank}
                  className="max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-xl border"
                >
                  <img
                    className="object-cover w-full h-48 mt-1"
                    src={curElem.book_image}
                    alt="book cover"
                  />

                  <div className="px-4 py-2 h-72">
                    <h1 className="text-3xl font-bold text-gray-800 uppercase">
                      {curElem.title}
                    </h1>
                    <h1 className="text-lg font-bold py-2">${curElem.price}</h1>
                    <h1 className="text-lg font-bold py-2">
                      Author: {curElem.author}
                    </h1>
                    <h1 className="text-lg font-bold py-2">
                      Published Year: 2024
                    </h1>
                    <p className="mt-1 text-sm text-gray-600">
                      {descTrim(curElem.description)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <ScrollToTop />
    </div>
  );
};

export default Books;
