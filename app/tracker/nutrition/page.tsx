"use client";
import { useState } from "react";
import TrackerHeader from "../../../components/TrackerHeader";
import { foodIntakeSchema } from "../../../validations/foodIntake";
import { ZodError } from "zod";

function NutritionPage() {
	const [name, setName] = useState("");
	const [calories, setCalories] = useState(0);
	const [carbs, setCarbs] = useState(0);
	const [fats, setFats] = useState(0);
	const [protein, setProtein] = useState(0);

	const validateFoodIntake = () => {
		const foodIntake = {
			name,
			calories,
			carbs,
			fats,
			protein,
		};

		try {
			foodIntakeSchema.parse(foodIntake);
			console.log("works")
		} catch (error) {
			if(error instanceof ZodError){
				console.log("zod error")
			}
		}
	};

	return (
		<main className="w-full h-full mt-24 bg-[#f3f3f3] px-4 py-6 rounded-md flex flex-col gap-4 shadow-md">
			<TrackerHeader title="Nutrition" />

			<form className="flex flex-col gap-4 md:flex-row bg-gray-100 py-2 md:items-center">
				<h2 className="text-xl font-semibold">Food Info</h2>
				<label htmlFor="name">Name</label>
				<input
					onChange={(e) => setName(e.target.value)}
					type="text"
					id="name"
					value={name}
					required
				/>
				<label htmlFor="calories">Calories</label>
				<input
					onChange={(e) => setCalories(Number(e.target.value))}
					type="number"
					id="calories"
					value={calories}
					required
				/>

				<h2 className="text-xl font-semibold mt-4">
					Macros (optional)
				</h2>
				<label htmlFor="carbs">Carbs</label>
				<input
					onChange={(e) => setCarbs(Number(e.target.value))}
					type="number"
					id="carbs"
					value={carbs}
					required
				/>
				<label htmlFor="fats">Fats</label>
				<input
					onChange={(e) => setFats(Number(e.target.value))}
					type="number"
					id="fats"
					value={fats}
					required
				/>
				<label htmlFor="protein">Protein</label>
				<input
					onChange={(e) => setProtein(Number(e.target.value))}
					type="number"
					id="protein"
					value={protein}
					required
				/>
				<button
					type="button"
					onClick={validateFoodIntake}
					className="bg-[#05204A] text-[#fafafa] px-4 py-2 rounded-md"
				>
					Add Item
				</button>
			</form>
		</main>
	);
}

export default NutritionPage;