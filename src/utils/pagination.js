exports.paginate = async (req, res, model, whereFields = {}, selectFields = {}, sortField = {}) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = ((page - 1) * limit);
    const endIndex = page * limit;
    let pagination = {}

    const datas = await model.findMany({
        where: whereFields,
        select: selectFields, // *Given by dev, not from query
        skip: startIndex,
        take: limit,
        orderBy: sortField,
    });

    const totalDatasCount = await model.count({
        where: whereFields,
    });

    if (endIndex < totalDatasCount) {
        pagination.next = {
            page: page + 1,
            limit: limit,
            url: setPaginateUrl(req, page + 1, limit),
        }
    }
    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit: limit,
            url: setPaginateUrl(req, page - 1, limit),
        }
    }

    res.pagination = pagination;

    return datas;

}

// TODO: Cannot send the where and sort fields in the url
const setPaginateUrl = (req, ...query) => {
    let originalUrl = req.protocol + '://' + req.get('host') + req.originalUrl.split('?').shift();
    originalUrl = originalUrl + `?page=${query[0]}&limit=${query[1]}`;
    return originalUrl;
}