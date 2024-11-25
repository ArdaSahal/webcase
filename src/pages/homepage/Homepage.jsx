import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";
import "./homepage.css";
import Slider from "../../components/Slider";
import Categories from "../../components/Categories";

const Homepage = () => {
  const location = useLocation();
  const token = location.state?.token;
  const profile = location.state?.profile;

  const [tabBarData, setTabBarData] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [sliderImages, setSliderImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryLabel, setCategoryLabel] = useState(null);
  const [categoryScreenVisible, setCategoryScreenVisible] = useState(false);

  const handleBackgroundChange = (newImage) => {
    setBackgroundImage(newImage);
  };

  useEffect(() => {
    const fetchTabBar = async () => {
      try {
        const tabBarResponse = await axios.get("/api/menu", {
          headers: {
            Authorization: token,
          },
        });
        const data = await tabBarResponse.data;
        setTabBarData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTabBar();
  }, []);

  const fetchMovies = async (id) => {
    try {
      const response = await axios.get(`/api/menu/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      const banners = response.data.banners;
      const images = banners.map((banner) => banner.posters[1]?.url).filter(Boolean);
      setSliderImages(images);
      setCategories(response.data.categories);
      console.log("Menu Details:", categories);
      return response.data;
    } catch (error) {
      console.error("Error fetching menu details:", error);
    }
  };

  const fetchCategoryLabel = async (categoryId) => {
    try {
      const response = await axios.get(`/api/category/${categoryId}`, {
        headers: {
          Authorization: token,
        },
      });
      const labels = response.data.labels;
      setCategoryLabel(labels);
      console.log("Fetched category label data:", response.data.labels);

      return labels;
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  const handleCategoryScreenToggle = (isVisible) => {
    setCategoryScreenVisible(isVisible);
  };

  return (
    <>
      <div className="bg"></div>
      <div className="homepage">
        <div
          className="bg-image"
          style={{
            // maskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
            backgroundImage: `url(${backgroundImage})`,
            transition: "background-image 0.5s ease-in-out",
          }}
        >
          <div className="gradient"></div>
        </div>

        <div className="main-screen">
          <Navbar
            tabBarData={tabBarData}
            profile={profile}
            fetchMovies={fetchMovies}
            handleCategoryScreenToggle={handleCategoryScreenToggle}
          />
          <Slider images={sliderImages} onBackgroundChange={handleBackgroundChange} />
        </div>

        {categoryScreenVisible && (
          <div className="category-screen">
            <Categories categories={categories} categoryLabel={categoryLabel} fetchCategoryLabel={fetchCategoryLabel} />
          </div>
        )}
      </div>
    </>
  );
};

export default Homepage;
