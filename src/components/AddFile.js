import { v4 as uuidv4 } from 'uuid'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { close } from '../store/slice/modalSlice'
import React, { useRef} from 'react';
import { addFile as add } from '../store/slice/addFileSlice'
import { setStorageValue } from "../utils/localStorage";

function AddFile() {

    let { id } = useParams();
    const inputRef = useRef(null);
    const dispatch = useDispatch()
    const show = useSelector(state => state.modalSlice.showModal)
    const modalId = useSelector(state => state.modalSlice.modalId)
    const files = useSelector((state) => state.fileSlice.files);
    
    function addFile() {        
        let newFile={id:uuidv4(),url:inputRef.current.value,folderId:id}
        setStorageValue('files',[...files,newFile])
        dispatch(add(newFile));
        dispatch(close())
    }
    
    return (
        <>
            <Modal dialogClassName="add-file" show={show && modalId=='add-file'} onHide={() => dispatch(close())} data-testid="add-file-popup">
                <Modal.Header closeButton>
                    <Modal.Title>Add File</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Control
                    placeholder="File URL"
                    ref={inputRef}
                 />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => dispatch(close())}>
                        Close 
                    </Button>
                    <Button variant="primary" onClick={addFile}>
                        Add File
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddFile;