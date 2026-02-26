const Filter = ({keyword, handleKeywordChange}) => {
    return (
        <input value={keyword} onChange={handleKeywordChange}></input> 
    )
}

export default Filter