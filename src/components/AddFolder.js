import { v4 as uuidv4 } from 'uuid'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { open, close } from '../store/slice/modalSlice'
import React, { useRef,useState,useEffect } from 'react';
import { addFolder as add } from '../store/slice/addFolderSlice'
import { setStorageValue,getStorageValue } from "../utils/localStorage";

function AddFolder() {
    let { id } = useParams();
    const inputRef = useRef(null);
    const dispatch = useDispatch()
    const show = useSelector(state => state.modal.showModal)
    const folders = useSelector((state) => state.folders.folders);

    function addFolder() {        
        let newFolder={id:uuidv4(),name:inputRef.current.value,parentId:id}
        setStorageValue('folders',[...folders,newFolder])
        dispatch(add(newFolder));
        dispatch(close())
    }
    
    return (
        <>
            <Modal show={show} onHide={() => dispatch(close())}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Folder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Control
                    placeholder="Folder name"
                    ref={inputRef}
                 />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => dispatch(close())}>
                        Close 
                    </Button>
                    <Button variant="primary" onClick={addFolder}>
                        Add Folder
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddFolder;