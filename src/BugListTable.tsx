import React from 'react'
import { IBug } from './IBug'

type Props = {
    bugs: IBug[],
    onDeleteBug: (id: string) => void
}

const BugListTable: React.FC<Props> = ({ bugs, onDeleteBug }) => {

    const resolvePressed = (id: string) => {
        onDeleteBug(id);
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Priority</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {bugs.length === 0 && <tr> <td>No bugs found</td></tr>}
                {bugs.length > 0 && bugs.map(bug => (
                    <tr key={bug.id}>
                        <td>{bug.description}</td>
                        <td>{bug.priority}</td>
                        <td><button onClick={() => resolvePressed(bug.id)}>Resolved</button></td>
                    </tr>
                ))}
            </tbody>
        </table >
    )
}

export default BugListTable