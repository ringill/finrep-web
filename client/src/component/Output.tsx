import React, { useState, useEffect } from "react";
import { callApi } from "../api";

export const OutputComponent = () => {
  const [data, setData] = useState<string>("no data");

  useEffect(() => {
    callApi().then(r => {
      const z = JSON.stringify(r.data);
      setData(z);
    }).catch(e => {
      setData("error on recive data");
    })
  }, []);

  return <>
    <h4>{data}</h4>
  </>
}
