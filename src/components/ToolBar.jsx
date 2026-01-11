import { Menu, Settings2 } from 'lucide-react';
import CategorySelect from './CategorySelect';
import { Drawer } from 'vaul';
import BottomDrawer from './BottomDrawer';

export default function ToolBar({ onCategoryChange, category }) {
  return (
    <header className="absolute inset-x-0 top-0 z-10 flex h-14 w-full items-center justify-center gap-8 bg-amber-100 p-2 shadow-2xs sm:p-8">
      <h1 className="font-neuton text-center text-3xl leading-[-4%] font-extrabold text-amber-900 sm:text-3xl">
        Bible Wordle
      </h1>
      <div className="absolute left-4 h-8 sm:left-8">
        <Drawer.Root>
          <Drawer.Trigger>
            <Settings2
              strokeWidth={1.5}
              className="aspect-auto h-8 w-8 text-amber-900"
            />
          </Drawer.Trigger>
          <BottomDrawer
            onCategoryChange={onCategoryChange}
            category={category}
          />
        </Drawer.Root>
      </div>
      {/* <CategorySelect /> */}
    </header>
  );
}
