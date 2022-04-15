import React from 'react'

const stylesheet = {
  ColumnFlex: {
    display: "flex",
    flexDirection: "column",
  } as React.CSSProperties,
  FlexItemGrow: {
    flex: 1,
  } as React.CSSProperties,
  RowFlex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  } as React.CSSProperties,
  FlexItemCouple: {
    flex: "0 0 50%",
    width: "fit-content",
    textAlign: "center",
    marginTop: "1rem",
  } as React.CSSProperties,
}

export default stylesheet