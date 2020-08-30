import React,{Component} from 'react';
import Button from "./Component/Button/Button";
import './CSS/style.css';
class App extends Component {

  constructor(props){
    super(props);

    this.state ={
      current : '0',
      previous: [],
      nextIsReset: false
    }
  }
 
  reset =() =>{
    this.setState({current:'0',previous:[]});
  }

  addToCurrent=(symbol) => {
    let {previous, current, nextIsReset }  = this.state;
    if(['/','-','+','*'].indexOf(symbol) > -1){
      previous.push(current+ symbol);
      this.setState({previous, nextIsReset: true});
    }else{
      if((current === '0' && symbol !== '.') || nextIsReset){
          this.setState({current:symbol , nextIsReset:false})
      }else{
        this.setState({current: this.state.current + symbol})
      }
    }
  }

  calculate =(symbol)=>{
    let {current,previous, nextIsReset} = this.state;
    if(previous.length>0){
      current = eval(String(previous[previous.length -1] + current));
      this.setState({current,previous:[],nextIsReset:true});
    }
  }

  render(){
    const {current,previous} =this.state;
    const buttons= [
      {symbol: 'C', cols: 3, action: this.reset },
      {symbol: '/', cols: 1, action: this.addToCurrent },
      {symbol: '7', cols: 1, action: this.addToCurrent },
      {symbol: '8', cols: 1, action: this.addToCurrent },
      {symbol: '9', cols: 1, action: this.addToCurrent },
      {symbol: '*', cols: 1, action: this.addToCurrent },
      {symbol: '4', cols: 1, action: this.addToCurrent },
      {symbol: '5', cols: 1, action: this.addToCurrent },
      {symbol: '6', cols: 1, action: this.addToCurrent },
      {symbol: '-', cols: 1, action: this.addToCurrent },
      {symbol: '1', cols: 1, action: this.addToCurrent },
      {symbol: '2', cols: 1, action: this.addToCurrent },
      {symbol: '3', cols: 1, action: this.addToCurrent },
      {symbol: '+', cols: 1, action: this.addToCurrent },
      {symbol: '0', cols: 2, action: this.addToCurrent },
      {symbol: '.', cols: 1, action: this.addToCurrent },
      {symbol: '=', cols: 1, action: this.calculate },

    ];
  return (
   
    <div className="App">
      {
      
      previous.length > 0 ? 
      
      <div className='floaty-left'>
        {previous[previous.length-1]}
      </div> 
      
      : null
      
    
    }
     <input className= 'result' value={current} />
      {
        buttons.map((btn,i)=>{
            return <Button key={i} symbol={btn.symbol} cols={btn.cols} action={(symbol)=> btn.action(symbol)} />
        })
      }
    </div>
  );
}

}

export default App;
