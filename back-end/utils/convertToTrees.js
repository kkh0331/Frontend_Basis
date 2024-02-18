function convertToTrees(array, idFieldName, parentIdFieldName, childrenFieldName){
    const cloned = [...array];
    
    for(let i=cloned.length-1; i>-1; i--){
        const parentId = cloned[i][parentIdFieldName];
        if(parentId){
            cloned.forEach(elem => {
                if(elem[idFieldName].toString() === parentId.toString()){
                    if(elem[childrenFieldName]){
                        elem[childrenFieldName].unshift(cloned[i]);
                    } else {
                        elem[childrenFieldName] = [cloned[i]]
                    }
                    cloned.splice(i, 1);
                }
            })
        }
    }
    return cloned;
}

module.exports = {convertToTrees};