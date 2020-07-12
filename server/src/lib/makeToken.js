export default function (length, isUrl) {
    let result = "";

    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersDefault = `${characters}*-+$*!,?^}{|<=>`;

    const characters_to_use = isUrl ? characters : charactersDefault;

    const charactersLength = characters_to_use.length;
    for (var i = 0; i < length; i++) {
        result += characters_to_use.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}
