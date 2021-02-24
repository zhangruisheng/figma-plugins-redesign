import { collapseLayer, updateNodesSortOrder } from '@create-figma-plugin/utilities';
import { arrangeGroups } from './arrange-groups';
import { groupLayers } from './group-layers';
export function organizeLayers(layers, combineSingleLayerGroups, groupDefinition, horizontalSpace, verticalSpace) {
    const groups = groupLayers(layers, combineSingleLayerGroups, groupDefinition);
    arrangeGroups(groups, horizontalSpace, verticalSpace);
    updateSortOrder(groups);
    collapseLayers(layers);
}
function updateSortOrder(groups) {
    const layers = [];
    for (const group of groups.slice().reverse()) {
        for (const layer of group.layers.slice().reverse()) {
            layers.push(layer);
        }
    }
    updateNodesSortOrder(layers);
}
function collapseLayers(layers) {
    for (const layer of layers) {
        collapseLayer(layer);
    }
}
