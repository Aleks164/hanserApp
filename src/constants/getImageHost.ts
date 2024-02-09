export default function getHost(id: number) {
    if (id >= 0 && id <= 143) return "//basket-01.wb.ru";
    if (id >= 144 && id <= 287) return "//basket-02.wb.ru";
    if (id >= 288 && id <= 431) return "//basket-03.wb.ru";
    if (id >= 432 && id <= 719) return "//basket-04.wb.ru";
    if (id >= 720 && id <= 1007) return "//basket-05.wb.ru";
    if (id >= 1008 && id <= 1061) return "//basket-06.wb.ru";
    if (id >= 1062 && id <= 1115) return "//basket-07.wb.ru";
    if (id >= 1116 && id <= 1169) return "//basket-08.wb.ru";
    if (id >= 1170 && id <= 1313) return "//basket-09.wb.ru";
    if (id >= 1314 && id <= 1601) return "//basket-10.wb.ru";
    if (id >= 1602 && id <= 1655) return "//basket-11.wb.ru";
    if (id >= 1656 && id <= 1919) return "//basket-12.wb.ru";
    if (id >= 1920 && id <= 2045) return "//basket-13.wb.ru";
    return "//basket-14.wb.ru";
}