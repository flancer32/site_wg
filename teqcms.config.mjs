import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));

/**
 * 
 * @param {*} params 
 */
export default async function configure({ resolver, replace }) {
    resolver.addNamespaceRoot('App_', resolve(ROOT, 'src'));
    replace.add('Fl32_Cms_Back_Api_Adapter', 'App_Back_Di_Replace_Adapter');
}
