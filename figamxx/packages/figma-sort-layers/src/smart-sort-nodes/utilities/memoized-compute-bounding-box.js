import { computeBoundingBox } from '@create-figma-plugin/utilities';
import mem from 'mem';
const memoized = mem(function (_, node) {
    return computeBoundingBox(node);
});
export function memoizedComputeBoundingBox(node) {
    return memoized(node.id, node);
}
