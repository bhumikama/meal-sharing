"use client";
import React, { useState } from "react";
import { Modal, Box, Button, TextField } from "@mui/material";
const ModalForm = ({ open, onClose, mealId }) => {
  const [formData, setFormData] = useState({
    numberOfGuests: "",
    name: "",
    email: "",
    phoneNumber: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    setIsSubmitting(true);
    setStatusMessage("");
    if (!open) return;
    try {
      // Send reservation data to the backend API
      const response = await fetch("http://localhost:3001/api/reservations/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meal_id: mealId,
          number_of_guests: formData.numberOfGuests,
          contact_name: formData.name,
          contact_email: formData.email,
          contact_phonenumber: formData.phoneNumber,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatusMessage("Reservation added successfully!");
        // reset form data after successful submission
        setFormData({
          numberOfGuests: "",
          name: "",
          email: "",
          phoneNumber: "",
        });
        onClose();
      } else {
        setStatusMessage("Failed to add reservation. " + result.message);
      }
    } catch (error) {
      setStatusMessage("An error occurred. Please try again.");
      console.error("Error submitting reservation:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="p-6 bg-white rounded-xl shadow-lg mx-auto my-14 w-full max-w-md outline-none">
        <h2 className="text-2xl font-semibold mb-4 text-center text-[#85b72c]">
          Book a Seat
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Number of Guests */}
          <TextField
            label="Number of Guests"
            type="number"
            name="numberOfGuests"
            value={formData.numberOfGuests}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
          />

          {/* Name */}
          <TextField
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
          />

          {/* Email */}
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
          />

          {/* Phone Number */}
          <TextField
            label="Phone Number"
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
          />

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

export default ModalForm;
