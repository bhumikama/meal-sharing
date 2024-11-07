"use client";
import React, { useState } from "react";
import PlaceIcon from "@mui/icons-material/Place";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleIcon from "@mui/icons-material/People";
import ModalForm from "./Modal";
import StarRating from "./StarRating";
import ReviewModal from "./ReviewModal";
export default function MealDetails({ mealInfo, reviewInfo, onReviewSubmit }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isReviewOpen, setReviewOpen] = useState(false);
  return (
    <div className="container mx-auto p-4">
      {/* Image Section */}
      <div className="w-full overflow-hidden rounded-md mb-6">
        <img
          src={mealInfo.image_url}
          alt={mealInfo.title}
          className="w-full h-80 object-cover"
        />
      </div>

      {/* Description and Booking Section */}
      <div className="flex flex-col md:flex-row items-start gap-8">
        {/* Meal Description */}
        <div className="w-full md:w-2/3 bg-white p-4 rounded-md shadow-md text-black">
          <h1 className="text-2xl font-extrabold font-serif mb-2 text-[#85b72c]">
            {mealInfo.title}
          </h1>
          <p className="text-gray-700">{mealInfo.description}</p>
          <ul className="p-2">
            <li>
              <PlaceIcon sx={{ color: "#85b72c" }} />
              {mealInfo.location}
            </li>
            <li>
              <CalendarMonthIcon
                sx={{ color: "#85b72c", marginRight: "5px" }}
              />
              {new Date(mealInfo.when).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </li>
          </ul>
          <div>
            <h3 className="text-lg p-3 font-bold">Reviews</h3>
            <button
              className="px-4 py-2 m-3 rounded-md font-semibold bg-[#85b72c] text-white hover:bg-[#84b72ca8]"
              onClick={() => setReviewOpen(true)}
            >
              Add a Review
            </button>
            <ReviewModal
              open={isReviewOpen}
              onClose={() => setReviewOpen(false)}
              mealId={mealInfo.id}
              submitReview={onReviewSubmit}
            />
            <StarRating reviewDetails={reviewInfo} />
          </div>
        </div>

        {/* Booking Section */}
        <div className="w-full md:w-1/3">
          <div className="bg-gray-50 border border-gray-200 rounded-md shadow-md p-4 text-center">
            {/* Price */}
            <p className="text-2xl font-bold text-gray-900 mb-4">
              Dkk{mealInfo.price}
            </p>

            {/* Available Reservations Info */}
            {mealInfo.available_reservations > 0 ? (
              <p className="text-sm text-green-600 mb-4 font-semibold">
                <PeopleIcon /> {mealInfo.available_reservations} seats available
              </p>
            ) : (
              <p className="text-sm text-red-600 mb-4">
                <PeopleIcon />
                No seats available
              </p>
            )}

            {/* Book Seat Button */}
            <button
              className={`w-full px-4 py-2 rounded-md font-semibold ${
                mealInfo.available_reservations > 0
                  ? "bg-[#85b72c] text-white hover:bg-[#84b72ca8]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={mealInfo.available_reservations <= 0}
              onClick={() => setModalOpen(true)}
            >
              Book Seat
            </button>
            <ModalForm
              open={isModalOpen}
              onClose={() => setModalOpen(false)}
              mealId={mealInfo.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
