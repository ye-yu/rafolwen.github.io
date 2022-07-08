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
  CenteredResponsive(breakpoint: string): React.CSSProperties {
    return {
      textAlign: "center",
      marginTop: breakpoint === "mobile" ? "5rem" : "5rem",
      marginBottom: breakpoint === "mobile" ? "1rem" : "3rem",
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: breakpoint === "mobile" ? "80%" : "100%",
    };
  },
  RoundImage(breakpoint: string): React.CSSProperties {
    return {
      maxWidth: breakpoint === "mobile" ? 200 : breakpoint === "tablet" ? 210 : 250,
      border: "solid",
      borderWidth: 5,
      borderColor: "white",
      borderRadius: "100%",
      margin: breakpoint === "mobile" ? "auto auto 3rem" : "auto",
    };
  }
}

export default stylesheet