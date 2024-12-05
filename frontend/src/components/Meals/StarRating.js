import React from "react";
import StarRateIcon from "@mui/icons-material/StarRate";
import { FaStar } from "react-icons/fa";
import Avatar from "@mui/material/Avatar";
import { deepOrange, green } from "@mui/material/colors";
const Review = ({ reviewInfo }) => {
  return (
    <div className="flex flex-col gap-3 border border-[##85b72c] space-y-2 p-2 shadow-md">
      <div className="grid grid-cols-[auto,1fr] gap-3 items-center">
        <Avatar sx={{ bgcolor: deepOrange[400] }}>A</Avatar>
        <div>
          <p className="text-sm font-semibold text-gray-700">Anonymous</p>
          <p className="text-xs font-light text-gray-500">
            {new Date(reviewInfo.created_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
      <div className="border-t mt-2 mb-2"></div>

      <div className="flex gap-2">
        <div className="flex p-1">
          {[...Array(5)].map((_, index) => {
            index += 1;
            return (
              <FaStar
                className={`font-semibold text-lg ${
                  index <= reviewInfo.stars
                    ? "text-yellow-400"
                    : "text-gray-400"
                }`}
                key={index}
              />
            );
          })}
        </div>
        <p className="text-lg font-semibold text-gray-800 mb-2">
          {reviewInfo.title}
        </p>
      </div>
      <div>
        <p className="text-sm text-gray-600">{reviewInfo.description}</p>
      </div>
    </div>
  );
};
const StarRating = ({ reviewDetails }) => {
  console.log(reviewDetails);
  return (
    <>
      {reviewDetails.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No reviews yet.</p>
          <p className="text-sm text-gray-400">
            Be the first to leave a review!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
          {reviewDetails.map((review, index) => (
            <Review reviewInfo={review} key={`item-${index}`} />
          ))}
        </div>
      )}
    </>
  );
};

export default StarRating;
