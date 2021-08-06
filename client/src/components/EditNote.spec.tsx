import { screen, render, cleanup } from '@testing-library/react';
import { EditNote } from './EditNote';
import { v4 as uuidv4 } from 'uuid';
import userEvent from '@testing-library/user-event';

describe('EditNote', () => {
  const currentNote = {
    id: uuidv4(),
    text: 'Note-1',
    date: '29/07/2021',
    order: 1
  };
  const mockHandleUpdateNote = jest.fn();
  const mockHandleSwitchEditMode = jest.fn();

  beforeEach(() => {
    render(
      <EditNote
        currentNote={currentNote}
        handleUpdateNote={mockHandleUpdateNote}
        handleSwitchEditMode={mockHandleSwitchEditMode}
      />
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('should render EditNote component', () => {
    expect(screen.getByRole('textbox'));
    expect(screen.getByRole('button', { name: 'Update' }));
  });

  it('should call update function when update button pressed', () => {
    userEvent.click(screen.getByRole('button', { name: 'Update' }));
    expect(mockHandleUpdateNote).toHaveBeenCalled();
  });
});
