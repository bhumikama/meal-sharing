"use client";
import MealList from "@/components/Meals/MealList";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { fetchMeals } from "@/utils/fetchMeals";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";

export default function Recipes() {
  const [meals, setMeals] = useState([]);
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    let updated = false;

    if (!params.has("sortKey")) {
      params.set("sortKey", "price");
      updated = true;
    }
    if (!params.has("sortDir")) {
      params.set("sortDir", "asc");
      updated = true;
    }
    if (!params.has("availableReservations")) {
      params.set("availableReservations", "false");
      updated = true;
    }

    if (updated) {
      router.replace(`${pathName}?${params.toString()}`);
    }
  }, [searchParams, router]);

  const queryString = useMemo(() => {
    const params = new URLSearchParams(searchParams);
    return params.toString();
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      const meals = await fetchMeals(queryString);
      setMeals(meals);
    };
    fetchData();
  }, [queryString]);

  const handleChange = (name, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    router.replace(`${pathName}?${params.toString()}`);
  };

  const handleCheckBox = (event) => {
    handleChange("availableReservations", event.target.checked.toString());
  };

  return (
    <div className="flex flex-col items-center my-[85px] px-[160px] gap-[40px]">
      <h2 className="uppercase font-medium text-[35px] text-[#29ade5]">
        Our <span className="font-bold">Meals</span>
      </h2>
      <div className="flex justify-center gap-5">
        <TextField
          size="small"
          label="Search meals"
          variant="outlined"
          value={searchParams.get("title") || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          sx={{ mr: 2, width: "250px" }}
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={searchParams.get("sortKey") || ""}
              label="Sort By"
              onChange={(e) => handleChange("sortKey", e.target.value)}
            >
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="max_reservations">Max Reservations</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Direction</InputLabel>
            <Select
              value={searchParams.get("sortDir") || ""}
              label="Direction"
              onChange={(e) => handleChange("sortDir", e.target.value)}
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ ml: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={searchParams.get("availableReservations") === "true"}
                onChange={handleCheckBox}
              />
            }
            label="Available spots only"
          />
        </Box>
      </div>

      {meals.length === 0 ? (
        <p>No meals found</p>
      ) : (
        <MealList mealsList={meals} />
      )}
    </div>
  );
}
