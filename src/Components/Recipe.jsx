import { useParams } from 'react-router';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { FaStar } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

async function getRecipesById(id) {
  const { data } = await axios.get(`https://dummyjson.com/recipes/${id}`);
  return data;
}

function Recipe() {
  const { id } = useParams();

  const { isLoading, isError, data } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getRecipesById(id),
    staleTime: 10 * 1000,
  });

  if (isLoading) {
    return (
      <p className="text-center text-lg text-gray-500 mt-20">
        <ClipLoader color='#ccc' size={125} />
      </p>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-lg text-red-500 mt-20">
        Failed to load recipe
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 my-10">
      {/* Title */}
      <h1 className="text-4xl font-bold text-red-500 mb-6">
        {data.name}
      </h1>

      {/* Image */}
      <img
        src={data.image}
        alt={data.name}
        className="w-full h-100 object-cover rounded-xl shadow-md mb-8"
      />

      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-4 mb-10">
        <span className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-md font-medium">
          {data.rating}
          <FaStar className="text-yellow-400" />
        </span>

        <span className="bg-red-500 text-white px-4 py-1 rounded-md font-medium">
          {data.cuisine}
        </span>
      </div>

      {/* Ingredients */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Ingredients
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {data.ingredients.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
      </section>

      {/* Instructions */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Instructions
        </h2>
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          {data.instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>
    </div>
  );
}

export default Recipe;
