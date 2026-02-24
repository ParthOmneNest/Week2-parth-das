import { useCallback, useEffect, useRef, useState } from "react";

export function useInfiniteScroll<T>(items: T[], batchSize = 10) {
    // state and ref
    const [visibleCount, setVisibleCount] = useState(batchSize);
    const bottomRef = useRef<HTMLDivElement>(null);

    // loadMore
    const loadMore = useCallback(function () {
        setVisibleCount(function (currentCount) {
            const nextCount = currentCount + batchSize;
            if (nextCount > items.length) {
                return items.length;
            }
            return nextCount;
        })
    }, [batchSize, items.length]);

    // observor
    useEffect(function () {
        const bottomDiv = bottomRef.current
        if (bottomDiv === null) { return; }

        const observor = new IntersectionObserver(function (entries) {
            const entry = entries[0];
            if (entry.isIntersecting === true) {
                loadMore();
            }
        },{
            rootMargin:'50px',threshold:0.1
        })

        observor.observe(bottomDiv);
        return function () {
            observor.disconnect();
        };
    }, [loadMore])

    useEffect(() => {
        setVisibleCount(batchSize);
    }, [items.length, batchSize]);
    // return part
    const visibleItems = items.slice(0, visibleCount);
    const hasMore = visibleCount < items.length

    return { visibleItems, bottomRef, hasMore };

}