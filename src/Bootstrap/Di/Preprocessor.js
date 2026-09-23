// @ts-check

/**
 * @namespace App_Bootstrap_Di_Preprocessor
 * @description Produces the host-owned DI replacement policy for CLI composition.
 */

const REPLACEMENTS = new Map([
    ['Fl32_Cms_Back_Api_Adapter', 'App_Back_Di_Replace_Adapter'],
    ['Fl32_Tmpl_Back_Api_Engine', 'Fl32_Cms_Back_Di_Replace_Tmpl_Engine'],
]);

/**
 * @returns {(depId: TeqFw_Di_Dto_DepId) => TeqFw_Di_Dto_DepId}
 */
export default function Preprocessor() {
    return function preprocessor(depId) {
        const replacement = REPLACEMENTS.get(depId.address);
        return replacement ? Object.freeze({...depId, address: replacement}) : depId;
    };
}
