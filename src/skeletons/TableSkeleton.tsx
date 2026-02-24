interface TableSkeletonProps{
    rows?:number,
    cols?:number,
    title?:string,
}

const shimmerCSS=`
@keyframes shimmer{
    0% {background-position: -400px 0;}    
    100% {background-position: 400px 0;}    
}
    .sk{
        background:linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%,#f0f0f0 75%);
        background-size: 400px 100%;
        animation:shimmer 1.4s ease-in-out infinite;
        border-radius: 4px;
        height: 16px;
    }
`;

export const TableSkeleton: React.FC<TableSkeletonProps>=({
    rows=5,
    cols=4,
    title,
})=>{
    return(
        <div style={{marginBottom:24}}>
        
        
            {/* // injecting shimmer css */}
            <style>{shimmerCSS}</style>
            
            {/* // if title is thei show grey bar where header would be */}
            {title && (
                <div className="sk" style={{width:200,height:24,marginBottom:12}} />
            )}

            <table style={{width:'100%', borderCollapse:'collapse'}} >
                {/* // Header Row */}
                <thead>
                    <tr style={{background:'#1E3A8A'}} >
                        {Array.from({length:cols}).map(function(_,columnIndex){
                            return(
                                <th key={columnIndex} style={{padding:10,width:`${100/cols}`}}>
                                    <div className="sk" style={{width:'70%', background:'#4B6FBF'}} />
                                </th>
                            )
                        })}
                    </tr>
                </thead>
            
                {/* // Data Rows */}
                <tbody>
                     {Array.from({length:rows}).map(function(_,rowIndex){
                         // alternate white and light grey rows - same as DataTable
                         var isEvenRow= rowIndex % 2===0;
                         var rowBackground=isEvenRow?'#fff':'#F8FAFC';
                         
                         return(
                             <tr key={rowIndex} style={{background: rowBackground}}>
                                {Array.from({length:cols}).map(function(_,colIndex){
                                    // Pattern: 50%, 60%, 70%, 80%, 50%,60%
                                    var extraWidth=(colIndex * 10) %40;
                                    var barWidth=50+extraWidth;
                                    return(
                                        <td key={colIndex} style={{padding:10}}>
                                            <div className="sk" style={{width: `${barWidth}`}} />
                                        </td>
                                    );
                                })}
                                
                            </tr>
                        );
                     })}
                </tbody>
            </table>
        
        </div>
    )
}