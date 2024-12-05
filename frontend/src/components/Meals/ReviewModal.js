"use client";
import React, { useState } from "react";
import { Modal, Box, Button, TextField } from "@mui/material";
import { FaStar } from "react-icons/fa";

const ReviewModal = ({ open, onClose, mealId, submitReview }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleClick = (currentIndex) => {
    setRating(currentIndex);
  };

  const handleMouseEnter = (currentIndex) => {
    setHover(currentIndex);
  };

  const handleMouseLeave = () => {
    setHover(rating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setStatusMessage(""); // Clear any previous status message
      setFieldErrors({}); // Clear field-specific errors
      const newReview = {
        meal_id: mealId,
        title: formData.title,
        description: formData.description,
        stars: rating,
      };

      await submitReview(newReview);

      // Success message and reset
      setStatusMessage("Review submitted successfully.");
      setFormData({ title: "", description: "" });
      setRating(0);
      onClose();
    } catch (error) {
      console.error("Error during review submission:", error);

      if (error.validationErrors) {
        const errorFields = {};
        error.validationErrors.forEach((err) => {
          errorFields[err.fields] = err.error; // Map errors to fields
        });
        setFieldErrors(errorFields);
        setStatusMessage("Please correct the highlighted errors.");
      } else {
        setStatusMessage(
          error.message || "An unexpected error occurred. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="p-6 bg-white rounded-xl shadow-lg mx-auto my-14 w-full max-w-md outline-none">
        <h2 className="text-2xl font-semibold mb-4 text-center text-[##29ade5]">
          Write a Review
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <TextField
            label="Title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            error={!!fieldErrors.title}
            helperText={fieldErrors.title}
          />

          {/* Description */}
          <TextField
            id="outlined-multiline-static"
            label="Description"
            type="text"
            name="description"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            error={!!fieldErrors.description}
            helperText={fieldErrors.description}
          />

          {/* Rating */}
          <div className="flex py-1">
            {[...Array(5)].map((_, index) => {
              index += 1;
              return (
                <FaStar
                  className={`font-semibold text-lg ${
                    index <= (hover || rating)
                      ? "text-amber-500"
                      : "text-gray-400"
                  }`}
                  key={index}
                  onClick={() => handleClick(index)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                />
              );
            })}
            {fieldErrors.stars && (
              <p className="text-red-500 text-sm mt-1">{fieldErrors.stars}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            className="w-full mt-4 py-2 text-white bg-[#29ade5] hover:bg-[#1d87c1]  transition duration-200"
          >
            {isSubmitting ? "Submitting.." : "Submit Review"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ReviewModal;
