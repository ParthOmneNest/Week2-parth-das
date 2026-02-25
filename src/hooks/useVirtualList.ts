import { useEffect, useRef, useState } from "react";

interface VirtualListOptions{
    rowHeight:number,
    visibleRows:number,
    overscan?:number
}

export function useVirtualList<T>(items:T[], options:VirtualListOptions){
    const rowHeight  =options.rowHeight;
    const visibleRows=options.visibleRows;
    const overscan   =options.overscan ?? 3;
    
    // states
    const[scrollTop,setScrollTop]=useState(0);
    const containerRef=useRef<HTMLDivElement>(null);

    // scroll function
    useEffect(function(){
        const container=containerRef.current
        if(container===null){ return;}

        function onScroll(){
            setScrollTop(container?.scrollTop ?? 0);
        }

        container.addEventListener('scroll',onScroll);
        return function(){
            container.removeEventListener('scroll',onScroll)
        }
    },[])

    // scrolling math logic
    const firstRow=Math.floor(scrollTop/rowHeight);
    const startIndex=Math.max(0,firstRow-overscan);
    const endIndex=Math.min(items.length,firstRow+visibleRows+overscan);

    const spaceAbove = startIndex * rowHeight;
    const spaceBelow=(items.length-endIndex)*rowHeight;

    // return
    return{
        visibleItems: items.slice(startIndex,endIndex),
        containerRef,
        spaceAbove,spaceBelow,
        startIndex
    }

}