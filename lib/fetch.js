export const getSongsByQuery = async (e) => {
    try {
        return await fetch('https://api-jiosaavn.vercel.app/song/?query=' + e);
    }
    catch (e) {
        console.log(e);
    }
}

export const getSongsById = async (e) => {
    try {
        return await fetch('https://api-jiosaavn.vercel.app/song/get/?id=' + e);
    }
    catch (e) {
        console.log(e);
    }
}

export const getSongsLyricsById = async (e) => {
    try {
        return await fetch('https://api-jiosaavn.vercel.app/lyrics?query=' + e);
    }
    catch (e) {
        console.log(e);
    }
}