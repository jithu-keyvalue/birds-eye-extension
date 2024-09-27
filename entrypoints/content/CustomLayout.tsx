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
          // Object.values(multiLevelSummaries).map((summary:string, index:number) => (
          //   <div key={index}>
          //     <h3>{index}</h3>
          //     <Markdown>{summary}</Markdown>
          //   </div>
          // ))
          <Markdown>
            {multiLevelSummaries[level]}
          </Markdown>            
        }

        {
          multiLevelNotes && 
          // Object.values(multiLevelNotes).map((note:string, index:number) => (
          //   <div key={index}>
          //     <h3>{index}</h3>
          //     <Markdown>{note}</Markdown>
          //   </div>
          // ))
          <Markdown>
            {multiLevelNotes[level]}
          </Markdown>
        }
    </div>
  )
}

export default CustomLayout