import update from 'immutability-helper';
import { memo, useCallback,useState } from "react";
import { NativeTypes } from "react-dnd-html5-backend";
import { ItemBox } from "./Itembox";
import { ItemBoxContainer } from "./ItemBoxContainer";
import { ItemTypes } from "./ItemTypes";
import {Container} from "./Container";


 function FileUploader(){
    return (
        <>
        <Container />
        </>
    )
}

export default FileUploader;
