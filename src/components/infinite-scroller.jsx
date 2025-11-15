import { useState, useEffect, useRef, useCallback } from 'react'
import { Card } from 'azeriand-library'

export default function InfiniteScroller({children, getMoreData, containerHeight = 0, hasMore, isLoading = false, bufferPx = 0, loader, className }){

    const containerRef = useRef()

    const loadDataIfScrolledToBottom = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;

        const { scrollTop, scrollHeight, clientHeight } = container;

        if (scrollTop + clientHeight >= scrollHeight - bufferPx) {
            if (!isLoading && hasMore) {
                getMoreData();
            }
        }
    }, [getMoreData, bufferPx, isLoading, hasMore]);

    const useDebounce = (callbackFn, delay = 0.2) => {
        const timeoutRef = useRef();

        return useCallback(
            (...args) => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(() => callbackFn(...args), delay * 1000);
            },
            [callbackFn, delay]
        );
    };

    const debouncedScroll = useDebounce(loadDataIfScrolledToBottom, 0.2);


    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        el.addEventListener('scroll', debouncedScroll);
        return () => el.removeEventListener('scroll', debouncedScroll);
    }, [debouncedScroll]);

    return(
            <div ref={containerRef} style={{ height: containerHeight, overflowY: 'scroll' }} className={className + ' pb-8'}>
                {children}
                {<div className={`flex justify-center py-6 ${!isLoading ? 'invisible' : ''}`}>{loader}</div>}
            </div>
    )
}