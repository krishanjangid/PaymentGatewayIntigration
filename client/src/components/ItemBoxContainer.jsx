import { memo } from "react";
import { useDrop } from "react-dnd";
const style = {
  textAlign: "center",
};

export const ItemBoxContainer = memo(function ItemBoxContainer({
  accept,
  onDrop,
  src,
  name,

}) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const isActive = isOver && canDrop;
  let backgroundColor = "#E84F8F63";
  let opacity = 0.7;
  if (isActive) {
    backgroundColor = "#E84F8F";
    opacity = 0.7;
  } else if (canDrop) {
    backgroundColor = "#E84F8F90";
    opacity = 0.9;
  } 

  return (
    <div className="flex flex-row justify-between items-center w-[185px] h-[50px] mt-5 mn-5 mx-3">
      <p>{name}</p>
      <div
        ref={drop}
        style={{ ...style, backgroundColor, opacity }}
        data-testid="ItemBoxContainer"
        className=" border-[1px]  w-[49px] h-[49px] rounded-[3px] border-[#E84F8F63]"
      >
       <img src={src}  className="aspect-square w-[55px]  rounded-[2px]"/>
      </div>
    </div>
  );
});
