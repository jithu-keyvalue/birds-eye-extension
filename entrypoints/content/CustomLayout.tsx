import React from 'react'
import { State } from '../content'
import Markdown from 'react-markdown';

const CustomLayout = ({ state }:{ state:State }) => {
  const [multiLevelSummaries, setMultiLevelSummaries] = React.useState<Record<string, string>>(state.multiLevelSummaries);
  const [multiLevelNotes, setMultiLevelNotes] = React.useState<Record<string, string>>(state.multiLevelNotes);
  const [level, setLevel] = React.useState<number>(state.level);
  useEffect(() => {
    if(state.multiLevelSummaries){
      setMultiLevelSummaries(state.multiLevelSummaries);
      console.log('Multilevel Summaries:', state.multiLevelSummaries);

      setMultiLevelNotes(state.multiLevelNotes);
      console.log('Multilevel Notes:', state.multiLevelNotes);
    }
  }, [
    state.multiLevelSummaries
  ]);

  useEffect(() => {
    setLevel(state.level);
  }, [state.level]);

  return (
    <div>
        {
          multiLevelSummaries && 
          <Markdown>
            {multiLevelSummaries[level]}
          </Markdown>            
        }

        {
          multiLevelNotes && 
          <Markdown>
            {multiLevelNotes[level]}
          </Markdown>
        }
    </div>
  )
}

export default CustomLayout