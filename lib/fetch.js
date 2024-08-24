export const getSongsByQuery = async (e) => {
    try {
        return await fetch('https://saavn.dev/api/search?query=' + e);
    }
    catch (e) {
        console.log(e);
    }
};

export const getSongsById = async (e) => {
    try {
        return await fetch('https://api-jiosaavn.vercel.app/song/get/?id=' + e);
    }
    catch (e) {
        console.log(e);
    }
};

export const getSongsSuggestions = async (e) => {
    try {
        return await fetch(`https://saavn.dev/api/songs/${e}/suggestions`);
    }
    catch (e) {
        console.log(e);
    }
};

export const getAlbumById = async (e) => {
    try {
        return await fetch(`https://saavn.dev/api/albums?id=` + e);
    }
    catch (e) {
        console.log(e);
    }
};