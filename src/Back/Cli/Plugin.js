// @ts-check

/**
 * @namespace App_Back_Cli_Plugin
 * @description Registers project-owned HTTP handlers during CLI startup.
 */

export default class Plugin {
    /**
     * @param {object} deps
     * @param {TeqFw_Web_Back_PipelineEngine} deps.pipeline
     * @param {App_Back_Web_Handler_NotFound} deps.handNotFound
     */
    constructor({pipeline, handNotFound}) {
        /** @returns {Promise<void>} */
        this.onStartup = async function () {
            pipeline.addHandler(handNotFound);
        };

        /** @returns {Promise<void>} */
        this.onShutdown = async function () {};
    }
}

export const __deps__ = Object.freeze({
    pipeline: 'TeqFw_Web_Back_PipelineEngine$',
    handNotFound: 'App_Back_Web_Handler_NotFound$',
});
