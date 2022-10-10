import React from 'react'
import { useState } from "react";
import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";
const Loader = () => {

  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#845EC2");

  const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
  return (
    <div> 
      <div className="sweet-loading">
      <FadeLoader color={color} loading={loading} css={override} size={150} />
      </div>
      </div>
  )
}

export default Loader