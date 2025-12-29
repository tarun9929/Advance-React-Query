import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router';
import { ClipLoader } from "react-spinners";

async function getRecipes() {
    const response = await axios.get("https://dummyjson.com/recipes");
    return response.data;
}

const difficultyColors = {
    Easy: "bg-green-500",
    Medium: "bg-orange-500",
    Hard: "bg-red-500",
};

function Recipes() {
    const { isLoading, data } = useQuery({
        queryKey: ["recipes"],
        queryFn: getRecipes,
        staleTime: 10 * 1000,
        refetchInterval: 10 * 1000,
    });

    if (isLoading) {
        return (
            <h2 className="text-center text-xl text-gray-500 mt-20">
                <ClipLoader color='#ccc' size={125} />
            </h2>
        );
    }

    return (
        <>
            <h1 className="text-center text-4xl font-bold text-red-500 my-10">
                🍽️ Recipes
            </h1>

            <div className="grid gap-8 px-6 
                      sm:grid-cols-2 
                      lg:grid-cols-3">
                {data?.recipes.map(
                    ({ image, difficulty, name, id, rating, cuisine, tags }) => (
                        <div
                            key={id}
                            className="bg-white rounded-xl border shadow-sm 
                         hover:shadow-lg transition duration-300
                         flex flex-col overflow-hidden"
                        >
                            {/* Image */}
                            <img
                                src={image}
                                alt={name}
                                className="h-52 w-full object-cover"
                            />

                            {/* Content */}
                            <div className="p-5 flex flex-col flex-grow">
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                                    {name}
                                </h2>

                                {/* Meta info */}
                                <div className="flex flex-wrap items-center gap-2 mb-4">
                                    <span
                                        className={`text-white text-sm font-semibold px-2 py-0.5 rounded-md 
                                ${difficultyColors[difficulty]}`}
                                    >
                                        {difficulty}
                                    </span>

                                    <span className="flex items-center gap-1 bg-blue-600 text-white text-sm px-2 py-0.5 rounded-md">
                                        {rating}
                                        <FaStar className="text-yellow-400" />
                                    </span>

                                    <span className="bg-red-500 text-white text-sm px-2 py-0.5 rounded-md">
                                        {cuisine}
                                    </span>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-5">
                                    {tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="text-xs border rounded-md px-2 py-0.5 text-gray-600"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Button */}
                                <Link
                                    to={`${id}`}
                                    className="mt-auto inline-flex items-center justify-center
                             bg-gray-900 text-white text-sm font-medium
                             px-4 py-2 rounded-md
                             hover:bg-gray-700 transition"
                                >
                                    Read more
                                    <svg
                                        className="w-4 h-4 ml-2"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    )
                )}
            </div>
        </>
    );
}

export default Recipes;

