import { getSubCategories } from "../category/action";
import { getUnits } from "../units/action";
import { AddProductForm } from "./_components/AddPoductForm";
export default async function AddProductPage() {
  const subCategories = await getSubCategories();
  const units = await getUnits();

  return (
    <div className="p-8 flex-1 overflow-auto bg-zinc-50/50 dark:bg-zinc-950/20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            Inventory Management
          </p>
          <h1 className="text-4xl font-bold tracking-tighter mt-1 italic uppercase">
            Create New Product
          </h1>
        </div>

        {/*Just give sub categories basic details */}
        <AddProductForm categories={subCategories} units={units} />
      </div>
    </div>
  );
}
