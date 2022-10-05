module.exports = oderAmount = async (items) => {
        const total = await items.products
        .map((obj) => obj.price * obj.quantity)
        .reduce((preValue, currentValue) => preValue + currentValue, 0);
        return total;
};
