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
    CANCELED: "CANCELED",
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

const MERCURE_TOPICS = {
    STATS: {
        BY_MERCHANT: "/stats/by-merchant",
        DASHBOARD: "/stats/dashboard",
        DASHBOARD_COUNT_MERCHANT: "/stats/dashboard-count-merchant",
    },
    NOTIFICATIONS: {
        PENDING_MERCHANT: "/notifications/panding-merchant",
    },
};

export {
    ROLE,
    DEVISE_MAPPING,
    MERCURE_TOPICS,
    DEVISE,
    MERCHANT_STATUS,
    OPERATIONS_TYPE,
    OPERATIONS_STATE,
};
