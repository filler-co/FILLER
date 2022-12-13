import React, { useRef } from "react";
import styled from "styled-components";
import { CM_CENTER_CENTER, CM_TOP_CENTER, CM_TOP_LEFT, CM_TOP_RIGHT } from "./ModalWindow";
import Clear from '../Questions/Clear.svg';
import ModalForm from "./ModalForm";

// Modal background layer - visible or invisible, but always floating above client's elements
const Model = styled.div`
    z-index: 999;
    display: ${({ show }) => (show ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width:100vw;
    background: rgba(0,0,0,0.5);
`;

// Rendered popup - a positional demo confirmation box
const Container = styled.div`
    position:fixed;
    background:  ${({ usage }) => (usage === 'image' ? 'transparent' : 'white')};
    width: auto;
    align-items:center;
    height: auto;
    overflow-y: auto;
    border: solid 1px transparent;
    border-radius : 10px;

    top: ${({ openPos }) => (
    {
      [CM_CENTER_CENTER]: '50%',
      [CM_TOP_LEFT]: '10%',
      [CM_TOP_CENTER]: '10%',
      [CM_TOP_RIGHT]: '10%'
    }[openPos])};

    left: ${({ openPos }) => (
    {
      [CM_CENTER_CENTER]: '50%',
      [CM_TOP_LEFT]: '5%',
      [CM_TOP_CENTER]: '50%',
      [CM_TOP_RIGHT]: '95%'
    }[openPos])};

    transform: ${({ openPos }) => (
    {
      [CM_CENTER_CENTER]: 'translate(-50%,-50%)',
      [CM_TOP_LEFT]: 'translate(0,0)',
      [CM_TOP_CENTER]: 'translate(-50%,0)',
      [CM_TOP_RIGHT]: 'translate(-100%,0)'
    }[openPos])};

    border-radius: 2px;
    padding: 0.75rem;
    color: rgba(0,0,139, 0.9);
`;

const Button = styled.button`
    background-color: grey;
    color: ${({ primary }) => (primary ? 'white' : 'white')};
    border: solid 2px #9f7500;
    border-radius: 8px;
    width: 5.0rem;
    padding: 0.2rem;
    margin: 0.2rem;
    font-size: 1rem;
`;

const Image = styled.div`
    width: 100%;
    height: 100%;
    border: solid 1px rgba(80,80,150, 0.4);
    ${'' /* background-color: rgba(80,80,150, 0.4); */}
`;

const Form = styled.div`
    min-width: 50vw;
    min-height: 50vh;
    border-radius: 5px;
    justify-content:center;
    color: black
    ${'' /* border: solid 1px black; */}
    ${'' /* background-color: rgba(80,80,150, 0.4); */}
`;

const ButtonBar = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1 0 auto;
    justify-content: flex-end;
    cursor:pointer;
`;

export default function ModalWindowImpl(props) {
  const {
    handleClose, // renderProp fn returns true or false
    show, // boolean - visible/invisible
    url,
    usage,
    openPos // symbol for placement
  } = { ...props };

  const closeWindow = () => {
    handleClose(false);

  }

  const renderForm = (usage) => {
    if (usage === 'question'|| usage === 'answer') {
      return <Form>
        <ModalForm type={usage}/>
      </Form>
    } else {
      return <Image><img src={url} alt="..." width="600" height="600" /></Image>
    }
  }


  //console.log('url is : ', url);
  return (
    <Model show={show}>
      <Container openPos={openPos} usage={usage}>

        <ButtonBar>
        <Clear
          width="20px"
          height="20px"
          stroke="red"
          onClick={closeWindow}
        />
          {/* <Button onClick={closeWindow} primary={false}>X</Button> */}
        </ButtonBar>
        {renderForm(usage)}
      </Container>
    </Model>
  );
}
