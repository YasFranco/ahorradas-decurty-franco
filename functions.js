// let dataOperations = []

const getData = (key) => {
    const dataSave = JSON.parse(localStorage.getItem(key))
    return dataSave ? dataSave : [];
}

const saveData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
}

const addOperation = (newOperation) => {
    dataOperations.push(newOperation)
    saveData("operation", dataOperations)
}

const addCategory = (objNewCategory) => {
    const data = getData("category");
    saveData("category", [...data, objNewCategory]);
}

// export default {
//     getData,
//     saveData,
//     addOperation, 
//     addCategory
// }