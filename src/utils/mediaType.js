export const mediaType = (inputUrl) => {
    const images = ["jpg", "gif", "png","webp"]
    const videos = ["mp4", "3gp", "ogg"]
    const url = new URL(inputUrl)
    const extension = url.pathname.split(".")[1]

    if (images.includes(extension)) {
        return 'IMAGE';
    } else if (videos.includes(extension)) {
        return 'VIDEO';
    }
}