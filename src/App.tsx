import { useState } from "react";
import "./App.css";
import Child from "./Child";

function App() {
  const [selectDatas, setSelectDatas] = useState<any[]>([
    { id: 1, name: "Category", child: [] },
  ]);
  const level1 = [
    { id: 1, name: "Category" },
    { id: 2, name: "Filter" },
  ];

  const onChangeLevel1 = (e: any, index: number) => {
    console.log("change");
    const clone = JSON.parse(JSON.stringify(selectDatas));

    clone[index] = { ...clone[index], name: e.target.value, child: [] };
    setSelectDatas(clone);
  };

  const addChild = (parentIndex: number) => {
    const clone = JSON.parse(JSON.stringify(selectDatas));
    clone[parentIndex] = {
      ...clone[parentIndex],
      child: [
        ...clone[parentIndex].child,
        {
          id: clone[parentIndex].child.length + 1,
          name: "Chart",
        },
      ],
    };
    setSelectDatas(clone);
  };

  const clickAddLevel1 = (e: any) => {
    e.preventDefault();
    const newSelectDatas = [
      ...selectDatas,
      { id: selectDatas.length + 1, name: "Category", child: [] },
    ];
    setSelectDatas(newSelectDatas);
  };

  const removeLevel1 = (parentIndex: number) => {
    const clone = JSON.parse(JSON.stringify(selectDatas));
    clone.splice(parentIndex, 1);
    setSelectDatas(clone);
  };
  return (
    <div>
      {selectDatas.length > 0 &&
        selectDatas.map((parentData, parentIndex) => (
          <div style={{ marginTop: "10px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <button onClick={() => removeLevel1(parentIndex)}>-</button>
              <select
                style={{
                  marginLeft: "10px",
                  marginRight: "10px",
                  padding: "5px",
                }}
                key={parentIndex}
                onChange={(e) => onChangeLevel1(e, parentIndex)}
              >
                {level1.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
              <button onClick={() => addChild(parentIndex)}>+</button>
            </div>
            {parentData.child.length > 0 &&
              parentData.child.map((child: any, childIndex: any) => (
                <Child
                  selectDatas={selectDatas}
                  setSelectDatas={setSelectDatas}
                  addChild={addChild}
                  childIndex={childIndex}
                  parentIndex={parentIndex}
                />
              ))}
            {parentIndex === selectDatas.length - 1 && (
              <button
                style={{ margin: "5px" }}
                onClick={(e) => clickAddLevel1(e)}
              >
                +
              </button>
            )}
          </div>
        ))}
      {selectDatas.length === 0 && (
        <button onClick={(e) => clickAddLevel1(e)}>+</button>
      )}
    </div>
  );
}

export default App;
