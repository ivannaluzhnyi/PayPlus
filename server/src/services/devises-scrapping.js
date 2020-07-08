const Scrapper = require("../lib/Scrapper");
const Devises = require("../models/mongo/Devises");
// const url = 'https://www.boursorama.com/bourse/devises'
const url = "https://www.capital.fr/bourse/devises/cours-devises";

const requestOptions = {};

console.log("EXECUTION OF FILE ==============================================");

const scrap = Scrapper(
    url,
    requestOptions,
    ($) => {
        let results = [];
        $(".currencylist ol > li").each(function (index, element) {
            results.push({
                name: $(".currencylist-item-wrapper > a", [element]).text(),
                country: $(".currencylist-item-wrapper > span", element).text(),
                rate: $("strong", [element])[0].childNodes[0].nodeValue.trim(),
                currency_symbol: $("strong > span", [element]).text(),
            });
        });
        return results;
    },
    (data) => {
        data.forEach((devises) => {
            Devises.create(devises, {
                upsert: true,
                new: true,
                runValidators: true,
            })
                .then((data) => console.log("saved devise => ", data))
                .catch((err) => console.log("DEVISE ERR => ", err));
        });
    }
);
scrap.end();
