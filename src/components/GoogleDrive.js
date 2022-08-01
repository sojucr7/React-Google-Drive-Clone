import './css/GoogleDrive.css';
import AddFile from './AddFile'
import AddFolder from './AddFolder'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from "react-router-dom"
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'
import { mediaType } from '../utils/mediaType'
import ReactFolderIcon from '../svg/folder.svg'
import Container from 'react-bootstrap/Container'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFiles } from '../store/slice/addFileSlice'
import { open} from '../store/slice/modalSlice'
import { getFolders, getFiles } from '../utils/filters'
import { getStorageValue } from "../utils/localStorage"
import { useParams, useLocation } from 'react-router-dom'
import { setFolders } from '../store/slice/addFolderSlice'
import { setPath } from '../store/slice/pathSlice'
import Path from './Path'
function GoogleDrive() {

    const dispatch = useDispatch()
    const location = useLocation();
    let { id } = useParams();
    
    const folders = getFolders(useSelector((state) => state.folderSlice.folders), id);
    const files = getFiles(useSelector((state) => state.fileSlice.files), id);

    useEffect(() => {
        let folders = getStorageValue('folders') ?? [];
        let files = getStorageValue('files') ?? [];
        let paths = getStorageValue('paths') ?? [];
        dispatch(setFolders(folders))
        dispatch(setFiles(files))
        dispatch(setPath(paths))
    }, []);

    return (
        <>

            <Container>
                <Row className="pt-3">

                    <div className="d-flex flex-row">
                        <Path />
                        <div className='d-flex flex-row'>
                            <button type="button" className="btn btn-light" data-testid="add-file" onClick={() => dispatch(open('add-file'))}>Add File</button>
                            <div className="p-2"><Button variant="primary" data-testid="add-folder" onClick={() => dispatch(open('add-folder'))}>Add Folder </Button></div>
                        </div>
                    </div>
                </Row>
                <Row className="pt-3">
                    <Stack direction="horizontal" gap={3}>
                        {folders.map(function (folder, i) {
                            return (<Link to={`/folders/${folder.id}`} key={folder.id}  data-testid="folder-link"><div className="bg-light border p-3" data-testid="folders">{folder.name} <img src={ReactFolderIcon} alt="React Folder Icon" /> </div></Link>);
                        })}
                    </Stack>
                </Row>
                <Row className="pt-3">

                    <Stack direction="horizontal" gap={3}>

                        {files.map(function (file, i) {
                            return (
                                mediaType(file.url) == 'IMAGE' &&
                                <div className="d-flex flex-column" key={file.id}>
                                    <img src={file.url} alt={file.url} width="200" height="200" />
                                    <div className="p-2">File {i}</div>
                                </div>

                            );
                        })}

                        {files.map(function (file, i) {
                            return (
                                mediaType(file.url) == 'VIDEO' &&
                                <div className="d-flex flex-column" key={file.id}>
                                    <video width="200" height="200" controls>
                                        <source src={file.url} type="video/mp4" />
                                        <source src={file.url} type="video/ogg" />
                                        Your browser does not support the video tag.
                                    </video>
                                    <div className="p-2">File {i}</div>
                                </div>);
                        })}
                    </Stack>
                </Row>
            </Container>
            <AddFolder />
            <AddFile />
        </>
    );
}

export default GoogleDrive;