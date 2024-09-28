import React from "react";
import { State } from "../content";
import Markdown from "react-markdown";
import birdIcon from "@/assets/icons/bird-icon.png";
import closeIcon from "@/assets/icons/close-icon.svg";
import normalIcon from "@/assets/icons/normal.png";
import beginnerIcon from "@/assets/icons/beginner.png";
import friendlyIcon from "@/assets/icons/friendly.png";
import advancedIcon from "@/assets/icons/advanced.png";
import chevronDown from "@/assets/icons/chevronDown.svg";
import professionalIcon from "@/assets/icons/professional-mode-icon.png";
import notesIcon from "@/assets/icons/notes-icon.svg";
import largeBirdIcon from "@/assets/icons/bird-icon-large.png";
import swirlArrowIcon from "@/assets/icons/swirl-arrow.svg";
import sendIcon from "@/assets/icons/send-icon.svg";
import './CustomLayout.scss'
import CustomSlider from "../popup/Components/CustomSlider";
import CustomDropdown from "../popup/Components/CustomDropDown";

const CustomLayout = ({ state, handleLevelChange }: { state: State, handleLevelChange:Function }) => {
  const [multiToneSummeries, setMultiToneSummaries] = React.useState<
    Record<string, Record<string, string>>
  >(state.multiToneSummeries);
  // const [multiLevelSummaries, setMultiToneSummaries] = React.useState<Record<string,string>>(state.multiLevelSummaries);
  const [multiLevelNotes, setMultiLevelNotes] = React.useState<
    Record<string, string>
  >(state.multiLevelNotes);
  const [level, setLevel] = React.useState<number>(state.level);

  const [selectedOption, setSelectedOption] = useState("NOTES");
  const [selectedTone, setSelectedTone] = useState("Normal");
  const [saved, setSaved] = useState(false);
  const notes = multiLevelNotes[`${state.level}`];
  const question = "";
  const content = multiToneSummeries[`${state.level}`] && multiToneSummeries[`${state.level}`][selectedTone];

  useEffect(() => {
    if (state.multiLevelSummaries) {
      setMultiToneSummaries(state.multiToneSummeries);
      console.log("Multilevel Summaries:", state.multiLevelSummaries);

      setMultiLevelNotes(state.multiLevelNotes);
      console.log("Multilevel Notes:", state.multiLevelNotes);
    }
  }, [state.multiLevelSummaries]);

  // const handleLevelChange = (event: any) => {
  //   setLevel(event.target.value);
  // };

  return (
    <div className="custom-layout">
      <div className="summary-view-topbar">
        <span className="topbar-components">
          <img src={birdIcon} alt="Birds Eye Logo" className="bird-icon" />
          BIRD'S EYE SUMMARY VIEW
        </span>
        <button className="topbar-components" onClick={()=>handleLevelChange(0)}>
          CLOSE SUMMARY
          <img src={closeIcon} alt="close" className="close-icon" />
        </button>
      </div>

      <div className="summary-view-container">
        <div className="summary-modes">
          <button
            onClick={() => {
              setSelectedTone("Normal");
            }}
          >
            <img src={normalIcon} alt="close" />
            Normal Mode
          </button>
          <button
            onClick={() => {
              setSelectedTone("Beginner");
            }}
          >
            <img src={beginnerIcon} alt="close" />
            Beginner Mode
          </button>
          <button
            onClick={() => {
              setSelectedTone("Friendly");
            }}
          >
            <img src={friendlyIcon} alt="close" />
            Friendly Mode
          </button>
          <button
            onClick={() => {
              setSelectedTone("Advanced");
            }}
          >
            <img src={advancedIcon} alt="close" />
            Advanced Mode
            </button>
        </div>
        {/* {content ? (
          <div className="summary-content">Content Here</div>
        ) : (
          <>skeleton</>
        )} */}
        <div className="summary-middle-section">{
          content ?
            <div className="summary-content">
                <Markdown>{content}</Markdown>
            </div>
            :
            <div className='summary-loading'>
              <LoadingBeam />
            </div>
          }
          <div className="bottomBar">
            <button onClick={()=>{
              setSaved(!saved);
            }} className={`collectionButton ${saved?'saved':''}`}>
              <span>Save to Collections</span>
              <img src={chevronDown} alt="down arrow" />
            </button>
          
            <div className="summaryLevel controlContainer">
                  <div className="row">
                    <div className="controlText">Summary level</div>
                    <div className="control">{state.level}</div>
                  </div>
                  <div className="slider">
                    <CustomSlider
                      min={1}
                      max={5}
                      level={state.level}
                      handleChange={(e)=>handleLevelChange(e.target.value)}
                    />
                  </div>
                </div>
          </div>
            
          </div>

        <div className="summary-notes">
          <div className="summary-notes-topbar">
            <button
              className="summary-notes-topbar-option"
              onClick={() => setSelectedOption("NOTES")}
              style={
                selectedOption === "NOTES"
                  ? { fontWeight: 600, borderBottom: "3px solid #4A3500" }
                  : {}
              }
            >
              Notes
            </button>
            <button
              className="summary-notes-topbar-option"
              onClick={() => setSelectedOption("QUESTIONS")}
              style={
                selectedOption === "QUESTIONS"
                  ? { fontWeight: 600, borderBottom: "3px solid #4A3500" }
                  : {}
              }
            >
              Ask questions
            </button>
          </div>

          <div className="summary-notes-content-wrapper">
            <NoteSection
              selectedOption={selectedOption}
              notes={notes}
              question={question}
            />
          </div>
        </div>
        {/* <div className="summary-level-scroll">
          <div className="summary-level-info">Summary Level</div>
        </div> */}
      </div>
    </div>
  );
};

export const NoteSection = ({ selectedOption, notes, question }) => {
  if (selectedOption === "NOTES") {
    if (!notes)
      return (
        // <div className="summary-note-create-container">
        //   <div className="summary-note-create">
        //     Create notes from the summary you have generated
        //     <button className="create-note-button">
        //       <img src={notesIcon} alt="notes" className="notes-icon" />
        //       Generate notes
        //     </button>
        //   </div>
        // </div>
        <div className='notes-loading'>
          <LoadingBeam />
        </div>
      );
    else
      return (
        <div className="summary-notes-content">
          <Markdown>{notes}</Markdown>
        </div>
      );
  } else if (selectedOption === "QUESTIONS") {

      return (
        <div>
            <div className="summary-question-create">
              <img src={largeBirdIcon} alt="large-icon" />
              Ask questions about summarised content, and Bird&apos;s Eye
              answers
              <img
                src={swirlArrowIcon}
                alt="arrow-icon"
                className="arrow-icon"
              />
            </div>
          <div className="question-input-section">
            <div className="question-input-container">
              <input className="question-input" placeholder="Ask me anything" />
              <button>
                <img src={sendIcon} alt="send-icon" />
              </button>
            </div>
          </div>
        </div>
      );
  }
};

export default CustomLayout;
