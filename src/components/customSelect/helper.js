export const fieldExtractor = (structure, field) => {
    let nextField = field;
    let fieldValue = structure;
    let skipped = 0;
    let lastPos = -1;

    while ((nextField = nextField.slice(0, (lastPos = (lastPos = (nextField || '').indexOf('.')) !== -1 ? lastPos : nextField.length))) !== '') {
        fieldValue = typeof fieldValue === 'object' && fieldValue !== null && fieldValue[nextField] !== undefined ? fieldValue[nextField] : null;

        skipped += lastPos + 1;
        nextField = field.slice(skipped);
    }

    return fieldValue;
};

export const getQueryParamsFromObject = (queryObject) => {
    let query = '?';

    for (let k in queryObject) {
        if (queryObject.hasOwnProperty(k) && ([undefined, null, ''].includes(queryObject[k]) === false)) {
            if (Array.isArray(queryObject[k])) {
                queryObject[k].forEach(i => {
                    query += `${k}[]=${i}&`
                })
            } else {
                query += `${k}=${queryObject[k]}&`;
            }
        }
    }

    return query.slice(0, -1);
};