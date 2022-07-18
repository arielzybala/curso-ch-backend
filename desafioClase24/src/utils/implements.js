module.exports.asPOJO = obj => JSON.parse(JSON.stringify(obj))

module.exports.renameField = (record, from, to) => {
    record[to] = record[from]
    delete record[from]
    return record
}
module.exports.removeField = (record, field) => {
    const value = record[field]
    delete record[field]
    return value
}
