
function readLocalStorage(key) {
    const dataSave = JSON.parse(localStorage.getItem(key))
    return dataSave;
}

function saveLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}

export default {
    readLocalStorage,
    saveLocalStorage
}