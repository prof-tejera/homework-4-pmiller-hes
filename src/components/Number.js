import "./button.css";

const Number = ({ value, onClick }) => {
  /** TODO: What happens when a user clicks a number, what do we want to pass to our parent? */
  return (
    <button
      className="calculator-button number"
      onClick={(e) => onClick(e)}
      value={value}
    > 
      {value}
    </button>
  );
};

export default Number;
