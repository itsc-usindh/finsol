
import { useEffect, useState } from "react";
import FormInput from "../FormInput";

const ComboBox = ({ options, itemSelectHandler, placeholder, disable }) => {
  const [boxOpened, setBoxOpened] = useState(false);
  const [displayText, setDisplayText] = useState(
    placeholder ? placeholder : options && options[0]?.name
  );
  const [searchOption, setSearchOption] = useState("");
  const [mainOption, setMainOption] = useState(options);

  // Update `mainOption` based on search
  useEffect(() => {
    if (!options) return;
    if (searchOption) {
      setMainOption(
        options.filter((opt) =>
          opt.name.toLowerCase().includes(searchOption.toLowerCase())
        )
      );
    } else {
      setMainOption(options);
    }
  }, [searchOption, options]);

  const openHandler = () => {
    if (!disable) setBoxOpened(!boxOpened);
  };

  const innerItemSelectHandler = (selectedOption) => {
    if (!disable) {
      setBoxOpened(false);
      setDisplayText(selectedOption.name);
      itemSelectHandler && itemSelectHandler(selectedOption);
    }
  };

  return (
    <div className={`combobox ${disable ? "disabled" : ""}`}>
      {/* Dropdown Toggle */}
      <div
        className={`combobox-btn${boxOpened ? " open" : ""}`}
        onClick={openHandler}
        style={{
          pointerEvents: disable ? "none" : "auto",
          opacity: disable ? 0.5 : 1,
        }}
      >
        <p>{displayText}</p>
        <i className="fa fa-chevron-down"></i>
      </div>

      {/* Dropdown Items */}
      {boxOpened && (
        <div className="combobox-items">
          <FormInput setValue={setSearchOption} disabled={disable} />
          {mainOption && mainOption.length > 0 ? (
            mainOption.map((option) => (
              <p
                key={option.value}
                onClick={() => innerItemSelectHandler(option)}
              >
                {option.name}
              </p>
            ))
          ) : (
            <p className="no-options">No options available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ComboBox;