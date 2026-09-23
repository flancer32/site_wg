// @ts-check

/**
 * @namespace App_Back_Cli_Plugin
 * @description Registers project-owned HTTP handlers during CLI startup.
 */

export default class Plugin {
    /**
     * @param {object} deps
     * @param {TeqFw_Web_Back_PipelineEngine} deps.pipeline
     * @param {App_Back_Web_Cms_Handler_Redirect} deps.handRedirect
     * @param {App_Back_Web_Handler_Markdown} deps.handMarkdown
     * @param {App_Back_Web_Handler_NotFound} deps.handNotFound
     */
    constructor({pipeline, handRedirect, handMarkdown, handNotFound}) {
        /** @returns {Promise<void>} */
        this.onStartup = async function () {
            pipeline.addHandler(handRedirect);
            pipeline.addHandler(handMarkdown);
            pipeline.addHandler(handNotFound);
        };

        /** @returns {Promise<void>} */
        this.onShutdown = async function () {};
    }
}

export const __deps__ = Object.freeze({
    pipeline: 'TeqFw_Web_Back_PipelineEngine$',
    handRedirect: 'App_Back_Web_Cms_Handler_Redirect$',
    handMarkdown: 'App_Back_Web_Handler_Markdown$',
    handNotFound: 'App_Back_Web_Handler_NotFound$',
});
