const Filter = ({keyword, handleKeywordChange}) => {
    return (
        <div>
            filter shown with <input value={keyword} onChange={handleKeywordChange}></input>
        </div>
    )
}

export default Filter