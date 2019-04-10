const { Icon } = wp.components;
const { withDispatch, select } = wp.data;

const SwitcherButton = ({
  label,
  icon,
  layout,
  blockIds,
  removeBlocks,
  resetBlocks,
  insertBlock,
  insertBlocks
}) => {
  return (
    <button
      onClick={() => {
        //console.log(label);
        // removeBlocks(blockIds);
        resetBlocks([]);
        insertBlocks(layout);
      }}
    >
      <span>{label}</span>
    </button>
  );
};

export default withDispatch(dispatch => {
  const { removeBlocks, resetBlocks, insertBlocks, insertBlock } = dispatch(
    "core/editor"
  );
  return {
    removeBlocks,
    resetBlocks,
    insertBlock,
    insertBlocks
  };
})(SwitcherButton);
