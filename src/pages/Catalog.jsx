import React, { useEffect, useState } from "react";
import Footer from "../components/Common/Footer";
import { useParams } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import { categories } from "../services/apis";
import getCatalogaPageData from "../services/oprations/pageAndComponentData";
import Course_Card from "../components/core/Catalog/Course_Card";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import { useSelector } from "react-redux";
import Error from "./Error";

import "../App.css"
import { setLoading } from "../slices/authSlice";

const Catalog = () => {
  const [isLodaing, setIsLodaing] = useState(false)
  const { catalogName } = useParams();
  console.log(catalogName)
  const [active, setActive] = useState(1);
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  //Fetch all categories
  useEffect(() => {
    const getCategories = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      const category_id = res?.data?.data?.filter(
        (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
      )[0]._id;
      setCategoryId(category_id);
    };
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        setIsLodaing(true);
        const res = await getCatalogaPageData(categoryId);
        let response = "";
        for (const result of res) {
          response = result;
          console.log(result)
        };
        console.log(response)
        setCatalogPageData(response);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLodaing(false);
      }
    };
    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);

  console.log(isLodaing, catalogPageData);

  if (isLodaing || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  };

  if (isLodaing || !(catalogPageData.success)) {
    return <Error />;
  };

  console.log(catalogPageData?.data?.selectedCategory)

  return (
    <>
      {/* Hero Section */}
      <div className=" box-content bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
          <p className="text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className="text-yellow-25">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-3xl text-richblack-5">
            {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <p className="max-w-[870px] text-richblack-200">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section 1 */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading text-3xl font-semibold text-richblack-5">Courses to get you started</div>
        <div className="my-4 flex border-b border-b-richblack-600 text-sm">
          <p
            className={`px-4 py-2 text-base font-normal ${
              active === 1
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most Populer
          </p>
          <p
            className={`px-4 py-2 text-base font-normal ${
              active === 2
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <div>
          <CourseSlider
            Courses={catalogPageData?.data?.selectedCategory?.courses}
          />
        </div>
      </div>
      {/* Section 2 */}
      <div className="mt-44 mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading text-3xl font-semibold text-richblack-5">
          Top courses in {catalogPageData?.data?.differentCategory?.name}
        </div>
        <div className="py-8 min-h-full">
          <CourseSlider
            Courses={catalogPageData?.data?.differentCategory?.courses}
          />
        </div>
      </div>

      {/* Section 3 */}
      <div className="mt-44 mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading text-3xl font-semibold text-richblack-5">Frequently Bought</div>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {catalogPageData?.data?.mostSellingCourses
              ?.slice(0, 4)
              .map((course, i) => (
                <Course_Card course={course} key={i} height={"h-[400px]"} />
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Catalog;
