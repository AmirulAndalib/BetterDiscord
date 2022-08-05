import Logger from "common/logger";
import WebpackModules, {Filters} from "../webpackmodules";

/**
 * `Webpack` is a utility class for getting internal webpack modules. Instance is accessible through the {@link BdApi}.
 * This is extremely useful for interacting with the internals of Discord.
 * @type Webpack
 * @summary {@link Webpack} is a utility class for getting internal webpack modules.
 * @memberof BdApi
 * @name Webpack
 */
const Webpack = {

    /**
     * Series of {@link Filters} to be used for finding webpack modules.
     * @type Filters
     * @memberof Webpack
     */
    Filters: {
        /**
         * Generates a function that filters by a set of properties.
         * @param {...string} props List of property names
         * @returns {function} A filter that checks for a set of properties
         */
        byProps(...props) {return Filters.byProps(props);},

        /**
         * Generates a function that filters by a set of properties on the object's prototype.
         * @param {...string} props List of property names
         * @returns {function} A filter that checks for a set of properties on the object's prototype.
         */
        byPrototypeFields(...props) {return Filters.byPrototypeFields(props);},

        /**
         * Generates a function that filters by a regex.
         * @param {RegExp} search A RegExp to check on the module
         * @param {function} filter Additional filter
         * @returns {function} A filter that checks for a regex match
         */
        byRegex(regex) {return Filters.byRegex(regex);},

        /**
         * Generates a function that filters by strings.
         * @param {...String} strings A list of strings
         * @returns {function} A filter that checks for a set of strings
         */
        byStrings(...strings) {return Filters.byStrings(strings);},

        /**
         * Generates a function that filters by a set of properties.
         * @param {string} name Name the module should have
         * @returns {function} A filter that checks for a set of properties
         */
        byDisplayName(name) {return Filters.byDisplayName(name);},

        /**
         * Generates a combined function from a list of filters.
         * @param {...function} filters A list of filters
         * @returns {function} Combinatory filter of all arguments
         */
        combine(...filters) {return Filters.combine(filters);},
    },

    /**
     * Finds a module using a filter function.
     * @memberof Webpack
     * @param {function} filter A function to use to filter modules. It is given exports, module, and moduleID. Return true to signify match.
     * @param {object} [options] Whether to return only the first matching module
     * @param {Boolean} [options.first=true] Whether to return only the first matching module
     * @param {Boolean} [options.defaultExport=true] Whether to return default export when matching the default export
     * @return {any}
     */
    getModule(filter, options = {}) {
        if (("first" in options) && typeof(options.first) !== "boolean") return Logger.error("BdApi.Webpack~getModule", "Unsupported type used for options.first", options.first, "boolean expected.");
        if (("defaultExport" in options) && typeof(options.defaultExport) !== "boolean") return Logger.error("BdApi.Webpack~getModule", "Unsupported type used for options.defaultExport", options.defaultExport, "boolean expected.");
        return WebpackModules.getModule(filter, options);
    },

    /**
     * Finds multiple modules using multiple filters.
     * @memberof Webpack
     * @param {...object} queries Whether to return only the first matching module
     * @param {Function} queries.filter A function to use to filter modules
     * @param {Boolean} [queries.first=true] Whether to return only the first matching module
     * @param {Boolean} [queries.defaultExport=true] Whether to return default export when matching the default export
     * @return {any}
     */
    getBulk(...queries) {return WebpackModules.getBulk(...queries);},

    /**
     * Finds a module that lazily loaded.
     * @memberof Webpack
     * @param {function} filter A function to use to filter modules. It is given exports. Return true to signify match.
     * @param {object} [options] Whether to return only the first matching module
     * @param {AbortSignal} [options.signal] AbortSignal of an AbortController to cancel the promise
     * @param {Boolean} [options.defaultExport=true] Whether to return default export when matching the default export
     * @returns {Promise<any>}
     */
    waitForModule(filter, options = {}) {
        if (("defaultExport" in options) && typeof(options.defaultExport) !== "boolean") return Logger.error("BdApi.Webpack~waitForModule", "Unsupported type used for options.defaultExport", options.defaultExport, "boolean expected.");
        if (("signal" in options) && !(options.signal instanceof AbortSignal)) return Logger.error("BdApi.Webpack~waitForModule", "Unsupported type used for options.signal", options.signal, "AbortSignal expected.");
        return WebpackModules.getLazy(filter, options);
    },
};

export default Webpack;