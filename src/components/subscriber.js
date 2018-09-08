import React, { Component } from 'react';
import { Address, Button, Blockie } from "dapparatus"


class Publisher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toAddress: "",
      tokenAmount: 1,
      timeAmount: 1,
      timeType:"months",
      tokenName:"TokenExampleSubscriptionToken",
      gasPrice:0.01,
      prefilledParams:false
    };
  }
  handleInput(e){
    let update = {}
    update[e.target.name] = e.target.value
    this.setState(update,()=>{
      this.updateUrl()
    })
  }
  updateUrl(){
    let url = window.location.origin+window.location.pathname+
      "?timeAmount="+this.state.timeAmount+
      "&timeType="+this.state.timeType
      if(this.state.toAddress) url+="&toAddress="+this.state.toAddress
      if(this.state.tokenAddress) url+="&tokenAddress="+this.state.tokenAddress
      if(this.state.tokenAmount) url+="&tokenAmount="+this.state.tokenAmount
      if(this.state.gasPrice) url+="&gasPrice="+this.state.gasPrice

    this.setState({url:url})
  }
  componentDidMount() {
    let {contracts} = this.props
    console.log("contracts",contracts)
    this.setState({
      isLoaded: true,
      items: [ {
        address: this.props.contracts.TokenExampleSubscriptionToken._address,
        decimals: 18,
        name: "TokenExampleSubscriptionToken",
        symbol: "TEST"
      } ]
    })
    if(this.props.contract){
      console.log("poll contract for values...")
    }
  }
  render() {
    let {contract} = this.props
    let {items,toAddress,tokenName,tokenAmount,timeType,timeAmount,gasPrice,prefilledParams} = this.state
    let coinOptions = []
    for(let i in items){
      console.log(items[i].name)
      coinOptions.push(
          <option key={items[i].name} value={items[i].name}>{items[i].name}</option>
      )
    }
    if(contract){
      if(!prefilledParams){
        return (
          <div style={{paddingLeft:40}}>
            loading...
          </div>
        );
      }else{
        return (
          <div style={{paddingLeft:40}}>
            autofill...
          </div>
        );
      }
    }else{
      return (
        <div style={{paddingLeft:40}}>
          <div>
            To Address:<Blockie
              address={toAddress.toLowerCase()}
              config={{size:3}}
            /> <input
              style={{verticalAlign:"middle",width:400,margin:6,maxHeight:20,padding:5,border:'2px solid #ccc',borderRadius:5}}
              type="text" name="toAddress" value={toAddress} onChange={this.handleInput.bind(this)}
            />
          </div>
          <div>
            Token: <select value={tokenName} name="tokenName" onChange={this.handleInput}>
              {coinOptions}
            </select>

             Amount: <input
               style={{verticalAlign:"middle",width:400,margin:6,maxHeight:20,padding:5,border:'2px solid #ccc',borderRadius:5}}
               type="text" name="tokenAmount" value={tokenAmount} onChange={this.handleInput.bind(this)}
             />
          </div>
          <div>
            Recurring Every:   <input
              style={{verticalAlign:"middle",width:400,margin:6,maxHeight:20,padding:5,border:'2px solid #ccc',borderRadius:5}}
              type="text" name="timeAmount" value={timeAmount} onChange={this.handleInput.bind(this)}
            /><select value={timeType} name="timeType" onChange={this.handleInput}>
              <option value="months">Month(s)</option>
              <option value="days">Day(s)</option>
              <option value="hours">Hour(s)</option>
              <option value="minutes">Minute(s)</option>
            </select>
          </div>
          <div>
            Gas Price:   <input
              style={{verticalAlign:"middle",width:400,margin:6,maxHeight:20,padding:5,border:'2px solid #ccc',borderRadius:5}}
              type="text" name="gasPrice" value={gasPrice} onChange={this.handleInput.bind(this)}
            /> {tokenName}
          </div>
          <Button size="2" onClick={()=>{
              this.props.deploySubscription(toAddress,tokenName,tokenAmount,timeType,timeAmount,gasPrice)
            }}>
            Deploy Contract
          </Button>
        </div>
      );
    }

  }
}

export default Publisher;