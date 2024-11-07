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
  // Handle form input changes
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
  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    setIsSubmitting(true);
    setStatusMessage("");
    const newData = {
      meal_id: mealId,
      title: formData.title,
      description: formData.description,
      stars: rating,
    };
    try {
      await submitReview(newData);
      setStatusMessage("Review submitted successfully");
      setFormData({ title: "", description: "" });
      setRating(0);
      onClose();
    } catch (error) {
      setStatusMessage("Error setting data");
    } finally {
      setIsSubmitting(false);
    }

    if (!open) return;
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="p-6 bg-white rounded-xl shadow-lg mx-auto my-14 w-full max-w-md outline-none">
        <h2 className="text-2xl font-semibold mb-4 text-center text-[#85b72c]">
          Write a Review
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <TextField
            label="Title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
          />

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
            required
          />
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
          </div>
          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            className="w-full mt-4 py-2 text-white bg-[#84b72c] hover:bg-[#84b72ca8] transition duration-200"
          >
            {isSubmitting ? "Submitting.." : "Confirm Reservation"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ReviewModal;
