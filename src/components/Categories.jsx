import React, { useEffect, useState } from "react";
import "./Category.css";
import MovieList from "./MovieList";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { CgSpinner } from "react-icons/cg";
import { FaSpinner } from "react-icons/fa";

const Categories = ({ categories, categoryLabel, fetchCategoryLabel }) => {
  const location = useLocation();
  const token = location.state?.token;
  const [activeCategory, setActiveCategory] = useState(categories[0]?.name);
  const [moviesByLabelId, setMoviesByLabelId] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchMoviesByLabelId = async (labelId) => {
    try {
      const response = await axios.get(`/api/label/${labelId}?page=0&size=16`, {
        headers: {
          Authorization: token,
        },
      });
      // console.log("labelId", labelId);
      console.log("Fetched fetchMoviesByLabelId data:", response.data.contents);

      return response.data.contents;
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  useEffect(() => {
    if (categories && categories.length > 0) {
      const firstCategory = categories[0];
      handleCategoryClick(firstCategory.name, firstCategory.id);
    }
  }, [categories]);

  const handleCategoryClick = async (categoryName, id) => {
    try {
      setIsLoading(true);
      let tempObj = {};
      setActiveCategory(categoryName);
      const labels = await fetchCategoryLabel(id);
      for (const label of labels) {
        const res = await fetchMoviesByLabelId(label.id);
        tempObj[label.id] = res;
      }
      console.log("tempObj", tempObj);
      setMoviesByLabelId(tempObj);
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  console.log("moviesByLabelId", moviesByLabelId);
  return (
    <div className="categories-container">
      <ul className="movie-categories">
        {categories.map((category) => {
          const isActive = category.name === activeCategory;
          return (
            <li
              key={category.id}
              className={`movie-category ${isActive ? "active" : ""}`}
              onClick={() => handleCategoryClick(category.name, category.id)}
            >
              {category.name}
              <div className={`underline ${isActive ? "active" : ""}`}></div>
            </li>
          );
        })}
      </ul>
      {isLoading ? (
        <div className="spinner-wrapper">
          <FaSpinner className="spinner" />
        </div>
      ) : (
        <ul className="labels">
          {categoryLabel?.map((label) => {
            return <MovieList categoryName={label.name} movieArr={moviesByLabelId[label.id]}></MovieList>;
          })}
        </ul>
      )}
    </div>
  );
};

export default Categories;
