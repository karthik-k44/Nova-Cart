interface CategoryFilterProps {
  categories: string[];
  value: string;
  onChange: (value: string) => void;
}


import React from 'react'

const CategoryFilter: React.FC<CategoryFilterProps>= ({
  categories,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange("all")}
        className={`rounded-full px-3 py-1.5 text-sm font-medium capitalize transition-colors duration-200 ${
          value === "all"
            ? "bg-indigo-600 text-white"
            : "bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-800"
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`rounded-full px-3 py-1.5 text-sm font-medium capitalize transition-colors duration-200 ${
            value === category
              ? "bg-indigo-600 text-white"
              : "bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50 dark:bg-gray-900 dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-800"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
