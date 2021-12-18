import AddSubjectPage from "./AddSubjectPage";
import React,{useState} from "react";

export default function AddSubjectMainPage(){
    const [numberSubject, setNumberSubject] = useState(1);

    const isEqualOne = () => {
        return numberSubject === 1;
      };
    return (
        <div>
        { [...Array(numberSubject)].map((_, i) => <AddSubjectPage key={i} />) }
        {isEqualOne() ? (
            <span/>
        ) : (
            <button type="button" onClick={() => setNumberSubject(numberSubject -1)}>
              Delete Subject
            </button>
        )}
        <button type="button" onClick={() => setNumberSubject(numberSubject + 1)}>
              Add Subject
            </button>
        </div>
    )
}