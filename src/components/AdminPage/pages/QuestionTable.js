import '../styles/QuestionTable.css';
import {Button} from "antd";

const QuestionsTable = ({questions, onDelete, onEdit, onCreate}) => {
    return (
        <div className="table-container">
            <p className="header-admin">Quiz Questions CRUD</p>
            <table className="table-form">
                <thead className="table-header">
                <tr>
                    <th className="row-1">Question</th>
                    <th className="row-2">Answer</th>
                    <th className="row-3">Options</th>
                    <th className="row-4">Actions</th>
                </tr>
                </thead>
                <tbody className={"table-body"}>
                {questions.map((question) => (
                    <tr key={question.id}>
                        <td>{question.title}</td>
                        <td>{question.answer}</td>
                        <td>
                            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                {question.choices.map((choice) => (<div>{choice.title} {choice.key}</div>))}
                            </div>
                        </td>
                        <td className="action-buttons">
                            <Button style={{marginRight: "5px"}} type="primary" shape="round"
                                    onClick={() => onEdit(question)}>
                                Edit
                            </Button>
                            <Button type="primary" danger shape="round" onClick={() => onDelete(question)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Button style={{marginTop: "10px", alignSelf: 'flex-end'}} shape="round" onClick={onCreate}>Create</Button>
        </div>
    );
};

export default QuestionsTable;