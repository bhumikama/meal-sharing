// "use client";
// import MealList from "@/components/Meals/MealList";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import Box from "@mui/material/Box";
// import Checkbox from "@mui/material/Checkbox";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import { useEffect, useMemo, useState } from "react";
// import { usePathname, useSearchParams, useRouter } from "next/navigation";
// import { fetchMeals } from "@/utils/fetchMeals";

// export default function Recipes() {
//   const [meals, setMeals] = useState([]);
//   const searchParams = useSearchParams();
//   const pathName = usePathname();
//   const router = useRouter();

//   useEffect(() => {
//     const params = new URLSearchParams(searchParams);
//     if (!params.has("sortKey")) {
//       params.set("sortKey", "price");
//     }
//     if (!params.has("sortDir")) {
//       params.set("sortDir", "ascending");
//     }
//     if (!params.has("availableReservations")) {
//       params.set("availableReservations", false);
//     }
//     router.replace(`${pathName}?${params.toString()}`);
//   }, [searchParams, router]);

//   const queryString = useMemo(() => {
//     const params = new URLSearchParams(searchParams);
//     return params.toString();
//   }, [searchParams]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const meals = await fetchMeals(queryString);
//       setMeals(meals);
//     };
//     fetchData();
//   }, [queryString]);

//   const handleChange = (name, value) => {
//     const params = new URLSearchParams(searchParams);
//     if (value) {
//       params.set(name, value);
//     } else {
//       params.delete(name);
//     }
//     router.replace(`${pathName}?${params.toString()}`);
//   };

//   const handleSortChange = (param, value) => {
//     const params = new URLSearchParams(searchParams);
//     params.set(param, value);
//     router.replace(`${pathName}?${params.toString()}`);
//   };

//   const handleCheckBox = (event) => {
//     const params = new URLSearchParams(searchParams);
//     if (event.target.checked) {
//       params.set("availableReservations", true);
//     } else {
//       params.delete("availableReservations");
//     }
//     router.replace(`${pathName}?${params.toString()}`);
//   };

//   return (
//     <div className="flex flex-col items-center my-[85px] px-[160px] gap-[40px]">
//       <h2 className="uppercase font-medium text-[35px]">
//         Our
//         <span className="font-bold"> Meals</span>
//       </h2>
//       <div className="flex justify-center gap-5">
//         <TextField
//           size="small"
//           label="Search meals"
//           variant="outlined"
//           defaultValue={searchParams.get("title") || ""}
//           onChange={(e) => handleChange("title", e.target.value)}
//           sx={{ mr: 2, width: "250px" }}
//         />
//         <Box sx={{ display: "flex", gap: 2 }}>
//           <FormControl size="small" sx={{ minWidth: 120 }}>
//             <InputLabel>Sort By</InputLabel>
//             <Select
//               value={searchParams?.get("sortKey")}
//               label="Sort By"
//               onChange={(e) => handleSortChange("sortKey", e.target.value)}
//             >
//               <MenuItem value="price">Price</MenuItem>
//               <MenuItem value="max_reservations">Max Reservations</MenuItem>
//             </Select>
//           </FormControl>
//           <FormControl size="small" sx={{ minWidth: 120 }}>
//             <InputLabel>Direction</InputLabel>
//             <Select
//               value={searchParams?.get("sortDir")}
//               label="Direction"
//               onChange={(e) => handleSortChange("sortDir", e.target.value)}
//             >
//               <MenuItem value="ascending">Ascending</MenuItem>
//               <MenuItem value="descending">Descending</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>
//         <Box sx={{ ml: 2 }}>
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={searchParams.get("availableReservations") === "true"}
//                 onChange={handleCheckBox}
//                 name="availableReservations"
//               />
//             }
//             label="Available spots only"
//           />
//         </Box>
//       </div>
//       {meals.length === 0 ? (
//         <p>No meals found</p>
//       ) : (
//         <MealList mealsList={meals} />
//       )}
//     </div>
//   );
// }

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
