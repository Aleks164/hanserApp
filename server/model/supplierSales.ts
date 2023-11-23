import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
    /**
     * Номер заказа. Объединяет все позиции одного заказа.
     * @type {String}
     * @memberof SalesItem
     */
    gNumber: String,
    /**
     * Дата и время продажи. Это поле соответствует параметру `dateFrom` в запросе, если параметр `flag=1`. Если часовой пояс не указан, то берется Московское время UTC+3.
     * @type {Date}
     * @memberof SalesItem
     */
    date: Date,
    /**
     * Дата и время обновления информации в сервисе. Это поле соответствует параметру `dateFrom` в запросе, если параметр `flag=0` или не указан. Если часовой пояс не указан, то берется Московское время UTC+3.
     * @type {Date}
     * @memberof SalesItem
     */
    lastChangeDate: Date,
    /**
     * Артикул продавца
     * @type {String}
     * @memberof SalesItem
     */
    supplierArticle: String,
    /**
     * Размер товара (пример S, M, L, XL, 42, 42-43)
     * @type {String}
     * @memberof SalesItem
     */
    techSize: String,
    /**
     * Бар-код
     * @type {String}
     * @memberof SalesItem
     */
    barcode: String,
    /**
     * Цена до согласованной скидки/промо/спп. Для получения цены со скидкой можно воспользоваться формулой `priceWithDiscount = totalPrice * (1 - discountPercent/100)`
     * @type {Number}
     * @memberof SalesItem
     */
    totalPrice: Number,
    /**
     * Согласованный итоговый дисконт
     * @type {Number}
     * @memberof SalesItem
     */
    discountPercent: Number,
    /**
     * Договор поставки
     * @type {Boolean}
     * @memberof SalesItem
     */
    isSupply: Boolean,
    /**
     * Договор реализации
     * @type {Boolean}
     * @memberof SalesItem
     */
    isRealization: Boolean,
    /**
     * Скидка по промокоду
     * @type {Number}
     * @memberof SalesItem
     */
    promoCodeDiscount: Number,
    /**
     * Название склада отгрузки
     * @type {String}
     * @memberof SalesItem
     */
    warehouseName: String,
    /**
     * Страна
     * @type {String}
     * @memberof SalesItem
     */
    countryName: String,
    /**
     * Округ
     * @type {String}
     * @memberof SalesItem
     */
    oblastOkrugName: String,
    /**
     * Регион
     * @type {String}
     * @memberof SalesItem
     */
    regionName: String,
    /**
     * Номер поставки (от продавца на склад)
     * @type {Number}
     * @memberof SalesItem
     */
    incomeID: Number,
    /**
     * Уникальный идентификатор продажи/возврата. <ul>  <li> `SXXXXXXXXXX` — продажа  <li> `RXXXXXXXXXX` — возврат  <li> `DXXXXXXXXXXX` — доплата <li> `AXXXXXXXXX` – сторно продаж (все значения полей как у продажи, но поля с суммами и кол-вом с минусом как в возврате) <li> `BXXXXXXXXX` - сторно возврата (все значения полей как у возврата, но поля с суммами и кол-вом с плюсом, в противоположность возврату) </ul> 
     * @type {String}
     * @memberof SalesItem
     */
    saleID: String,
    /**
     * Уникальный идентификатор позиции заказа. Может использоваться для поиска соответствия между заказами и продажами.
     * @type {Number}
     * @memberof SalesItem
     */
    odid: Number,
    /**
     * Согласованная скидка постоянного покупателя
     * @type {Number}
     * @memberof SalesItem
     */
    spp: Number,
    /**
     * К перечислению продавцку
     * @type {Number}
     * @memberof SalesItem
     */
    forPay: Number,
    /**
     * Фактическая цена заказа с учетом всех скидок
     * @type {Number}
     * @memberof SalesItem
     */
    finishedPrice: Number,
    /**
     * Цена, от которой считается вознаграждение продавца `forpay` (с учетом всех согласованных скидок)
     * @type {Number}
     * @memberof SalesItem
     */
    priceWithDisc: Number,
    /**
     * Артикул WB
     * @type {Number}
     * @memberof SalesItem
     */
    nmId: Number,
    /**
     * Предмет
     * @type {String}
     * @memberof SalesItem
     */
    subject: String,
    /**
     * Категория
     * @type {String}
     * @memberof SalesItem
     */
    category: String,
    /**
     * Бренд
     * @type {String}
     * @memberof SalesItem
     */
    brand: String,
    /**
     * Для сторно-операций `1`, для остальных `0`
     * @type {Number}
     * @memberof SalesItem
     */
    isStorno: Number,
    /**
     * Цифровое значение стикера, который клеится на товар в процессе сборки заказа по системе Маркетплейс.
     * @type {String}
     * @memberof SalesItem
     */
    sticker: String
});

const SupplierSales = mongoose.model("SupplierSales", saleSchema);

export default SupplierSales;