type Props = {
  addChild: (index: number) => void;
  childIndex: number;
  parentIndex: number;
  selectDatas: any[];
  setSelectDatas: (value: any[]) => void;
};

import styles from "./Child.module.css";

const Child = (props: Props) => {
  const { selectDatas, setSelectDatas, addChild, childIndex, parentIndex } =
    props;

  const level2Option1 = [
    { id: 1, name: "Chart" },
    { id: 2, name: "Table" },
    { id: 3, name: "Menu" },
  ];

  const level2Option2 = [
    { id: 1, name: "Select" },
    { id: 2, name: "Radio" },
  ];

  const onChangeLevel2 = (e: any, parentIndex: any, childIndex: number) => {
    const clone = JSON.parse(JSON.stringify(selectDatas));
    clone[parentIndex].child[childIndex] = {
      ...clone[parentIndex].child[childIndex],
      name: e.target.value,
    };
    setSelectDatas(clone);
  };
  const removeLevel2 = (parentIndex: number, childIndex: number) => {
    const clone = JSON.parse(JSON.stringify(selectDatas));
    clone[parentIndex].child.splice(childIndex, 1);
    setSelectDatas(clone);
  };
  return (
    <div
      className={styles["child-item"]}
      style={{
        paddingLeft: "50px",
        marginTop: "10px",
      }}
    >
      <div>
        <button onClick={() => removeLevel2(parentIndex, childIndex)}>-</button>
        <select
          style={{
            marginLeft: "10px",
            marginRight: "10px",
            padding: "5px",
          }}
          key={childIndex}
          onChange={(e) => onChangeLevel2(e, parentIndex, childIndex)}
        >
          {selectDatas[parentIndex].name === "Category" &&
            level2Option1.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          {selectDatas[parentIndex].name === "Filter" &&
            level2Option2.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
        </select>
      </div>
      {childIndex === selectDatas[parentIndex].child.length - 1 && (
        <button onClick={() => addChild(parentIndex)}>+</button>
      )}
    </div>
  );
};

export default Child;
