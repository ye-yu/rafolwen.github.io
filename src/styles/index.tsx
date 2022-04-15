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
    justifyContent: "space-evenly"
  } as React.CSSProperties,
}

export default stylesheet