var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { emit, extractAttributes, formatErrorMessage, formatSuccessMessage, loadSettingsAsync, once, pluralize, saveSettingsAsync, setRelaunchButton, showUI } from '@create-figma-plugin/utilities';
import { defaultSettings } from '../utilities/default-settings';
import { computeMaximumGroupDefinition } from './utilities/compute-maximum-group-definition';
import { organizeLayers } from './utilities/organize-layers';
export default function () {
    return __awaiter(this, void 0, void 0, function* () {
        const layers = getLayers();
        if (layers.length === 0) {
            figma.closePlugin(formatErrorMessage('No layers on page'));
            return;
        }
        const settings = yield loadSettingsAsync(defaultSettings);
        figma.on('selectionchange', function () {
            const layers = getLayers();
            emit('SELECTION_CHANGED', {
                layers,
                maximumGroupDefinition: computeMaximumGroupDefinition(layers)
            });
        });
        once('SUBMIT', function (settings) {
            return __awaiter(this, void 0, void 0, function* () {
                yield saveSettingsAsync(settings);
                const { combineSingleLayerGroups, groupDefinition, horizontalSpace, verticalSpace } = settings;
                const layers = figma.currentPage.children.slice();
                organizeLayers(layers, combineSingleLayerGroups, groupDefinition, horizontalSpace, verticalSpace);
                figma.viewport.scrollAndZoomIntoView(layers);
                setRelaunchButton(figma.currentPage, 'organizeLayers');
                figma.closePlugin(formatSuccessMessage(`Organized ${layers.length} ${pluralize(layers.length, 'layer')} on page`));
            });
        });
        once('CLOSE_UI', function () {
            figma.closePlugin();
        });
        showUI({ height: 361, width: 240 }, Object.assign(Object.assign({}, settings), { layers, maximumGroupDefinition: computeMaximumGroupDefinition(layers) }));
    });
}
function getLayers() {
    return extractAttributes(figma.currentPage.children.slice(), [
        'id',
        'name'
    ]);
}
