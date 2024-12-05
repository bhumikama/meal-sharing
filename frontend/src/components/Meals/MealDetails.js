"use client";
import React, { useState } from "react";
import PlaceIcon from "@mui/icons-material/Place";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleIcon from "@mui/icons-material/People";
import AccordionGroup from "@mui/joy/AccordionGroup";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionSummary from "@mui/joy/AccordionSummary";
import ModalForm from "./Modal";
import StarRating from "./StarRating";
import ReviewModal from "./ReviewModal";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { formatDate } from "@/utils/formatDate";
export default function MealDetails({
  mealInfo,
  reviewInfo,
  onReviewSubmit,
  refetchMealDetails,
}) {
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
          <h1 className="text-2xl font-extrabold font-serif mb-2 text-[#29ade5]">
            {mealInfo.title}
          </h1>
          <p className="text-gray-700">{mealInfo.description}</p>
          <div className="flex flex-col gap-6 mt-6">
            {/* Date Section */}
            <div className="flex items-start gap-4">
              <div className="bg-[#29ade5] h-10 w-10 flex items-center justify-center rounded-full text-white shadow-md">
                <CalendarMonthIcon fontSize="small" />
              </div>
              <div>
                <p className="text-base font-semibold text-gray-800">
                  {formatDate(mealInfo.when)}
                </p>
                <p className="text-sm text-gray-500">Date & Time</p>
              </div>
            </div>

            {/* Location Section */}
            <div className="flex items-start gap-4">
              <div className="bg-[#29ade5] h-10 w-10 flex items-center justify-center rounded-full text-white shadow-md">
                <PlaceIcon fontSize="small" />
              </div>
              <div className="flex-1">
                <p className="text-base font-semibold text-gray-800">
                  {mealInfo.location}
                </p>
                <p className="text-sm text-gray-500">Location</p>

                {/* Accordion for Map */}
                <div className="">
                  <AccordionGroup sx={{ maxWidth: 400, padding: 0 }}>
                    <Accordion sx={{ padding: 0, margin: 0 }}>
                      <AccordionSummary
                        className="text-sm !text-blue-500"
                        sx={{
                          width: "fit-content",
                          fontFamily: "inherit",
                          backgroundColor: "transparent",
                          padding: "0.5rem 0",
                          minHeight: "unset",
                          color: "blue !important",
                        }}
                      >
                        Show Map
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="rounded-lg overflow-hidden shadow-md border border-gray-200">
                          <iframe
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(
                              mealInfo.location
                            )}&z=15&output=embed`}
                            className="w-full h-40 rounded-md"
                            allowFullScreen
                            loading="lazy"
                          ></iframe>
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  </AccordionGroup>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {/* Reviews Header */}
            <div className="flex flex-col items-center justify-between text-center space-y-2">
              <h3 className="text-2xl font-bold text-gray-800">
                What Our Customers Are Saying
              </h3>
              <p className="text-sm text-gray-500">
                Share your thoughts about your experience with this meal!
              </p>
              <button
                className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-[#29ade5] text-white font-medium shadow-md hover:bg-[#1d87c1] transition"
                onClick={() => setReviewOpen(true)}
              >
                Add Your Review
              </button>
            </div>

            {/* Review Modal */}
            <ReviewModal
              open={isReviewOpen}
              onClose={() => setReviewOpen(false)}
              mealId={mealInfo.id}
              submitReview={onReviewSubmit}
            />

            {/* Reviews List */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-800 pb-3 border-b border-gray-200">
                Customer Reviews
              </h4>
              <StarRating reviewDetails={reviewInfo} />
            </div>
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
              <p className="text-sm text-[#29ade5] mb-4 font-semibold">
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
                  ? "bg-[#29ade5] text-white hover:bg-[#1d87c1]"
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
              refetchMealInfo={refetchMealDetails}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
