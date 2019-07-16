import React from "react";
import "./serchcommodity.less";
import {Input, InputNumber, Select, Button } from "antd";
import {cityOption} from "./getCity";

const Option = Select.Option;

const SerchCommodity = props => {
  return(
    <div>
    <div className="w">
      <div className="serchcomm-box">
        <div className="serchcomm-box-title">
          <p>输入搜索:</p>
        </div>
        <div className="input-box">
          <div>

          </div>
          <div>
            <InputNumber
              onChange={props.onTrafficInputChange}
              value={props.selectOption.traffic === 0 ? "" : props.selectOption.traffic}
              placeholder="人流量"
            />
          </div>
          <div style={{marginLeft: 40}}>
            <InputNumber
              onChange={props.onMinPriceChange}
              value={props.selectOption.price_start === 0 ? "" : props.selectOption.price_start}
              formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\￥\s?|(,*)/g, '')}
            />
            <span style={{padding: "0 10px"}}>-</span>
            <InputNumber
              onChange={props.onMaxPriceChange}
              value={props.selectOption.price_end === 0 ? "" : props.selectOption.price_end}
              formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\￥\s?|(,*)/g, '')}
            />
            {
              props.isSearchAdPage ?
                <Select
                  defaultValue="重庆"
                  value={props.selectOption.address === "" ? "地址" : props.selectOption.address}
                  style={{ width: 120, marginLeft: 40 }}
                  onChange={props.onAddressChange} >
                  {cityOption.map((item ,index) => {
                    return(
                      <Option key={index} value={item}>{item}</Option>
                    )
                  })}
                </Select>
                :
                ""
            }

            <Button
              onClick={props.submitSerchCondition}
              style={{marginLeft: 40}}
              type="primary">
              搜 索
            </Button>
          </div>
          <div className="id-search">
            <Input value={props.idSearch} onChange={props.onIdSearchChange} placeholder="按id搜索" />
            {
              props.isSearchAdPage ?
                <Button onClick={props.CrossIdGetAdData} type="primary">按id搜索</Button>
                :
                <Button onClick={props.CrossIdGetDemandData} type="primary">按id搜索</Button>
            }

          </div>
        </div>
      </div>
    </div>
  </div>
  )
};
export default SerchCommodity;