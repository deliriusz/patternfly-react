"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEdgesFromNodes = exports.getSpacerNodes = exports.getWhenStatusModifier = exports.getRunStatusModifier = exports.nonShadowModifiers = void 0;
const tslib_1 = require("tslib");
const topology_pipelines_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Topology/topology-pipelines"));
const types_1 = require("../types");
const const_1 = require("../const");
exports.nonShadowModifiers = [
    topology_pipelines_1.default.modifiers.danger,
    topology_pipelines_1.default.modifiers.warning,
    topology_pipelines_1.default.modifiers.success,
    topology_pipelines_1.default.modifiers.skipped,
    topology_pipelines_1.default.modifiers.inProgress
];
const getRunStatusModifier = (status) => {
    switch (status) {
        case types_1.RunStatus.Failed:
        case types_1.RunStatus.FailedToStart:
            return topology_pipelines_1.default.modifiers.danger;
        case types_1.RunStatus.Succeeded:
            return topology_pipelines_1.default.modifiers.success;
        case types_1.RunStatus.Cancelled:
            return topology_pipelines_1.default.modifiers.warning;
        case types_1.RunStatus.Skipped:
            return topology_pipelines_1.default.modifiers.skipped;
        case types_1.RunStatus.Running:
            return topology_pipelines_1.default.modifiers.running;
        case types_1.RunStatus.InProgress:
            return topology_pipelines_1.default.modifiers.inProgress;
        case types_1.RunStatus.Pending:
            return topology_pipelines_1.default.modifiers.pending;
        case types_1.RunStatus.Idle:
            return topology_pipelines_1.default.modifiers.idle;
        default:
            return '';
    }
};
exports.getRunStatusModifier = getRunStatusModifier;
const getWhenStatusModifier = (status) => {
    switch (status) {
        case types_1.WhenStatus.Met:
            return topology_pipelines_1.default.modifiers.success;
        case types_1.WhenStatus.Unmet:
            return topology_pipelines_1.default.modifiers.unmet;
        case types_1.WhenStatus.InProgress:
        case types_1.WhenStatus.Pending:
            return topology_pipelines_1.default.modifiers.inProgress;
        default:
            return '';
    }
};
exports.getWhenStatusModifier = getWhenStatusModifier;
const getSpacerId = (ids) => [...ids]
    .sort((a, b) => a.localeCompare(b))
    .reduce((acc, ref) => {
    if (acc) {
        return `${acc}|${ref}`;
    }
    return ref;
}, '');
const getSpacerNodes = (nodes, spacerNodeType = const_1.DEFAULT_SPACER_NODE_TYPE, finallyNodeTypes = [const_1.DEFAULT_FINALLY_NODE_TYPE]) => {
    const finallyNodes = nodes.filter(n => finallyNodeTypes.includes(n.type));
    // Collect only multiple run-afters
    const multipleRunBeforeMap = nodes.reduce((acc, node) => {
        const { runAfterTasks } = node;
        if (runAfterTasks && runAfterTasks.length > 1) {
            const id = getSpacerId(runAfterTasks);
            if (!Array.isArray(acc[id])) {
                acc[id] = [];
            }
            acc[id].push(node);
        }
        return acc;
    }, {});
    // Trim out single occurrences
    const multiParallelToParallelList = Object.keys(multipleRunBeforeMap).reduce((acc, key) => {
        if (multipleRunBeforeMap[key].length > 1) {
            acc[key] = multipleRunBeforeMap[key];
        }
        return acc;
    }, {});
    const spacerNodes = [];
    // Insert a spacer node between the multiple nodes on the sides of a parallel-to-parallel
    Object.keys(multiParallelToParallelList).forEach(key => {
        spacerNodes.push({
            id: key,
            type: spacerNodeType
        });
    });
    if (finallyNodes.length > 1) {
        const finallyId = getSpacerId(finallyNodes.map(n => n.id));
        spacerNodes.push({
            id: finallyId,
            type: spacerNodeType,
            width: 1,
            height: 1
        });
    }
    return spacerNodes;
};
exports.getSpacerNodes = getSpacerNodes;
const getEdgesFromNodes = (nodes, spacerNodeType = const_1.DEFAULT_SPACER_NODE_TYPE, edgeType = const_1.DEFAULT_EDGE_TYPE, spacerEdgeType = const_1.DEFAULT_EDGE_TYPE, finallyNodeTypes = [const_1.DEFAULT_FINALLY_NODE_TYPE], finallyEdgeType = const_1.DEFAULT_EDGE_TYPE) => {
    const edges = [];
    const spacerNodes = nodes.filter(n => n.type === spacerNodeType);
    const taskNodes = nodes.filter(n => n.type !== spacerNodeType);
    const finallyNodes = nodes.filter(n => finallyNodeTypes.includes(n.type));
    const lastTasks = nodes
        .filter(n => !finallyNodeTypes.includes(n.type))
        .filter(n => spacerNodeType !== n.type)
        .filter(t => !nodes.find(n => { var _a; return (_a = n.runAfterTasks) === null || _a === void 0 ? void 0 : _a.includes(t.id); }));
    spacerNodes.forEach(spacer => {
        const sourceIds = spacer.id.split('|');
        sourceIds.forEach(sourceId => {
            const node = nodes.find(n => n.id === sourceId);
            if (node && !finallyNodes.includes(node)) {
                edges.push({
                    id: `${sourceId}-${spacer.id}`,
                    type: spacerEdgeType,
                    source: sourceId,
                    target: spacer.id
                });
            }
        });
    });
    taskNodes.forEach(node => {
        if (node.runAfterTasks) {
            const spacerId = getSpacerId([...node.runAfterTasks]);
            const spacer = spacerNodes.find(n => n.id === spacerId);
            if (spacer) {
                edges.push({
                    id: `${spacer.id}-${node.id}`,
                    type: spacerEdgeType,
                    source: spacer.id,
                    target: node.id
                });
            }
            else if (node.runAfterTasks) {
                node.runAfterTasks.forEach(afterId => {
                    edges.push({
                        id: `${afterId}-${node.id}`,
                        type: edgeType,
                        source: afterId,
                        target: node.id
                    });
                });
            }
        }
    });
    if (finallyNodes.length > 1) {
        const finallyId = getSpacerId(finallyNodes.map(n => n.id));
        finallyNodes.forEach(finallyNode => {
            edges.push({
                id: `${finallyId}-${finallyNode.id}`,
                type: spacerEdgeType,
                source: finallyId,
                target: finallyNode.id
            });
        });
        lastTasks.forEach(lastTaskNode => {
            edges.push({
                id: `${lastTaskNode.id}-${finallyId}`,
                type: spacerEdgeType,
                source: lastTaskNode.id,
                target: finallyId
            });
        });
    }
    if (finallyNodes.length === 1) {
        lastTasks.forEach(lastTaskNode => {
            edges.push({
                id: `finallyId-${lastTaskNode.id}-${finallyNodes[0].id}`,
                type: finallyEdgeType,
                source: lastTaskNode.id,
                target: finallyNodes[0].id
            });
        });
    }
    return edges;
};
exports.getEdgesFromNodes = getEdgesFromNodes;
//# sourceMappingURL=utils.js.map