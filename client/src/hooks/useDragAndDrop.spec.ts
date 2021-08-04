import { act, cleanup, renderHook } from "@testing-library/react-hooks";
import { useDragAndDrop } from "./useDragAndDrop";

describe('useDragAndDrop',()=>{
  const notes = [{ id: 'test-id', text: "Note-1", date: "29/07/2021", order:0 },{ id: 'test-id-2', text: "Note-2", date: "30/07/2021", order:1 }];
  const setNotes = jest.fn();
  let renderedHook;

  beforeEach(()=>{
    renderedHook = renderHook(()=> useDragAndDrop(notes,setNotes))
  });
  afterEach(()=> cleanup());

  it('should change position of notes',()=>{
    act(()=>{
      renderedHook.result.current.setDragId('test-id')
    })
  //  TODO: simulate drag element and drop on another element, make assertion that order of a note has changed.
  })
})