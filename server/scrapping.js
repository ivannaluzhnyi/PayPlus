const Scrapper = require('./lib/Scrapper');
const Devises = require('./models/Devises')
// const url = 'https://www.boursorama.com/bourse/devises'
const url = 'https://www.capital.fr/bourse/devises/cours-devises'

const requestOptions = {};

const scrap = Scrapper(
    url,
    requestOptions,
    $ => {
        let results = [];
        $(".currencylist ol > li  strong")
            .each(function (index, element) {
                results.push({
                    name: $(element).text(),
                    // name: $(element).text(),
                    // country: $(element > 'span').text(),
                    // rate: $(element > 'strong').text(),
                    // currency_symbol: $(element > 'strong' > 'span').text(),
                });
            });
            console.log(results)
        return results
    },
    // data => {
    //     data.forEach(devises => {
    //         Devises.findOneAndUpdate({ name: devises.name }, devises, {
    //             upsert: true,
    //             new: true,
    //             runValidators: true
    //         }).then(data => console.log(data));
    //     });
    // }
);
scrap.end();