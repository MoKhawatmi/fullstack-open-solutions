const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    let sum=0;
    course.parts.forEach(part=>{
      sum+=part.exercises;
    })
    return (
      <p>Number of exercises {sum}</p>
    )
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    )
  }
  
  const Content = ({ course }) => {
    return (
     <div>
        {
           course.parts.map(part=>{
            return <Part part={part} />
           })
        }
      </div>
    )
  }

  const Course = (props) => {
    return (
      <div>
        <Header course={props.course} />
        <Content course={props.course}/>
        <Total course={props.course}/>
      </div>
    )
  }

  export default Course;