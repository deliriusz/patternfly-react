import * as React from 'react';
const useScaleNode = (scaleNode, scale, scaleUpTime = 200) => {
    const [nodeScale, setNodeScale] = React.useState(1);
    const animationRef = React.useRef();
    const scaleGoal = React.useRef(1);
    const nodeScaled = React.useRef(false);
    React.useEffect(() => {
        if (!scaleNode || scale >= 1) {
            setNodeScale(1);
            nodeScaled.current = false;
            if (animationRef.current) {
                window.cancelAnimationFrame(animationRef.current);
                animationRef.current = 0;
            }
        }
        else {
            scaleGoal.current = 1 / scale;
            const scaleDelta = scaleGoal.current - scale;
            const initTime = performance.now();
            const bumpScale = (bumpTime) => {
                const scalePercent = (bumpTime - initTime) / scaleUpTime;
                const nextScale = Math.min(scale + scaleDelta * scalePercent, scaleGoal.current);
                setNodeScale(nextScale);
                if (nextScale < scaleGoal.current) {
                    animationRef.current = window.requestAnimationFrame(bumpScale);
                }
                else {
                    nodeScaled.current = true;
                    animationRef.current = 0;
                }
            };
            if (nodeScaled.current) {
                setNodeScale(scaleGoal.current);
            }
            else if (!animationRef.current) {
                animationRef.current = window.requestAnimationFrame(bumpScale);
            }
        }
        return () => {
            if (animationRef.current) {
                window.cancelAnimationFrame(animationRef.current);
                animationRef.current = 0;
            }
        };
    }, [scale, scaleNode, scaleUpTime]);
    return nodeScale;
};
export default useScaleNode;
//# sourceMappingURL=useScaleNode.js.map