import { v4 as uuidv4 } from 'uuid'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { getPath, getFolder } from '../utils/filters'
import Button from 'react-bootstrap/Button'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { close } from '../store/slice/modalSlice'
import React, { useRef} from 'react';
import { addPath } from '../store/slice/pathSlice'
import { addFolder as add } from '../store/slice/addFolderSlice'
import { setStorageValue} from "../utils/localStorage";

function AddFolder() {
    let { id } = useParams();
    const inputRef = useRef(null);
    const dispatch = useDispatch()
    const show = useSelector(state => state.modalSlice.showModal)
    const modalId = useSelector(state => state.modalSlice.modalId)
    const folders = useSelector((state) => state.folderSlice.folders);
    const paths = useSelector((state) => state.pathSlice.paths);

    function addFolder() {
        let newFolder = { id: uuidv4(), name: inputRef.current.value, parentId: id };
        let currentFolder = getFolder(folders, id) ?? { id: null, name: 'ROOT', parentId: null };
        let currentFolderPath = getPath(paths, currentFolder.id) ?? [];
        
        setStorageValue('folders', [...folders, newFolder])
        dispatch(add(newFolder));

        setStorageValue('paths', [...paths, { folderId: newFolder.id, path: [...currentFolderPath, newFolder] }])
        dispatch(addPath({ folderId: newFolder.id, path: [...currentFolderPath, newFolder] }));
        dispatch(close())
    }

    return (
        <>
            <Modal dialogClassName="add-folder" show={show && modalId == 'add-folder'} onHide={() => dispatch(close())} data-testid="add-folder-popup">
                <Modal.Header closeButton>
                    <Modal.Title>Add Folder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        placeholder="Folder name"
                        ref={inputRef}
                        data-testid="add-folder-input"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => dispatch(close())}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={addFolder} data-testid="add-folder-submit-btn">
                        Add Folder
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddFolder;