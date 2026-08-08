// @ts-check

/**
 * @namespace App_Back_Cli_Plugin
 * @description Registers project-owned HTTP handlers during CLI startup.
 */

export default class Plugin {
    /**
     * @param {object} deps
     * @param {Fl32_Web_Back_PipelineEngine} deps.pipeline
     * @param {App_Back_Web_Handler_SendEmail} deps.handEmail
     * @param {App_Back_Web_Handler_NotFound} deps.handNotFound
     */
    constructor({pipeline, handEmail, handNotFound}) {
        /** @returns {Promise<void>} */
        this.onStartup = async function () {
            pipeline.addHandler(handEmail);
            pipeline.addHandler(handNotFound);
        };

        /** @returns {Promise<void>} */
        this.onShutdown = async function () {};
    }
}

export const __deps__ = Object.freeze({
    pipeline: 'Fl32_Web_Back_PipelineEngine$',
    handEmail: 'App_Back_Web_Handler_SendEmail$',
    handNotFound: 'App_Back_Web_Handler_NotFound$',
});
