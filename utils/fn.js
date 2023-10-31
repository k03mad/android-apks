/**
 * @param {number} ms
 * @returns {Promise<void>}
 */
export const sleep = (ms = 3000) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * @param {Function} fn
 * @param {number} count
 */
export const retry = async (fn, count = 2) => {
    for (let i = 0; i <= count; i++) {
        try {
            return await fn();
        } catch (err) {
            if (i === count) {
                throw err;
            }

            await sleep();
        }
    }
};
