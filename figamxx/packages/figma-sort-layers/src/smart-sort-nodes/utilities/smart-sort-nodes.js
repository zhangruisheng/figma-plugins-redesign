import { smartSortChildNodes } from './smart-sort-child-nodes';
export function smartSortNodes(nodes) {
    const parent = nodes[0].parent;
    if (parent === null) {
        throw new Error('Node has no parent');
    }
    if ('layoutMode' in parent &&
        (parent.layoutMode === 'HORIZONTAL' || parent.layoutMode === 'VERTICAL')) {
        return null;
    }
    const ids = nodes.map(function ({ id }) {
        return id;
    });
    return smartSortChildNodes(parent, ids);
}
