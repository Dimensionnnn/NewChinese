import React, { Component } from 'react'
import {
  ClearRefinements,
} from "react-instantsearch-dom";
import IndexRefineItem from './IndexRefineItem';

export default class IndexRefine extends Component {
  render() {
    const { filterableAttributes } = this.props
    return (
      <div>
        <ClearRefinements />
        {
          filterableAttributes && filterableAttributes.map((attribute) => {
            return <IndexRefineItem key={attribute} attribute={attribute} />
          })
        }
      </div>

    )
  }
}
