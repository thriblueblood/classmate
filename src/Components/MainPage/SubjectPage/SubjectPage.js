import "./SubjectPage.css";
import { Card, CardContent, CardActions, Typography } from "@mui/material";
import { Link } from 'react-router-dom';

const subjects = [
  {
    key: 1,
    title: "Python",
    professor: "Alex",
  },
  {
    key: 2,
    title: "C",
    professor: "Taylor",
  },
  {
    key: 3,
    title: "C++",
    professor: "Jeff",
  },
];


export default function SubjectPage() {

const handleClick = (subject) => {
    return (console.log({subject}+"Clicked!"))
}
  return (
    <div className="main_subjectPage">
      <Typography variant="h2" fontSize="20px">
        List of subjects
      </Typography>
      <hr />

      {subjects.map((subject) => (
        <div>
        <Link to={`/main/subject/${subject.key}`}>
        <Card backgroundColor="secondary.main">
            <CardActions onClick={handleClick}>
              <CardContent >
                <Typography variant="h5">{subject.title}</Typography>
                <Typography variant="subtitle2">{subject.professor}</Typography>
              </CardContent>
            </CardActions>
          </Card>
        </Link>
          <br />
        </div>
      ))}
    </div>
  );
}
