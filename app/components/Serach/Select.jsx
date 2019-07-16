import React from "react";
import "./select.less";

import {getSelectOptions} from "./getSelectOption";

const Select = props => {
  let data = getSelectOptions(props.isSearchAdPage);
  return(
    <div>
        <div className="w">
          <div className='select-box'>
            {
              data.map((item, index) => {
                return(
                  <div key={index} className="select-box-item">
                    <div className="title">{item.title}: </div>
                    <div className="detail">
                      {item.options.map((option, num) => {
                        return(
                          <a key={num} onClick={(e) => {props.onSelectOptionsClick(item, num, e)}} >{option}</a>
                        )
                      })}
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
  )
};
export default Select;


