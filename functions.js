let dataOperations = []

function readLocalStorage(key) {
    const dataSave = JSON.parse(localStorage.getItem(key))
    return dataSave;
}

function saveLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}

function addOperation(newOperation) {
    dataOperations.push(newOperation)
    saveLocalStorage("operation", dataOperations)
}

// export default {
//     readLocalStorage,
//     saveLocalStorage,
//     addOperation
// }