#!/usr/bin/env node
'use strict';
/**
 * Entry point for the Demo CMS application.
 * Configures the DI container and launches the web server.
 */
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import 'dotenv/config';

import Container from '@teqfw/di';
import Replace from '@teqfw/di/src/Pre/Replace.js';

// Paths
const root = dirname(fileURLToPath(import.meta.url));
const node = join(root, 'node_modules');

// Create a DI container
const container = new Container();

/** Namespace resolver for locating modules. */
const resolver = container.getResolver();
resolver.addNamespaceRoot('MySite_Back_', join(root, 'src'));
resolver.addNamespaceRoot('Fl32_Cms_', join(node, '@flancer32', 'teq-cms', 'src'));
resolver.addNamespaceRoot('Fl32_Tmpl_', join(node, '@flancer32', 'teq-tmpl', 'src'));
resolver.addNamespaceRoot('Fl32_Web_', join(node, '@flancer32', 'teq-web', 'src'));

// Add interface replacements
/** Replaces CMS adapter interface with app-specific implementation. */
const replace = new Replace();
replace.add('Fl32_Cms_Back_Api_Adapter', 'MySite_Back_Di_Replace_Cms');
container.getPreProcessor().addChunk(replace);

// Launch app
/**
 * Application entry point object.
 * @type {MySite_Back_App}
 */
const app = await container.get('MySite_Back_App$');
await app.start({root});
