// @ts-check

/**
 * @namespace App_Bootstrap_Configurator
 * @description Configures host-owned dependency replacements before DI resolution.
 */
export default class Configurator {
    /**
     * @returns {{preprocessors: Array<(depId: object) => object>}}
     */
    configure() {
        return {preprocessors: [createReplacePreprocessor()]};
    }
}

/**
 * @returns {(depId: {moduleName: string}) => {moduleName: string}}
 */
function createReplacePreprocessor() {
    const replacements = new Map([
        ['Fl32_Cms_Back_Api_Adapter', 'App_Back_Di_Replace_Adapter'],
        ['Fl32_Tmpl_Back_Api_Engine', 'Fl32_Cms_Back_Di_Replace_Tmpl_Engine'],
    ]);
    return (depId) => {
        const replacement = replacements.get(depId.moduleName);
        return replacement ? Object.freeze({...depId, moduleName: replacement}) : depId;
    };
}
