'use client';

import { Drawer } from 'vaul';
import CategorySelect from './CategorySelect';

export default function BottomDrawer({ onCategoryChange, category }) {
  return (
    <Drawer.Portal>
      <Drawer.Overlay className="fixed inset-0 bg-black/40" />
      <Drawer.Content className="fixed right-0 bottom-0 left-0 h-fit bg-amber-50 outline-none">
        <CategorySelect
          onCategoryChange={onCategoryChange}
          category={category}
        />
      </Drawer.Content>
    </Drawer.Portal>
  );
}
