import React from "react";
import StarRateIcon from "@mui/icons-material/StarRate";
import { FaStar } from "react-icons/fa";

const Review = ({ reviewInfo }) => {
  return (
    <div className="flex flex-col gap-3 border border-[##85b72c] space-y-2 p-2">
      <div className="flex gap-2">
        <p className="font-semibold text-lg">{reviewInfo.title}</p>
        <div className="flex p-1">
          {[...Array(5)].map((_, index) => {
            index += 1;
            return (
              <FaStar
                className={`font-semibold text-lg ${
                  index <= reviewInfo.stars ? "text-amber-500" : "text-gray-400"
                }`}
                key={index}
              />
            );
          })}
        </div>
      </div>
      <div>
        <p>{reviewInfo.description}</p>
      </div>
    </div>
  );
};
const StarRating = ({ reviewDetails }) => {
    console.log(reviewDetails);
  return (
    <>
      {reviewDetails.message && <p>No reviews yet</p>}
      <div className="grid grid-cols-2 gap-3">
        {reviewDetails.map((review, index) => (
          <Review reviewInfo={review} key={`item-${index}`} />
        ))}
      </div>
    </>
  );
};

export default StarRating;
