import * as lodash from 'lodash';
const getNodeParent = (nodeId, nodes) => nodes.find(n => (n.children ? n.children.includes(nodeId) : null));
const getDisplayedNodeForNode = (nodeId, nodes) => {
    if (!nodeId || !nodes) {
        return '';
    }
    let displayedNode = nodes && nodes.find(n => n.id === nodeId);
    let parent = displayedNode ? getNodeParent(displayedNode.id, nodes) : null;
    while (parent) {
        if (parent.collapsed) {
            displayedNode = parent;
        }
        parent = getNodeParent(parent.id, nodes);
    }
    return displayedNode ? displayedNode.id : '';
};
const createAggregateEdges = (aggregateEdgeType, edges, nodes) => {
    const aggregateEdges = [];
    return lodash.reduce(edges, (newEdges, edge) => {
        const source = getDisplayedNodeForNode(edge.source, nodes);
        const target = getDisplayedNodeForNode(edge.target, nodes);
        // Make sure visible is defined so that changes override what could already be in the element
        edge.visible = 'visible' in edge ? edge.visible : true;
        if (source !== edge.source || target !== edge.target) {
            if (source !== target) {
                const existing = aggregateEdges.find(e => (e.source === source || e.source === target) && (e.target === target || e.target === source));
                if (existing) {
                    // At least one other edge, add this edge and add the aggregate edge to the edges
                    // Add this edge to the aggregate and set it not visible
                    existing.children && existing.children.push(edge.id);
                    edge.visible = false;
                    // Hide edges that are depicted by this aggregate edge
                    lodash.forEach(existing.children, existingChild => {
                        const updateEdge = newEdges.find(newEdge => newEdge.id === existingChild);
                        if (updateEdge) {
                            updateEdge.visible = false;
                        }
                    });
                    // Update the aggregate edges bidirectional flag
                    existing.data.bidirectional = existing.data.bidirectional || existing.source !== edge.source;
                    // Check if this edge has already been added
                    if (!newEdges.find(e => (e.source === source || e.source === target) && (e.target === target || e.target === source))) {
                        newEdges.push(existing);
                    }
                }
                else {
                    const newEdge = {
                        data: { bidirectional: false },
                        children: [edge.id],
                        source,
                        target,
                        id: `aggregate_${source}_${target}`,
                        type: aggregateEdgeType
                    };
                    aggregateEdges.push(newEdge);
                }
            }
            else {
                // Hide edges that connect to a non-visible node to its ancestor
                edge.visible = false;
            }
        }
        newEdges.push(edge);
        return newEdges;
    }, []);
};
export { createAggregateEdges };
//# sourceMappingURL=createAggregateEdges.js.map