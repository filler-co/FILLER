import React from 'react';
import ModalWindowImpl from './ModalWindowImpl';

// These are the only possible openPos values
export const CM_CENTER_CENTER = Symbol('CM_CENTER_CENTER');
export const CM_TOP_LEFT = Symbol('CM_TOP_LEFT');
export const CM_TOP_CENTER = Symbol('CM_TOP_CENTER');
export const CM_TOP_RIGHT = Symbol('CM_TOP_RIGHT');

export default function ModalWindow(props) {
    const {
        handleClose, // renderProp
        show, // boolean
        url, // text
        usage,
        openPos
    } = {...props};

    //console.log('modal is : ', show, usage);

    return (
        <ModalWindowImpl
            handleClose={handleClose}
            show={show}
            url={url}
            openPos={openPos}
            usage={usage}
        />
    );
}
