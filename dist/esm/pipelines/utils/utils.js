import styles from '@patternfly/react-styles/css/components/Topology/topology-pipelines';
import { RunStatus, WhenStatus } from '../types';
import { DEFAULT_EDGE_TYPE, DEFAULT_FINALLY_NODE_TYPE, DEFAULT_SPACER_NODE_TYPE } from '../const';
export const nonShadowModifiers = [
    styles.modifiers.danger,
    styles.modifiers.warning,
    styles.modifiers.success,
    styles.modifiers.skipped,
    styles.modifiers.inProgress
];
export const getRunStatusModifier = (status) => {
    switch (status) {
        case RunStatus.Failed:
        case RunStatus.FailedToStart:
            return styles.modifiers.danger;
        case RunStatus.Succeeded:
            return styles.modifiers.success;
        case RunStatus.Cancelled:
            return styles.modifiers.warning;
        case RunStatus.Skipped:
            return styles.modifiers.skipped;
        case RunStatus.Running:
            return styles.modifiers.running;
        case RunStatus.InProgress:
            return styles.modifiers.inProgress;
        case RunStatus.Pending:
            return styles.modifiers.pending;
        case RunStatus.Idle:
            return styles.modifiers.idle;
        default:
            return '';
    }
};
export const getWhenStatusModifier = (status) => {
    switch (status) {
        case WhenStatus.Met:
            return styles.modifiers.success;
        case WhenStatus.Unmet:
            return styles.modifiers.unmet;
        case WhenStatus.InProgress:
        case WhenStatus.Pending:
            return styles.modifiers.inProgress;
        default:
            return '';
    }
};
const getSpacerId = (ids) => [...ids]
    .sort((a, b) => a.localeCompare(b))
    .reduce((acc, ref) => {
    if (acc) {
        return `${acc}|${ref}`;
    }
    return ref;
}, '');
export const getSpacerNodes = (nodes, spacerNodeType = DEFAULT_SPACER_NODE_TYPE, finallyNodeTypes = [DEFAULT_FINALLY_NODE_TYPE]) => {
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
export const getEdgesFromNodes = (nodes, spacerNodeType = DEFAULT_SPACER_NODE_TYPE, edgeType = DEFAULT_EDGE_TYPE, spacerEdgeType = DEFAULT_EDGE_TYPE, finallyNodeTypes = [DEFAULT_FINALLY_NODE_TYPE], finallyEdgeType = DEFAULT_EDGE_TYPE) => {
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
//# sourceMappingURL=utils.js.map