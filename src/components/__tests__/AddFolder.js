import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import GoogleDrive from '../GoogleDrive';
import App from '../../App';
import { setStorageValue } from "../../utils/localStorage"
import { render, fireEvent, waitFor, screen } from '../../test-utils';
import userEvent from '@testing-library/user-event'
import ReactRouter from 'react-router'
import { createMemoryHistory } from 'history'
import {
    MemoryRouter,
    Router
} from "react-router-dom";
import { useParams, useLocation } from 'react-router-dom'

beforeEach(() => {
    useParams.mockReturnValue({ id: null })
});

test('it list all Folders on initial load', async () => {

    let folders = [
        { id: uuidv4(), name: 'Folder 1', parentId: null },
        { id: uuidv4(), name: 'Folder 2', parentId: null },
        { id: uuidv4(), name: 'Folder 3', parentId: null }
    ];

    setStorageValue("folders", folders)
    
    render(<GoogleDrive />);

    expect(screen.getAllByTestId('folders')[0]).toHaveTextContent('Folder 1');
    expect(screen.getAllByTestId('folders')[1]).toHaveTextContent('Folder 2');
    expect(screen.getAllByTestId('folders')[2]).toHaveTextContent('Folder 3');

})

test('it list sub Folders for a given Parent Folder', async () => {

    let parentFolderId = uuidv4();
    let folders = [
        { id: parentFolderId, name: 'Folder 1', parentId: null },
        { id: uuidv4(), name: 'Folder 2', parentId: parentFolderId },
        { id: uuidv4(), name: 'Folder 3', parentId: parentFolderId }
    ];
    setStorageValue("folders", folders)
    // mock the module using the mock function created above
    useParams.mockReturnValue({ id: parentFolderId })

    render(<GoogleDrive />);

    expect(screen.getAllByTestId('folders')[0]).toHaveTextContent('Folder 2');

})

test('opens "Add A Folder" popup when clicks on Add folder Button', async () => {

    render(<GoogleDrive />);

    fireEvent.click(screen.getByTestId('add-folder'))

    expect(screen.getByTestId('add-folder-popup')).toBeVisible();
})

test('closes "Add A Folder" Popup After Submitted', async () => {

    render(<GoogleDrive />);

    fireEvent.click(screen.getByTestId('add-folder'))

    const input = screen.getByTestId('add-folder-input')

    fireEvent.change(input, { target: { value: 'Folder 1' } })

    fireEvent.click(screen.getByTestId('add-folder-submit-btn'))

    await waitFor(() => {
        expect(screen.queryByTestId('add-folder-popup')).not.toBeInTheDocument()
    })
})

test('creates a folder onces Add Folder button in the popup clicked', async () => {

    render(<GoogleDrive />);

    fireEvent.click(screen.getByTestId('add-folder'))

    const input = screen.getByTestId('add-folder-input')

    fireEvent.change(input, { target: { value: 'Folder 1' } })

    fireEvent.click(screen.getByTestId('add-folder-submit-btn'))

    await waitFor(() => {
        expect(screen.getAllByTestId('folders')[0]).toHaveTextContent('Folder 1');
    })

})

