exports.dbModelToClassModel = (dbModel, classModel) => {
    const json = JSON.stringify(dbModel);
    const object = JSON.parse(json);
    return new classModel(object);
}