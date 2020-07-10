const ROLE = {
    ADMIN: "ADMIN",
    MERCHANT: "MERCHANT",
};

const MERCHANT_STATUS = {
    CONFIRMED: "CONFIRMED",
    PENDING: "PENDING",
    BANNED: "BANNED",
    DISABLED: "DISABLED",
};

const OPERATIONS_STATE = {
    CREATED: "CREATED",
    PROCESSING: "PROCESSING",
    DONE: "DONE",
};

const OPERATIONS_TYPE = {
    CAPTURE: "CAPTURE",
    REFUNDED: "REFUNDED",
};

const DEVISE_MAPPING = {
    DOLLAR: "Dollar américain",
    EURO: "Euro",
    YEN: "Yen",
    STERLING: "Livre Sterling",
};

const DEVISE = {
    DOLLAR: "DOLLAR",
    EURO: "EURO",
    YEN: "YEN",
    STERLING: "STERLING",
};

export {
    ROLE,
    DEVISE_MAPPING,
    DEVISE,
    MERCHANT_STATUS,
    OPERATIONS_TYPE,
    OPERATIONS_STATE,
};
