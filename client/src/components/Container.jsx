import update from "immutability-helper";
import { memo, useCallback, useState } from "react";
import { NativeTypes } from "react-dnd-html5-backend";
import { ItemBox } from "./Itembox";
import { ItemBoxContainer } from "./ItemBoxContainer";
import { ItemTypes } from "./ItemTypes";
import animal from "../assets/animal.jpg";
import food from "../assets/food.webp";
import rose from "../assets/rose.jpg";
import place from "../assets/place.jpg";


export const Container = memo(function Container() {
  const [ItemBoxContainers, setItemBoxContainers] = useState([
    { accept: [ItemTypes.IMAGE, NativeTypes.FILE], name: "food", src: null },
    { accept: [ItemTypes.IMAGE, NativeTypes.FILE], name: "flower", src: null },
    { accept: [ItemTypes.IMAGE, NativeTypes.FILE], name: "place", src: null },
    { accept: [ItemTypes.IMAGE, NativeTypes.FILE], name: "animal", src: null },
    { accept: [ItemTypes.IMAGE, NativeTypes.FILE], name: "food", src: null },
    { accept: [ItemTypes.IMAGE, NativeTypes.FILE], name: "flower", src: null },
    { accept: [ItemTypes.IMAGE, NativeTypes.FILE], name: "place", src: null },
    { accept: [ItemTypes.IMAGE, NativeTypes.FILE], name: "food", src: null },
  ]);

  const [ItemBoxs, setItemBox] = useState([
    { name: "animal", src: animal, type: ItemTypes.IMAGE, isDropped: false},
    { name: "food", src: food, type: ItemTypes.IMAGE, isDropped: false},
    { name: "flower", src: rose, type: ItemTypes.IMAGE , isDropped: false},
    { name: "place", src: place, type: ItemTypes.IMAGE, isDropped: false},
    { name: "food2", src: food, type: ItemTypes.IMAGE , isDropped: false},
    { name: "flower1", src: rose, type: ItemTypes.IMAGE, isDropped: false},
    { name: "place1", src: place, type: ItemTypes.IMAGE, isDropped: false},
    { name: "food1", src: food, type: ItemTypes.IMAGE , isDropped: false},
  ]);

 const [DroppedItemBoxNames, setDroppedItemBoxNames] = useState([]);
 function isDropHandle(index) {
    const newItemBoxs = [...ItemBoxs];
    newItemBoxs[index].isDropped = true;
    setItemBox(newItemBoxs);
 }
 
  const handleDrop = useCallback(
    (index, item) => {
      const { name, src } = item;
      const newItems = [...ItemBoxContainers];
      newItems[index].isDropped = true;
      setItemBoxContainers(
        update(ItemBoxContainers, {
          [index]: { src: { $set: src } },
        })
      );
      
      // setItemBox(
      //   update(ItemBoxs, {
      //     [index]: { isDropped: { $set: true } },
      //   }),
      // );

      if (name === ItemBoxContainers[index].name) {
        console.log("correct");       
      } else {
        console.log("wrong");
      }
    },
    [DroppedItemBoxNames, ItemBoxContainers]
  );
  console.log(ItemBoxContainers);
  return (
    <div>
      <div className=" w-[739px] h-[695px] bg-white border-[5px] border-[#2963E4CC] p-3">
        <div className="border-[5px] border-[#DF577E] border-dashed h-full w-full p-5 ">
          <div className="flex flex-col w-full h-full gap-10 justify-center items-center">
            <div>
              <p className="text-2xl font-sans from-neutral-400 text-left font-[19px]">
                Drag and drop the names to their respective images in the box
              </p>
            </div>

            <div
              className="flex flex-row justify-between"
              style={{ overflow: "hidden", clear: "both" }}
            >
              <div className=" flex flex-row flex-wrap gap-5 justify-around w-[361.21px] h-auto ">
                {ItemBoxs.map(({ name, type, src, isDropped}, index) => {
                  
                  return <ItemBox
                    name={name}
                    type={type}
                    src={src}
                    isDropped={isDropped}
                    key={index}
                  />
                })}
              </div>
            </div>
            <div className="w-[450px] h-80  flex flex-row flex-wrap ">
              <div className="flex flex-col  px-5 py-2 flex-wrap max-h-80 items-baseline">
                {ItemBoxContainers.map(({ accept, name, src }, index) => (
                  <ItemBoxContainer
                    accept={accept}
                    onDrop={(item) => handleDrop(index, item)}
                    src={src}
                    key={index}
                    name={name}

                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
