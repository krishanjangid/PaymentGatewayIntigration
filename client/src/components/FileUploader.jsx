import update from 'immutability-helper';
import { memo, useCallback,useState } from "react";
import { NativeTypes } from "react-dnd-html5-backend";
import { ItemBox } from "./Itembox";
import { ItemBoxContainer } from "./ItemBoxContainer";
import { ItemTypes } from "./ItemTypes";


 function FileUploader(){
    return (
        <>
        <h1>Drag and Drop</h1>
        <Container />
        </>
    )
}

export default FileUploader;

//contianer

function Container() {
    const [ItemBoxContainers, setItemBoxContainers] = useState([
        { accept: [ItemTypes.FOOD, NativeTypes.FILE] },
        { accept: ItemTypes.GLASS },
        { accept: ItemTypes.PAPER },
        { accept: ItemTypes.PLASTIC },
      ]);
    
      const [ItemBoxs, setItemBox] = useState([
        { name: "samosa", type: ItemTypes.FOOD },
        { name: "bottle", type: ItemTypes.GLASS},
        { name: "news paper", type: ItemTypes.PAPER },
        { name: "chair", type: ItemTypes.PLASTIC },
      ]);
    
      const [DroppedItemBoxNames, setDroppedItemBoxNames] = useState([]);
    
      function isDropped(ItemBoxName) {
        return DroppedItemBoxNames.indexOf(ItemBoxName) > -1;
      } 
    
      // const handleDrop = useCallback(
      //   (index, item) => {
      //     const { name } = item;
      //     setDroppedItemBoxNames(DroppedItemBoxNames.concat(name));
      //     const newItems = [...ItemBox];
      //     newItems[index].isDropped = true;
      //     setItemBox(newItems);
      //   },
      //   [DroppedItemBoxNames, ItemBox]
      // );
    
      const handleDrop = useCallback(
        (index, item) => {
          const { name } = item
          setDroppedItemBoxNames(
            update(DroppedItemBoxNames, name ? { $push: [name] } : { $push: [] }),
          )
          setItemBoxContainers(
            update(ItemBoxContainers, {
              [index]: {
                lastDroppedItem: {
                  $set: item,
                },
              },
            }),
          )
        },
        [DroppedItemBoxNames, ItemBoxContainers],
      )
    
      return (
        <div>
          <div style={{ overflow: "hidden", clear: "both" }}>
            {ItemBoxs.map(({ name, type, isDropped }, index) => {
              <ItemBox name={name} type={type} isDropped={isDropped} key={index} />;
            })}
          </div>
    
          <div style={{ overflow: "hidden", clear: "both" }}>
            {ItemBoxContainers.map(({ accept }, index) => {
              <ItemBoxContainer
                accept={accept}
                onDrop={(item) => handleDrop(index, item)}
                key={index}
              />;
            })}
          </div>
        </div>
      );
    };
    
    


