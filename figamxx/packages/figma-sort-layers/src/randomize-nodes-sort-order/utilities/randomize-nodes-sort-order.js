import { compareArrays } from '@create-figma-plugin/utilities';
const arrayShuffle = require('array-shuffle');
export function randomizeNodesSortOrder(nodes) {
    let result;
    do {
        result = arrayShuffle(nodes);
    } while (compareArrays(result, nodes) === true);
    return result;
}
