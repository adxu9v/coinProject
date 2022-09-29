import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import './App.css';
import CoinChartPage from './components/coinChart'
function App() {

  const [coins,Setcoins] = useState([])
  const [search,SetSearch] = useState('')
  const [lang,Setlang] = useState('krw')
  const [modal,Setmodal] = useState(false)
  const [coinClick,SetcoinClick] = useState('')
  const [page,Setpage] = useState(10)
 const searchChange = e => {SetSearch(e.target.value);}
  const filteredCoins = coins.filter(coins => coins.name.toLowerCase().includes(search.toLowerCase()))
  const getCoinData = async () => {
    await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${lang}&order=market_cap_desc&per_page=${page}&page=1&sparkline=false`)
  .then(result => {Setcoins(result.data)})
  .catch(()=>{alert('error')})}

  useEffect( () => {
    getCoinData()
     },[lang,page])
//언어 설정
  const handleSelect = (e) => {
    Setlang(e.target.value)
  };
  return (
    <div className="App">
      <nav>
      <form>
         <input type="text" className='search' onChange={searchChange} placeholder='search...' />
         </form>
            <select name="" id="" className='selectLang' onChange={handleSelect}>
         <option value="krw">KRW</option>
         <option value="usd">USD</option>
       </select>
      </nav>
     <ul className='coinList'>
      <li>
        <ul className='coinListNav'>
          <li></li>
          <li></li>
          <li>실시간 시세</li>
          <li>변동률</li>
          <li>거래량</li>
          <li>시가총액</li>
        </ul>
      </li>
      {/* 코인 리스트, 클릭 시 해당 코인의 시세정보가 담긴 모달창 출력 */}
     {filteredCoins.map((coins,i)=>{
       return <li className='coinListBox'
       onClick={ () => {
         Setmodal(true);
         SetcoinClick(coins)
         }} key={i}>
      <ul className='coins'>
        <li><img src={filteredCoins[i].image} alt={filteredCoins[i].image} /></li>
        {/* 이름 */}
         <li> {filteredCoins[i].name}</li>
         {/* 실시간 시세, 1개 기준 */}
         <li> {lang === 'usd' ? `$ ${filteredCoins[i].current_price.toLocaleString()}`
        //총가격
         :`${filteredCoins[i].current_price.toLocaleString()} 원`} </li>
         {/* 24시간동안 변동률, 하락세면 파랑색 폰트 컬러, 상승세면 빨강색 폰트 컬러 */}
         <li className={filteredCoins[i].price_change_percentage_24h > 0 ? 'font_blue' : 'font_red'}>
           {filteredCoins[i].price_change_percentage_24h > 0 ? '+' : null}{filteredCoins[i].price_change_percentage_24h.toFixed(2)} %</li>
         {/* 24시간 동안 거래량 */}
         <li>{lang === 'usd' ? `$ ${filteredCoins[i].total_volume.toLocaleString()}` 
         :`${filteredCoins[i].total_volume.toLocaleString()} 원`} </li>
         {/* 시가총액 */}
         <li> {lang === 'usd' ? `$ ${filteredCoins[i].market_cap.toLocaleString()}` : `${filteredCoins[i].market_cap.toLocaleString()} 원`}</li>
      </ul>
       </li>})}
     </ul>
     {/* 코인 리스트 더보기 버튼, 10줄씩 */}
     <button onClick={()=>{Setpage(page+10); console.log(page)}}>더보기</button>
     {/* 코인 리스트 클릭 시 해당 코인의 정보가 담긴 모달창 출력 */}
 {modal === true ? <Modal Setmodal={Setmodal} lang={lang} coinClick={coinClick}/> : null} 
    </div>
  );
}
function Modal ({Setmodal,coinClick,lang}){
  return(
    <>
    <div className='bg-black' onClick={(e)=>{if(e.target === document.querySelector('.bg-black')){ Setmodal(false)}}}>
    <div className='modalContainer'>
   <div className='modalContent'>
   <h2 className='modalId'>{coinClick.id.toUpperCase()}</h2>
   <div className='modalContentBox'>
   <img src={coinClick.image} alt={coinClick.image} className='modalImage'/>
     <h5 className='modalName'>{coinClick.name}</h5> /
     <p>{coinClick.symbol}</p>
     <p className='modalCurrentPrice'>$ {coinClick.current_price}</p>
   </div>
   {/* 코인 차트 */}
    { <CoinChartPage coinClick={coinClick} lang={lang}></CoinChartPage> }
     <button className='modalCloseBtn' onClick={()=>{Setmodal(false)}}>X</button>
   </div>
   </div>
    </div>
    </>
  )
}
export default App;
