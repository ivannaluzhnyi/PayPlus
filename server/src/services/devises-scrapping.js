const Scrapper = require("../lib/Scrapper");
const Devises = require("../models/mongo/Devises");
// const url = 'https://www.boursorama.com/bourse/devises'
const url = "https://www.capital.fr/bourse/devises/cours-devises";

function run() {
    const requestOptions = {};
    const scrap = Scrapper(
        url,
        requestOptions,
        ($) => {
            let results = [];
            $(".currencylist ol > li").each(function (index, element) {
                results.push({
                    name: $(".currencylist-item-wrapper > a", [element]).text(),
                    country: $(
                        ".currencylist-item-wrapper > span",
                        element
                    ).text(),
                    rate: $("strong", [
                        element,
                    ])[0].childNodes[0].nodeValue.trim(),
                    currency_symbol: $("strong > span", [element]).text(),
                });
            });

            return results;
        },
        (devises) => {
            devises.forEach((devise) => {
                Devises.create(devise).then((data) =>
                    console.log("created => ", data)
                );
            });
        }
    );
    scrap.end();
}

export { run };
