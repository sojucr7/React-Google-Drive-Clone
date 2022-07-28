import './css/GoogleDrive.css';
import AddFolder from './AddFolder'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from "react-router-dom"
import Stack from 'react-bootstrap/Stack'
import {getFolders} from '../utils/filters'
import Button from 'react-bootstrap/Button'
import ReactFolderIcon from '../svg/folder.svg'
import Container from 'react-bootstrap/Container'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { open, close } from '../store/slice/modalSlice'
import { getStorageValue } from "../utils/localStorage"
import { useParams,useLocation } from 'react-router-dom'
import { setFolders } from '../store/slice/addFolderSlice'

function GoogleDrive() {

    const dispatch = useDispatch()
    const location = useLocation();
    let { id } = useParams();
    const folders = getFolders(useSelector((state) => state.folders.folders),id);

    useEffect(() => {
        let folders=getStorageValue('folders')??[];
        dispatch(setFolders(folders))
    }, []);

    return (
        <>
            <Container>
                <Row className="pt-3">
                    <div className="d-flex flex-row-reverse">
                        <div className="p-2"><Button variant="primary" onClick={() => dispatch(open())}>Add Folder </Button></div>
                        <div className="p-2"><label className="custom-file-upload">
                            <input type="file" />
                            Add File 
                        </label></div>
                    </div>
                </Row>
                <Row className="pt-3">
                    <Stack direction="horizontal" gap={3}>
                        {folders.map(function (folder, i) {
                            return (<Link to={`/folders/${folder.id}`} key={i} ><div className="bg-light border p-3">{folder.name} <img src={ReactFolderIcon} alt="React Folder Icon" /> </div></Link>);
                        })}
                    </Stack>
                </Row>
            </Container>
            <AddFolder />
        </>
    );
}

export default GoogleDrive;