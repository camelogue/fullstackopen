const Header = (props) => <h2>{props.course}</h2>

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Content = (props) => (
  <div>
    {props.parts.map(part => <Part key={part.id} part={part} />)}
  </div>
)

const Total = (props) => {
  const exercises = props.parts.map(part => part.exercises)
  const total = exercises.reduce((partialSum, a) => partialSum + a, 0)
  return (
    <p><b>total of {total} exercises</b></p>
  )
}

const Course = (props) => {
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  )
}

export default Course