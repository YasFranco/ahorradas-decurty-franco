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

const deleteData = (idData) => {
    const data = getData("category");
    const newArray = data.filter(category => category.id !== idData)

    saveData("category", newArray);

    return newArray
}

// export default {
//     getData,
//     saveData,
//     addOperation, 
//     addCategory
// }



