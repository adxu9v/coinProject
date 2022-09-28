import React from 'react'
import axios from 'axios'
import { useEffect, useState} from 'react'

function CoinChart({coinClick}){
    const [loading,setLoading] = useState(true)
    const [Sn,SetSn] = useState([])
    useEffect(()=>{
        axios.get(`https://api.coingecko.com/api/v3/coins/${coinClick.id}`).then((res)=>{ SetSn(res.data); setLoading(false); console.log(res.data)})
      },[coinClick.id])
     
  return (
      <>{loading ? <h2 className='loadingText'>loading...</h2> : 
        <div className='modalBox'>
        <ul className='modalPriceNav'>
            <li>1h</li>
            <li>24h</li>
            <li>7d</li>
            <li>200d</li>
            <li>1y</li>
        </ul>
       <ul className='modalPriceHistory'>
         {/* 1시간 간격 가격 */}
           {Sn.market_data?.price_change_percentage_1h_in_currency.usd ?<li>{ Sn.market_data.price_change_percentage_1h_in_currency.usd }%</li>: null}
           {/* 24시간 간격 */}
           {Sn.market_data?.price_change_percentage_24h_in_currency.usd ?<li>{ Sn.market_data.price_change_percentage_24h_in_currency.usd }%</li>: null}
           {/* 7일 간격 */}
           {Sn.market_data?.price_change_percentage_7d_in_currency.usd ?<li>{ Sn.market_data.price_change_percentage_7d_in_currency.usd }%</li>: null}
           {/* 200일 간격 */}
           {Sn.market_data?.price_change_percentage_200d_in_currency.usd ?<li>{ Sn.market_data.price_change_percentage_200d_in_currency.usd }%</li>: null}
           {/* 1년 간격 */}
           {Sn.market_data?.price_change_percentage_1y_in_currency.usd ?<li>{ Sn.market_data.price_change_percentage_1y_in_currency.usd }%</li>: null}
       </ul>
       <ul className='modalPricese'>
          
           {Sn.market_data?.high_24h.usd? <li><p>24H HOUR</p> ${Sn.market_data.high_24h.usd}</li> : null}
           {Sn.market_data?.low_24h.usd? <li><p>24H LOW</p> ${Sn.market_data.low_24h.usd}</li> : null}
           {Sn.market_data?.circulating_supply? <li><p>CIRCULATING SUPPLY</p> ${Sn.market_data.circulating_supply.toLocaleString()}</li> : null}
           {Sn.market_data?.market_cap.usd? <li><p>MARKET CAP</p> ${Sn.market_data.market_cap.usd.toLocaleString()}</li> : null}
       </ul>
    </div>
      }

    </>
   
  )
}
export default CoinChart
