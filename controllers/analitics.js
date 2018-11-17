const Order = require('../models/order');
const moment = require('moment');
const errorHandler = require('../utils/errorHandler');


module.exports.overview = async (req, res) => {
    try {
        //Все заказы пользователя
        const allOrders = await Order.find({user: req.user.id}).sort({date: 1});

        //Заказы сгуппированые по дате
        const ordersMap = getOrdresMap(allOrders);
        // Заказы за вчера
        const yesterdayOrders = ordersMap[moment().add(-1, 'd').format('DD.MM.YYYY')] || [];
        //Кол-во заказов за вчера
        const yesterdayOrdersNumber = yesterdayOrders.length;
        //Общее кол-во заказов
        const totalOrdersNumber = allOrders.length;
        //Общее кол-во дней
        const daysNumber = Object.keys(ordersMap).length;
        //Среднее кол-во заказов в день
        const ordersPerDay = (totalOrdersNumber / daysNumber).toFixed(0);
        //Процент от кол-ва заказов
        const ordersPercent = (((yesterdayOrdersNumber / ordersPerDay) - 1) * 100).toFixed(2);
        //Сравнение заказов
        const compareOrderNumber = (yesterdayOrdersNumber - ordersPerDay).toFixed(2);

        //Общая выручка
        const totalGain = calculatePrice(allOrders);
        //Средняя выручка в день
        const gainPerDay = totalGain / daysNumber;
        //Выручка за вчера
        const yesterdayGain = calculatePrice(yesterdayOrders);
        //Процент выручки
        const gainPercent = (((yesterdayGain / gainPerDay) - 1) * 100).toFixed(2);
        //Сравнение выручки
        const compareGain = (yesterdayGain - gainPerDay).toFixed(2);

        res.status(200).json({
            gain: {
                percent: Math.abs(+gainPercent),
                compare: Math.abs(+compareGain),
                yesterday: +yesterdayGain,
                isHire: +gainPercent > 0
            },
            orders: {
                percent: Math.abs(+ordersPercent),
                compare: Math.abs(+compareOrderNumber),
                yesterday: +yesterdayOrdersNumber,
                isHire: +ordersPercent > 0
            }
        });

    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.analitics = async (req, res) => {
    try {
        const allOrders = await Order.find({user: req.user.id}).sort({date: 1});
        const ordersMap = getOrdresMap(allOrders);
        const average = +(calculatePrice(allOrders) / Object.keys(ordersMap).length).toFixed(2);

        const chart = Object.keys(ordersMap).map(label => {
            const gain = calculatePrice(ordersMap[label]);
            const order = ordersMap[label].length;

            return {
                label,
                gain,
                order
            }
        });


        return res.status(200).json({
            average,
            chart
        })

    } catch (e) {
        errorHandler(res, e);
    }
};

//Функция по группировке заказов по дате
function getOrdresMap(orders = []) {
    const daysOrders = {};

    orders.forEach(order =>{
        const date = moment(order.date).format('DD.MM.YYYY');

        if(date === moment().format('DD.MM.YYYY')) {
            return
        }

        if (!daysOrders[date]) {
            daysOrders[date] = [];
        }

        daysOrders[date].push(order);
    });

    return daysOrders;
}

//Функция по подсчету общей стоимости заказа
function calculatePrice(orders = []) {
    return orders.reduce((total, order) => {
        const orderPrice = order.list.reduce((totalOrder, item) => {
            return totalOrder += item.quantity * item.cost;
        }, 0);
        return total += orderPrice;
    }, 0);
}

