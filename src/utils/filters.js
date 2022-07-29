export const getFolders=(folders,folderId)=> {
    return folders.filter(folder => folder.parentId == folderId)
}

export const getFiles=(files,folderId)=> {
    return files.filter(file => file.folderId == folderId)
}

export const getFolder=(folders,folderId)=> {
    return folders.find(folder => folder.id == folderId)
}

export const getPath=(paths,folderId)=> {
    let results=paths.find(path => path.folderId == folderId)
    return results?results.path:null;
}