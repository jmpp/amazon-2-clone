const LOCALSTORAGE_KEY_PREFIX = "amazon-clone-ninja";

export default {
    get(item) {
        try {
            return window.localStorage.getItem(
                `${LOCALSTORAGE_KEY_PREFIX}:${item}`
            );
        } catch (e) {
            return null;
        }
    },
    set(item, value) {
        try {
            window.localStorage.setItem(
                `${LOCALSTORAGE_KEY_PREFIX}:${item}`,
                value
            );
        } catch (e) {}
    },
};
