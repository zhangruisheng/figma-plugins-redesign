/** @jsx h */
import { Preview as PreviewContainer } from '@create-figma-plugin/ui';
import { h } from 'preact';
import { groupLayers } from '../../utilities/group-layers';
import style from './preview.scss';
export function Preview(props) {
    const { combineSingleLayerGroups, groupDefinition, layers } = props;
    if (layers.length === 0) {
        return (h(PreviewContainer, null,
            h("div", { className: style.empty }, "No layers on page")));
    }
    const groups = groupLayers(layers, combineSingleLayerGroups, groupDefinition);
    return (h(PreviewContainer, null,
        h("div", { className: style.preview }, groups.map(function ({ groupName, layers }, index) {
            return (h("div", { key: index, className: style.group }, layers.map(function ({ name }, index) {
                if (groupName === null || layers.length === 1) {
                    return h("div", { key: index }, name);
                }
                return (h("div", { key: index },
                    h("strong", { className: style.groupName }, groupName),
                    name.substring(groupName.length)));
            })));
        }))));
}
