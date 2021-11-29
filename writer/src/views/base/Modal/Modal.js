import { useState } from "react";
import { Button,Modal } from "react-bootstrap";

const ModalCard=({Show,Close,Save,ButtonName,content,isShowLoader,style,showBtn=true,Buttons})=>{
  

return (
  <>
   

    <Modal style={style} show={Show} onHide={Close}>
      <Modal.Header closeButton>
        <Modal.Title>{ButtonName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          {content}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={Close}>
          Close
        </Button>
       {showBtn &&<Button variant="primary" disabled={isShowLoader} onClick={Save}>
          {ButtonName}
        </Button>}
        {!showBtn && Buttons() }
      </Modal.Footer>
    </Modal>
  </>
);
}

export default ModalCard;