export const PageContent=(
    {
        items,
        onNext,onPrev,
        isFirstPage,isLastPage,
        currentPage,totalPages
    }
)=>{
    return(
        <div>
        <h3>Page {currentPage} Of {totalPages}</h3>

        <ul>
            {items.map((item)=>(
                
                <li key={item.id}>{item.name} has {item.passed?"passed":"failed"} and scored {item.score}</li>
            ))}
        </ul>

        <div>
            <button onClick={onPrev} disabled={isFirstPage}>Previous</button>
            <button onClick={onNext} disabled={isLastPage}>Next</button>
        </div>
    </div>
    )
} 