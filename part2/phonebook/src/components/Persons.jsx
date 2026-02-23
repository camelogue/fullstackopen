const Person = ({person, onDelete}) => {
    return (
        <>
            <p>{person.name} {person.number} <button onClick={onDelete}>delete</button></p>
        </>
    )
}

const Persons = ({personsToShow, onDelete}) => {
    return (
        <div>
            {personsToShow.map(person => <Person key={person.id} person={person} onDelete={() => onDelete(person.id)} />)}
        </div>
    )
}

export default Persons