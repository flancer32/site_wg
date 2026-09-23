// @ts-check

/**
 * @namespace App_Bootstrap_Configurator
 * @description Configures host-owned dependency replacements before DI resolution.
 */
export default class Configurator {
    /**
     * @returns {{container: {preprocessors: string[]}}}
     */
    configure() {
        return {
            container: {
                preprocessors: ['App_Bootstrap_Di_Preprocessor$'],
            },
        };
    }
}
