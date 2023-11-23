import mongoose from "mongoose";

const supplierOrdersSchema = new mongoose.Schema({
    lastChangeDate: Date,
    /**
     * Артикул продавца
     * @type {String}
     * @memberof StocksItem
     */
    supplierArticle: String,
    /**
     * Размер товара (пример S, M, L, XL, 42, 42-43)
     * @type {String}
     * @memberof StocksItem
     */
    techSize: String,
    /**
     * Бар-код
     * @type {String}
     * @memberof StocksItem
     */
    barcode: String,
    /**
     * Количество, доступное для продажи (сколько можно добавить в корзину)
     * @type {Number}
     * @memberof StocksItem
     */
    quantity: Number,
    /**
     * Договор поставки
     * @type {Boolean}
     * @memberof StocksItem
     */
    isSupply: Boolean,
    /**
     * Договор реализации
     * @type {Boolean}
     * @memberof StocksItem
     */
    isRealization: Boolean,
    /**
     * Полное (непроданное) количество, которое числится за складом (= `quantity` + в пути)
     * @type {Number}
     * @memberof StocksItem
     */
    quantityFull: Number,
    /**
     * Название склада
     * @type {String}
     * @memberof StocksItem
     */
    warehouseName: String,
    /**
     * Артикул WB
     * @type {Number}
     * @memberof StocksItem
     */
    nmId: Number,
    /**
     * Предмет
     * @type {String}
     * @memberof StocksItem
     */
    subject: String,
    /**
     * Категория
     * @type {String}
     * @memberof StocksItem
     */
    category: String,
    /**
     * Количество дней на сайте
     * @type {Number}
     * @memberof StocksItem
     */
    daysOnSite: Number,
    /**
     * Бренд
     * @type {String}
     * @memberof StocksItem
     */
    brand: String,
    /**
     * Код контракта
     * @type {String}
     * @memberof StocksItem
     */
    sCCode: String,
    /**
     * Цена
     * @type {Number}
     * @memberof StocksItem
     */
    price: Number,
    /**
     * Скидка
     * @type {Number}
     * @memberof StocksItem
     */
    discount: Number,
    inWayFromClient: Number,
    Price: Number,
    Discount: Number,
    SCCode: String,
});

const SupplierStocks = mongoose.model("SupplierStocks", supplierOrdersSchema);

export default SupplierStocks;
