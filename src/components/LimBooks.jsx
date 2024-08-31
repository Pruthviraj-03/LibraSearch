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

  const titleTrim = (content, maxLength = 30) => {
    if (content.length > maxLength) {
      return content.slice(0, maxLength) + "...";
    }
    return content;
  };

  const descTrim = (content, maxLength = 120) => {
    if (content.length > maxLength) {
      return content.slice(0, maxLength) + "...";
    }
    return content;
  };

  return (
    <div className="py-20 w-full bg-gray-100 mobile:py-8 mobile:mt-110">
      {loading ? (
        <Spinner />
      ) : (
        <div className="mx-auto w-4/5 flex flex-wrap gap-11 py-10 laptop:w-11/12 tablet:w-11/12 tablet:mt-96 tablet:pt-30 mobile:py-0">
          {books
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
            .slice(0, 8)
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
                  className="max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-xl mobile:mb-5"
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
                    <h1 className="text-lg font-bold py-2">Author: {author}</h1>
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

      <div className="flex items-center justify-center h-auto w-full">
        <Button text="View more Books ..." to="/books" />
      </div>
    </div>
  );
};

export default LimBooks;
