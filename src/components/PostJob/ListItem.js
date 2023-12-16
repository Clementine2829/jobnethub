function ListItem(props) {
  const { index, value, onChange, onRemove } = props;
  return (
    <li>
      <input
        type="text"
        value={value.text}
        onChange={onChange}
        placeholder={value.placeholder}
        style={{ borderTop: "none" }}
      />
      <button className={`btn_delete`} onClick={() => onRemove(index)}>
        <span className={`fas fa-trash-alt`} aria-hidden="true"></span>
      </button>
    </li>
  );
}

export default ListItem;
