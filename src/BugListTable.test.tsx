import {render, screen, fireEvent} from '@testing-library/react'
import BugListTable from './BugListTable'
import { BugPriority, IBug } from './IBug'

test('the bug table should display list of bugs', () => {
    const bugList: IBug[] = [
        {id: '1234', description: 'A test bug', priority: BugPriority.LOW},
        {id: '2345', description: 'Another test bug', priority: BugPriority.MEDIUM},
        {id: '3456', description: 'One more test bug', priority: BugPriority.LOW},
    ]

    render(<BugListTable bugs={bugList} onDeleteBug={() => {}} />)
    const rows = screen.getAllByRole('row');
    // Here we start with 1 as to avoid header row in the table
    for (let i = 1; i < rows.length; i++) {
        expect(rows[i]).toHaveTextContent(bugList[i - 1].description)
    }
})

test('the resolved button should remove the bug', () => {
    let bugsList: IBug[] = [
        {id: '1234', description: 'A test bug', priority: BugPriority.LOW},
        {id: '2345', description: 'Another test bug', priority: BugPriority.MEDIUM},
        {id: '3456', description: 'One more test bug', priority: BugPriority.LOW},
    ]

    const resolvePressed = (id: string) => {
        bugsList = bugsList.filter(bug => bug.id !== id);
    }

    const {rerender} = render(<BugListTable bugs={bugsList} onDeleteBug={resolvePressed} />);

    fireEvent.click(screen.getAllByText('Resolved')[0]);
    rerender(<BugListTable bugs={bugsList} onDeleteBug={resolvePressed} />);
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(3);
});