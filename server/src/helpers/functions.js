const toCamelCase = (str) => {
    return str
        .replace(/\s(.)/g, function ($1) {
            return $1.toUpperCase();
        })
        .replace(/\s/g, "")
        .replace(/^(.)/, function ($1) {
            return $1.toLowerCase();
        });
};

const getFileType = (string) => {
    if (string.search("image/jpg")) return "jpg";
    if (string.search("image/jpeg")) return "jpeg";
    if (string.search("image/gif")) return "gif";
    if (string.search("image/png")) return "png";
    if (string.search("application/pdf")) return "pdf";

    return "";
};

const calculNewOrderAmount = (products) =>
    products.reduce(
        (acc, curr) => acc + parseFloat(curr.product.price) * Number(curr.qte),
        0
    );

module.exports = {
    toCamelCase,
    getFileType,
    calculNewOrderAmount,
};
4;
