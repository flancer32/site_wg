// @ts-check

/**
 * @namespace App_Back_Di_Replace_PublicationPolicy
 * @description Leaves site-specific publication routing with the host handlers.
 */
export default class PublicationPolicy {
    /**
     * @param {object} deps
     * @param {Fl32_Cms_Back_Config} deps.config
     */
    constructor({config}) {
        void config;
        /** @returns {Fl32_Cms_Back_Publication_Policy_Mode} */
        this.getMode = () => 'families';
        /** @returns {Array<string>} */
        this.getStaticPrefixes = () => ['/assets/'];
        /** @returns {string} */
        this.getPresentationName = () => 'publication.html';
    }
}

export const __deps__ = Object.freeze({config: 'Fl32_Cms_Back_Config$'});
