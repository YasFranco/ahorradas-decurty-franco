let dataOperations = []
let categories = [{
    id: crypto.randomUUID,
    nameCategory: "Trabajo",
},
{
    id: crypto.randomUUID,
    nameCategory: "Servicios"
}];


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

const deleteDataOp = (idData) => {
    const data = getData("operation");
    const newArrayOp = data.filter(operation => operation.id !== idData)

    saveData("operation", newArrayOp);

    return newArrayOp
}

const editData = (idCategory, newData) => {
    const data = getData("category");
    const findId = data.findIndex((category) => category.id == idCategory)

    data.splice(findId, 1, {...newData, id: idCategory})

    saveData("category", data)

    return data
}

const editDataOp = (idOp, newData) => {
    const data = getData("operation");
    const findId = data.findIndex((operation) => operation.id == idOp)

    data.splice(findId, 1, {...newData, id: idOp})

    saveData("operation", data)

    return data
}




const filterCategory = (category) => {
    const data = getData("operation");
    return data.filter(operation => operation.category === category)
}






