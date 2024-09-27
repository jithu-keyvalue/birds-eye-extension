import CustomDropdown from "../Components/CustomDropDown";

import "./summaryText.scss";
import BirdIcon from "../../../assets/icons/bird-icon.png";
import Lightning from "../../../assets/icons/lightning.svg";
import gotoAccountIcon from "../../../assets/icons/gotoaccount.svg";

import CustomSlider from "../Components/CustomSlider";
import CustomSwitch from "../Components/CustomSwitch";

const SummarySettings = () => {
  const [level, setLevel] = useState(1);
  const [toggleControls, setToggleControls] = useState(true);

  const handleLevelChange = (event: any) => {
    setLevel(event.target.value);
  };

  return (
    <div>
      <div className="container">
        <div className="header">
          <div className="headerIcon">
            <img width={30} height={30} src={BirdIcon} />
          </div>
          <div className="welcomeMessage">
            <div className="headerTextLight">Welcome</div>
            <div className="headerTextBold">Shylesh</div>
          </div>
        </div>
        <div className="content">
          <div className="subscription row">
            <div className="subscriptionMessage">
              You have <span>9/10</span> monthly credits. Upgrade for more
            </div>
            <div className="upgradeButton">
              <div className="lightningIcon">
                <img src={Lightning} />
              </div>
              <div className="upgradeText">Upgrade</div>
            </div>
          </div>
          <div className="controls">
            {toggleControls && (
              <div className="summaryStyle row controlContainer">
                <div className="controlText">Summary style</div>
                <div className="control">
                  <CustomDropdown
                    options={[
                      { key: "option1", value: "Casual" },
                      { key: "option2", value: "Non-technical" },
                    ]}
                  />
                </div>
              </div>
            )}
            {toggleControls && (
              <div className="summaryLevel controlContainer">
                <div className="row">
                  <div className="controlText">Summary level</div>
                  <div className="control">{level}</div>
                </div>
                <div className="slider">
                  <CustomSlider
                    min={1}
                    max={10}
                    level={level}
                    handleChange={handleLevelChange}
                  />
                </div>
              </div>
            )}
            <div className="controlsToggle row controlContainer">
              <div className="controlText">Show floating controls</div>
              <div>
                <CustomSwitch
                  sx={{ m: 1 }}
                  defaultChecked
                  checked={toggleControls}
                  onChange={(event: any) =>
                    setToggleControls(event.target.checked)
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="footer row">
          <div className="version textGrayLight">Ver 1.0.0</div>
          <div className="manageAccount">
            <div className="textGray">Manage account</div>
            <div className="gotoAccountIcon">
              <img src={gotoAccountIcon} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummarySettings;
