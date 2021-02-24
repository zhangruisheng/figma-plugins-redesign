/** @jsx h */
import { Button, Checkbox, Columns, Container, SegmentedControl, spaceHorizontalIcon, spaceVerticalIcon, Text, TextboxNumeric, useForm, VerticalSpace } from '@create-figma-plugin/ui';
import { emit, evaluateNumericExpression, on } from '@create-figma-plugin/utilities';
import { Fragment, h } from 'preact';
import { useEffect } from 'preact/hooks';
import { groupDefinitions } from '../utilities/group-definitions';
import { Preview } from './preview/preview';
export function OrganizeLayers(props) {
    const { state, handleChange, handleSubmit, isValid } = useForm(props, {
        onClose: function () {
            emit('CLOSE_UI');
        },
        onSubmit: function ({ combineSingleLayerGroups, groupDefinition, horizontalSpace, verticalSpace }) {
            emit('SUBMIT', {
                combineSingleLayerGroups,
                groupDefinition,
                horizontalSpace: evaluateNumericExpression(horizontalSpace) || 0,
                verticalSpace: evaluateNumericExpression(verticalSpace) || 0
            });
        },
        validate: function ({ layers }) {
            return layers.length > 0;
        }
    });
    useEffect(function () {
        return on('SELECTION_CHANGED', function ({ layers, maximumGroupDefinition }) {
            handleChange({ layers, maximumGroupDefinition });
        });
    }, [handleChange]);
    const { combineSingleLayerGroups, groupDefinition, horizontalSpace, layers, maximumGroupDefinition, verticalSpace } = state;
    return (h(Fragment, null,
        h(Preview, { combineSingleLayerGroups: combineSingleLayerGroups, groupDefinition: groupDefinition, layers: layers }),
        h(Container, { space: "medium" },
            h(VerticalSpace, { space: "large" }),
            h(Text, { muted: true }, "\u6309\u6807\u9898\u5206\u7EC4"),
            h(VerticalSpace, { space: "small" }),
            h(SegmentedControl, { name: "groupDefinition", onChange: handleChange, options: groupDefinitions.slice(0, maximumGroupDefinition), value: Math.min(groupDefinition, maximumGroupDefinition) }),
            h(VerticalSpace, { space: "large" }),
            h(Text, { muted: true }, "\u95F4\u8DDD"),
            h(VerticalSpace, { space: "small" }),
            h(Columns, { space: "extraSmall" },
                h(TextboxNumeric, { icon: spaceHorizontalIcon, minimum: 0, name: "horizontalSpace", onChange: handleChange, value: horizontalSpace }),
                h(TextboxNumeric, { icon: spaceVerticalIcon, minimum: 0, name: "verticalSpace", onChange: handleChange, value: verticalSpace })),
            h(VerticalSpace, { space: "large" }),
            h(Checkbox, { name: "combineSingleLayerGroups", onChange: handleChange, value: combineSingleLayerGroups },
                h(Text, null, "\u5408\u5E76\u5355\u5C42\u7EC4")),
            h(VerticalSpace, { space: "large" }),
            h(Button, { disabled: isValid() === false, focused: true, fullWidth: true, onClick: handleSubmit }, "\u6267\u884C"),
            h(VerticalSpace, { space: "small" }))));
}
