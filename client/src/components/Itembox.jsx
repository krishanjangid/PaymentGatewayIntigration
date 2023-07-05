import { memo } from "react";
import { useDrag,useDrop} from "react-dnd";

export const ItemBox = memo(function ItemBox({ name, type, src, isDropped }) {

  
  
  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: { name,src },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.6 : 1,
        
      }),
    }),
    [name, type]
  );

  

  
  
  return (
    <div ref={drag} style={{ opacity }} className=" bg-white h-[60px] w-[60px]">
      {isDropped ? "Image" : <img src={src} name={name} alt={type} className=" aspect-square object-fill" />}
    </div>
  )
});
