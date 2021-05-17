exports.fromJsonToClass = (json, model) => {
    return Object.assign(new model(), json);
}

exports.fromClassToJson = (model) => {
    return JSON.stringify(model);
}