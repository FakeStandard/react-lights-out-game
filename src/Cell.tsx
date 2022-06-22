import React from "react";
import './Cell.css'

export interface ICellProps {
  // call back
  flipAround: any
  isLit: boolean
}

class Cell extends React.Component<ICellProps, {}> {
  constructor(props: ICellProps) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event: any) {
    this.props.flipAround()
  }

  render(): React.ReactNode {
    let classed = "Cell " + (this.props.isLit ? "Cell-lit" : "")

    return (
      <td className={classed} onClick={this.handleClick} />
    )
  }
}

export default Cell