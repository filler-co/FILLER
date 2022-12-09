import React, { useRef } from "react";
import styled from "styled-components";
import { CM_CENTER_CENTER, CM_TOP_CENTER, CM_TOP_LEFT, CM_TOP_RIGHT } from "./ModalWindow";
import ModalForm from "./ModalForm";

// Modal background layer - visible or invisible, but always floating above client's elements
const Model = styled.div`
    z-index: auto;
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
    background: white;
    width: auto;
    align-items:center;
    height: auto;
    overflow-y: auto;

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
    width: 69vw;
    height: 60vh;
    ${'' /* border: solid 1px black; */}
    ${'' /* background-color: rgba(80,80,150, 0.4); */}
`;

const ButtonBar = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1 0 auto;
    justify-content: flex-end;
`;

export default function ConfirmationModalImpl(props) {
  const {
    handleClose, // renderProp fn returns true or false
    show, // boolean - visible/invisible
    url,
    usage,
    openPos // symbol for placement
  } = { ...props };

  const closeWindow = () => handleClose(false);

  const renderForm = (usage) => {
    if (usage === 'question') {
      return <Form>
        <ModalForm />
      </Form>
    }
    if (usage === 'answer') {
    }
    if (usage === 'image') {
      return <Image><img src={url} alt="..." width="600" height="600" /></Image>
    }
  }


  console.log('url is : ', url);
  return (
    <Model show={show}>
      <Container openPos={openPos} >
        <ButtonBar>
          <Button onClick={closeWindow} primary={false}>X</Button>
        </ButtonBar>
        {renderForm(usage)}
      </Container>
    </Model>
  );
}
