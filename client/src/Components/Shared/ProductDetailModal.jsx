import React from 'react';
import PDModalWindowImpl from './PDModalWindowImpl';

// These are the only possible openPos values
export const CM_CENTER_CENTER = Symbol('CM_CENTER_CENTER');
export const CM_TOP_LEFT = Symbol('CM_TOP_LEFT');
export const CM_TOP_CENTER = Symbol('CM_TOP_CENTER');
export const CM_TOP_RIGHT = Symbol('CM_TOP_RIGHT');

export default function ProductDetailModalWindow(props) {
    const {
        handleClose, // renderProp
        show, // boolean
        url, // text
        openPos,
        galleryList
    } = {...props};

    return (
        <PDModalWindowImpl
            handleClose={handleClose}
            show={show}
            url={url}
            openPos={openPos}
            galleryList={galleryList}
        />
    );
}
