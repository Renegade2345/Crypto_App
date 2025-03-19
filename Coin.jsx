import React,{useContext, useEffect, useState} from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'  
import { Coincontext } from '../../context/Coincontext'

const Coin = () => {

  const{coinId} = useParams()
  const[coinData, setcoinData] = useState();
  const[historicalData, sethistoricalData] = useState(); 
  const {currency} = useContext(Coincontext)  

  const fetchcoinData  = async()=>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-cB8i8MYrqTMoxqpj8ap5mNcX'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(res => res.json())
      .then(res => setcoinData(res))
      .catch(err => console.error(err));
  }

  const fetchhistoricalData = async ()=>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-cB8i8MYrqTMoxqpj8ap5mNcX'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
      .then(res => res.json())
      .then(res => sethistoricalData(res))
      .catch(err => console.error(err));
  }

  useEffect(()=>{
    fetchcoinData();
    fetchhistoricalData();
  },[coinId])


  if(coinData, historicalData){

    return (
      <div className='coin'>
      <div className="coin_name">
        <img src={coinData.image.large} alt="" />
        <p><b>{coinData.name}({coinData.symbol.toUpperCase()})</b></p>
      </div>
      <div className="coin-chart">
        <LineChart historicalData = {historicalData}/>
      </div>
      <div className="coin-info">
        <ul>
          <li>Crypto Market Rank</li>
          <li>{coinData.market_cap_rank}</li>
        </ul>
        <ul>
          <li>Current Price</li>
          <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
        </ul>

        <ul>
          <li>Market cap</li>
          <li>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
        </ul>

        
        <ul>
          <li>24 Hour high</li>
          <li>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
        </ul>

        
        <ul>
          <li>24 Hour low</li>
          <li>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
        </ul>
      </div>
  </div>
  )
}else{
  return(
    <div className="spinner">
      <div className="spin"></div>

    </div>
  )
}
}

export default Coin