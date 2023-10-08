const Operation = ({ className, value, onClick }) => {
  /** TODO: What happens when a user clicks an Operation, what do we want to pass to our parent? */
  return (
    <button 
      className={'calculator-button operator ' + className} 
      onClick={(e) => onClick(e)}
      value={value}
    >
      {value}
    </button>
  );
};

export default Operation;
