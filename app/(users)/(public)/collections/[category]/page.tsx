import getProductByCategory from "./action";
import CategoryClientPage from "./CategoryClientPage";
import Link from "next/link";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const categoryData = await getProductByCategory(category);

  if (!categoryData) {
    return (
      <div className="pt-32 pb-20 flex flex-col items-center justify-center text-center">
        <div className="bg-gray-100 dark:bg-zinc-900 p-6 rounded-full mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Category not found
        </h1>
        <p className="text-gray-500 dark:text-zinc-400 mt-2">
          The category you are looking for doesn&apos;t exist or has no
          products.
        </p>
        <Link
          href="/"
          className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div>
      <CategoryClientPage categoryData={categoryData} />
    </div>
  );
}
