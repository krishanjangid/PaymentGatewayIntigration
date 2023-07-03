import { memo } from "react";
import { useDrag } from "react-dnd";

export const ItemBox = memo(function ItemBox({ name, type, isDropped }) {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: { name },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [name, type]
  );
  return (
    <div ref={drag} style={{ opacity }} className="border-2 border-dashed bg-white">
      {isDropped ? <s>{name}</s> : name}
    </div>
  )
});
