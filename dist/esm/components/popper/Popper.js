import * as React from 'react';
import PopperJS from 'popper.js';
import useCombineRefs from '../../utils/useCombineRefs';
import Portal from './Portal';
class VirtualReference {
    constructor({ height = 0, width = 0, x, y }) {
        this.rect = {
            bottom: y + height,
            height,
            left: x,
            right: x + width,
            top: y,
            width
        };
    }
    getBoundingClientRect() {
        return this.rect;
    }
    get clientWidth() {
        return this.rect.width || 0;
    }
    get clientHeight() {
        return this.rect.height || 0;
    }
}
const getReference = (reference) => 'getBoundingClientRect' in reference ? reference : new VirtualReference(reference);
const DEFAULT_POPPER_OPTIONS = {};
const Popper = ({ children, container, className, open, placement = 'bottom-start', reference, popperOptions = DEFAULT_POPPER_OPTIONS, closeOnEsc, closeOnOutsideClick, onRequestClose, popperRef: popperRefIn, zIndex = 9999, returnFocus }) => {
    const controlled = typeof open === 'boolean';
    const openProp = controlled ? open || false : true;
    const nodeRef = React.useRef();
    const popperRef = React.useRef(null);
    const popperRefs = useCombineRefs(popperRef, popperRefIn);
    const [isOpen, setOpenState] = React.useState(openProp);
    const focusRef = React.useRef();
    const onRequestCloseRef = React.useRef(onRequestClose);
    onRequestCloseRef.current = onRequestClose;
    const setOpen = React.useCallback((newOpen) => {
        if (returnFocus && newOpen !== isOpen) {
            if (newOpen) {
                if (document.activeElement) {
                    focusRef.current = document.activeElement;
                }
            }
            else if (focusRef.current instanceof HTMLElement && focusRef.current.ownerDocument) {
                focusRef.current.focus();
            }
        }
        setOpenState(newOpen);
    }, [returnFocus, isOpen]);
    React.useEffect(() => {
        setOpen(openProp);
    }, [openProp, setOpen]);
    const onKeyDown = React.useCallback((e) => {
        if (e.key === 'Escape') {
            controlled ? onRequestCloseRef.current && onRequestCloseRef.current() : setOpen(false);
        }
    }, [controlled, setOpen]);
    const onClickOutside = React.useCallback((e) => {
        if (!nodeRef.current || (e.target instanceof Node && !nodeRef.current.contains(e.target))) {
            controlled ? onRequestCloseRef.current && onRequestCloseRef.current(e) : setOpen(false);
        }
    }, [controlled, setOpen]);
    const destroy = React.useCallback(() => {
        if (popperRef.current) {
            popperRef.current.destroy();
            popperRefs(null);
            document.removeEventListener('keydown', onKeyDown, true);
            document.removeEventListener('mousedown', onClickOutside, true);
            document.removeEventListener('touchstart', onClickOutside, true);
        }
    }, [onClickOutside, onKeyDown, popperRefs]);
    const initialize = React.useCallback(() => {
        if (!nodeRef.current || !reference || !isOpen) {
            return;
        }
        destroy();
        popperRefs(new PopperJS(getReference(typeof reference === 'function' ? reference() : reference), nodeRef.current, Object.assign(Object.assign({ placement }, popperOptions), { modifiers: Object.assign({ preventOverflow: {
                    boundariesElement: 'viewport'
                } }, popperOptions.modifiers) })));
        // init document listenerrs
        if (closeOnEsc) {
            document.addEventListener('keydown', onKeyDown, true);
        }
        if (closeOnOutsideClick) {
            document.addEventListener('mousedown', onClickOutside, true);
            document.addEventListener('touchstart', onClickOutside, true);
        }
    }, [
        popperRefs,
        reference,
        isOpen,
        destroy,
        placement,
        popperOptions,
        closeOnEsc,
        closeOnOutsideClick,
        onKeyDown,
        onClickOutside
    ]);
    const nodeRefCallback = React.useCallback(node => {
        nodeRef.current = node;
        initialize();
    }, [initialize]);
    React.useEffect(() => {
        initialize();
    }, [initialize]);
    React.useEffect(() => () => {
        destroy();
    }, [destroy]);
    React.useEffect(() => {
        if (!isOpen) {
            destroy();
        }
    }, [destroy, isOpen]);
    return isOpen ? (React.createElement(Portal, { container: container },
        React.createElement("div", { ref: nodeRefCallback, className: className, style: { zIndex } }, children))) : null;
};
export default Popper;
//# sourceMappingURL=Popper.js.map