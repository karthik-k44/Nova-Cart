interface CategoryFilterProps {
  categories: string[];
  value: string;
  onChange: (value: string) => void;
  onClick: ()=> void;
}


import React from 'react'

const CategoryFilter: React.FC<CategoryFilterProps>= ({
  categories,
  value,
  onChange,
  onClick,
}) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange("all")}
        className={`rounded-lg px-3 py-1 text-sm font-medium capitalize transition-colors duration-200 hover:cursor-pointer border-indigo-600 ${
          value === "all"
            ? "bg-indigo-600 text-white"
            : "bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-blue-100 dark:bg-gray-900 dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-800"
        }`}
      >
        All
      </button>

      <div className="flex-1 overflow-x-auto scroll-auto scrollbar-none items-center ">
        <div className="flex w-max gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onChange(category)}
              className={`rounded-lg px-3 py-1 text-sm hover:cursor-pointer font-medium capitalize transition-colors duration-200 border border-indigo-600 ${
                value === category
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-blue-100 dark:bg-gray-900 dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onClick}
        className="text-xs font-medium hover:cursor-pointer text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
      >
        Clear all
      </button>
    </div>
  );
}

export default CategoryFilter;
