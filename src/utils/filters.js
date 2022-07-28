export const getFolders=(folders,id)=> {
    return folders.filter(folder => folder.parentId == id)
}