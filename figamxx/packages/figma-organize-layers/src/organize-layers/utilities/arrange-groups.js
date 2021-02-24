export function arrangeGroups(groups, horizontalSpace, verticalSpace) {
    let y = 0;
    for (const group of groups) {
        let x = 0;
        let maxHeigh = 0;
        for (const { id } of group.layers) {
            const layer = figma.getNodeById(id);
            layer.x = x;
            layer.y = y;
            x = layer.x + layer.width + verticalSpace;
            maxHeigh = Math.max(maxHeigh, layer.height);
        }
        y += maxHeigh + horizontalSpace;
    }
}
