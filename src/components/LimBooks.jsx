import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Spinner } from "./index";

const LimBooks = () => {
  const [books, setBooks] = useState([]);
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
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const descTrim = (content, maxLength = 120) => {
    if (content.length > maxLength) {
      return content.slice(0, maxLength) + "...";
    }
    return content;
  };

  return (
    <div className="py-20 w-full bg-gray-100">
      {loading ? (
        <Spinner />
      ) : (
        <div className="mx-auto w-4/5 flex flex-wrap gap-11 py-10">
          {books.slice(0, 8).map((curElem) => {
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

      <div className="flex items-center justify-center h-auto w-full">
        <Button text="View more Books ..." to="/books" />
      </div>
    </div>
  );
};

export default LimBooks;
