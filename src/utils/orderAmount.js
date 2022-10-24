/*
Es una función encargada de indicar cuánto es el monto total a pagar, 
multiplicando precio por cantidad de cada producto
*/
module.exports = oderAmount = async (items) => {
        const total = items.products
        .map((obj) => obj.price * obj.quantity)
        .reduce((preValue, currentValue) => preValue + currentValue, 0);
        return await total;
};
