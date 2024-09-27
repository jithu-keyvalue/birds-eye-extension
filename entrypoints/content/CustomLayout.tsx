import React from "react";
import { State } from "../content";
import Markdown from "react-markdown";
import birdIcon from "@/assets/icons/bird-icon.png";
import closeIcon from "@/assets/icons/close-icon.svg";
import kidsIcon from "@/assets/icons/kids-mode-icon.png";
import professionalIcon from "@/assets/icons/professional-mode-icon.png";
import notesIcon from "@/assets/icons/notes-icon.svg";
import largeBirdIcon from "@/assets/icons/bird-icon-large.svg";
import swirlArrowIcon from "@/assets/icons/swirl-arrow.svg";
import sendIcon from "@/assets/icons/send-icon.svg";
import "./CustomLayout.scss";

const CustomLayout = ({ state }: { state: State }) => {
  const [multiLevelSummaries, setMultiLevelSummaries] = React.useState<
    Record<string, string>
  >(state.multiLevelSummaries);
  const [multiLevelNotes, setMultiLevelNotes] = React.useState<
    Record<string, string>
  >(state.multiLevelNotes);
  const [level, setLevel] = React.useState<number>(state.level);
  
  const [selectedOption, setSelectedOption] = useState("NOTES");
  const [selectedView, setSelectedView] = useState("CASUAL");
  const notes = "";
  const question = "";
  const content = "";
  
  useEffect(() => {
    if (state.multiLevelSummaries) {
      setMultiLevelSummaries(state.multiLevelSummaries);
      console.log("Multilevel Summaries:", state.multiLevelSummaries);

      setMultiLevelNotes(state.multiLevelNotes);
      console.log("Multilevel Notes:", state.multiLevelNotes);
    }
  }, [state.multiLevelSummaries]);

  return (
    <div className="custom-layout">
      <div className="summary-view-topbar">
        <span className="topbar-components">
          <img src={birdIcon} alt="Birds Eye Logo" className="bird-icon" />
          BIRD'S EYE SUMMARY VIEW
        </span>
        <button className="topbar-components">
          CLOSE SUMMARY
          <img src={closeIcon} alt="close" className="close-icon" />
        </button>
      </div>

      <div className="summary-view-container">
        <div className="summary-modes">
          <button
            onClick={() => {
              setSelectedView("KIDS");
            }}
          >
            <img src={kidsIcon} alt="close" />
          </button>
          <button
            onClick={() => {
              setSelectedView("PROFESSIONAL");
            }}
          >
            <img src={kidsIcon} alt="close" />
          </button>
          <button
            onClick={() => {
              setSelectedView("CASUAL");
            }}
          >
            <img src={professionalIcon} alt="close" />
          </button>
        </div>
        {/* {content ? (
          <div className="summary-content">Content Here</div>
        ) : (
          <>skeleton</>
        )} */}
        <div className="summary-content">
          <Markdown>{content}</Markdown>
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
            <NoteSection selectedOption={selectedOption} notes={notes} question={question} />
          </div>
        </div>
        {/* <div className="summary-level-scroll">
          <div className="summary-level-info">Summary Level</div>
        </div> */}
      </div>
    </div>
  );
};

export const NoteSection = ({selectedOption, notes, question}) => {
    if (selectedOption === "NOTES") {
      if (!notes)
        return (
          <div className="summary-note-create-container">
            <div className="summary-note-create">
              Create notes from the summary you have generated
              <button className="create-note-button">
                <img src={notesIcon} alt="notes" className="notes-icon" />
                Generate notes
              </button>
            </div>
          </div>
        );
      else
        return (
          <div className="summary-notes-content">
            asdsadsadlasfdlseanbflnbdlkfjnlsdknfldknasdsadsadlasfdlseanbflnbdlkfjnlsdknfldknasdsadsadlasfdlseanbflnbdlkfjnlsdknfldknasdsadsadlasfdlseanbflnbdlkfjnlsdknfldknasdsadsadlasfdlseanbflnbdlkfjnlsdknfldknasdsadsadlasfdlseanbflnbdlkfjnlsdknfldknasdsadsadlasfdlseanbflnbdlkfjnlsdknfldknasdsadsadlasfdlseanbflnbdlkfjnlsdknfldknasdsadsadlasfdlseanbflnbdlkfjnlsdknfldknasdsadsadlasfdlseanbflnbdlkfjnlsdknfldkn
          </div>
        );
    } else if (selectedOption === "QUESTIONS") {
      if (!question)
        return (
          <div>
            <div className="summary-question-create-container">
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
            </div>
            <div className="question-input-container">
              <input className="question-input" placeholder="Ask me anything" />
              <button>
                <img src={sendIcon} alt="send-icon" />
              </button>
            </div>
          </div>
        );
      else
        return (
          <div>
            hi
            <div className="question-input-container">
              <input className="question-input" placeholder="Ask me anything" />
              <button>
                <img src={sendIcon} alt="send-icon" />
              </button>
            </div>
          </div>
        );
    }
  };



export default CustomLayout;