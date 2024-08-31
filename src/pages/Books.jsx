import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { Header, ScrollToTop, Spinner, NotFound } from "../components/index";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState("Recommended");
  const [loading, setLoading] = useState(false);

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://openlibrary.org/search.json?title=the+lord+of+the+rings"
      );
      const shuffledBooks = shuffleArray(res.data.docs);
      setBooks(shuffledBooks);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const sortBooks = (books) => {
      switch (selectedSortOption) {
        case "Title Ascending (A-Z)":
          return [...books].sort((a, b) =>
            (a.title || "").localeCompare(b.title || "")
          );
        case "Title Descending (Z-A)":
          return [...books].sort((a, b) =>
            (b.title || "").localeCompare(a.title || "")
          );
        case "Author Ascending (A-Z)":
          return [...books].sort((a, b) =>
            ((a.author_name && a.author_name[0]) || "").localeCompare(
              (b.author_name && b.author_name[0]) || ""
            )
          );
        case "Rank By Top 10":
          return [...books]
            .sort(
              (a, b) =>
                ((a.key && Number(a.key)) || 0) -
                ((b.key && Number(b.key)) || 0)
            )
            .slice(0, 10);
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
        (book.title || "").toLowerCase().includes(search.toLowerCase()) ||
        ((book.author_name && book.author_name[0]) || "")
          .toLowerCase()
          .includes(search.toLowerCase())
    );
    setFilteredBooks(results);
  }, [search, books]);

  const titleTrim = (content, maxLength = 30) => {
    return content.length > maxLength
      ? content.slice(0, maxLength) + "..."
      : content;
  };

  const descTrim = (content, maxLength = 120) => {
    return content.length > maxLength
      ? content.slice(0, maxLength) + "..."
      : content;
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center w-full h-auto bg-gray-100">
        <div className="flex flex-row w-4/5 h-auto justify-center items-center mt-10 laptop:w-5/6 tablet:w-full mobile:w-screen mobile:flex-col mobile:mt-8">
          <div className="flex w-3/4 gap-1 mr-8 tablet:w-4/6 mobile:w-11/12 mobile:h-10">
            <FiSearch className="text-3xl m-auto relative left-12 text-gray-400 mobile:text-2xl mobile:left-10" />
            <input
              type="text"
              placeholder="Search Your Book..."
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-400 rounded-md focus:border-gray-600 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-center flex-row bg-white w-1/5 h-14 rounded-md cursor-pointer border border-gray-400 mr-5 laptop:w-4/12 tablet:w-5/12 mobile:mt-4 mobile:w-10/12 mobile:mr-2 mobile:h-10">
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
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <Spinner />
        ) : filteredBooks.length === 0 ? (
          <NotFound search={search} />
        ) : (
          <div className="mx-auto w-4/5 flex flex-wrap gap-11 py-10 laptop:w-11/12 tablet:w-11/12 tablet:mt-96 tablet:pt-30 mobile:py-0 mobile:pt-10">
            {filteredBooks
              .filter(
                (curElem) =>
                  curElem.key &&
                  curElem.cover_edition_key &&
                  curElem.title &&
                  Array.isArray(curElem.author_name) &&
                  curElem.author_name.length > 0 &&
                  Array.isArray(curElem.publish_year) &&
                  curElem.publish_year.length > 0
              )
              .map((curElem) => {
                const key = curElem.key;
                const image = `https://covers.openlibrary.org/b/olid/${curElem.cover_edition_key}-L.jpg`;
                const title = curElem.title;
                const author = curElem.author_name[0];
                const publish_year = curElem.publish_year[0];
                const description = curElem.first_sentence
                  ? curElem.first_sentence[0]
                  : "Description not available";

                return (
                  <div
                    key={key}
                    className="max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-xl"
                  >
                    <img
                      className="object-cover w-full h-48 mt-1"
                      src={image}
                      alt={`${title} cover`}
                    />

                    <div className="px-4 py-2 h-72">
                      <h1 className="text-3xl font-bold text-gray-800 uppercase">
                        {titleTrim(title)}
                      </h1>
                      <h1 className="text-lg font-bold py-2">
                        Author: {author}
                      </h1>
                      <h1 className="text-lg font-bold py-2">
                        Published Year: {publish_year}
                      </h1>
                      <p className="mt-1 text-sm text-gray-600">
                        {descTrim(description)}
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
