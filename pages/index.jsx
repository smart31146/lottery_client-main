import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {Radio, Grid, Slider} from '@material-ui/core';
import {TicketButton} from '../components/buttons'
import {useState} from "react"
import {Card} from "../components/card"
import {RoundPotCard} from "../components/roundPotCard"
import {WorkFlowCard} from "../components/workFlow"
import {UnLockWalletCard} from "../components/unlockWallet"
import {LatestWinNumbercard} from "../components/latestWinNumber"
import {useRouter} from 'next/router';
import {LotteryContract,TicketContract,CoinContract,CoinDecimals} from "../contract"
import {useEffect } from "react"
import section6Image from '../public/image/10.png';

import {ethers} from "ethers";

export default function Home() {
  const router = useRouter();

 function toHHMMSS(sec) {
    let sec_num = parseInt(sec, 10); // don't forget the second parm
    let hours  = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);

    let Ohours = hours + '';
    let Ominutes = minutes + '';
    let Oseconds = seconds + '';
    if (hours < 10) {
        Ohours = "0" + hours;
    }
    if (minutes < 10) {
        Ominutes = "0" + minutes;
    }
    if (seconds < 10) {
        Oseconds = "0" + seconds;
    }
    var time = Ohours + 'hr ' + Ominutes + 'min';
    return time;
}

  const duration = 302400;
  const [parseTime,setParseTime] = useState("1000000");
  const [roundTime,setRoundTime] = useState(60);
  const [ticketTime,setTicketTime] = useState(10000);
  const [drawTime,setDrawTime] = useState(100000);
  const [timeValue ,setTimeValue] = useState();
  const [issueId, setIssueId] = useState("0");
  const [sliderValue, setSliderValue] = useState(60);
  
  const [winNumbers,setWinNumbers] = useState([12,1,3,2])

  var styledTicketTime = toHHMMSS(ticketTime)
  var styledDrawTime = toHHMMSS(drawTime);
 
  //date update
  useEffect(()=>{
    async function getDates(){
      
      console.log("parseTime",parseTime);
      var _parseTime = await LotteryContract.nextPharse();
      var _roundTime = await LotteryContract.nextDraw();
      setParseTime(ethers.utils.formatUnits(_parseTime,0));
      setRoundTime(ethers.utils.formatUnits(_roundTime,0));
      console.log("parseTime1",ethers.utils.formatUnits(_parseTime,0));
    }
    getDates();
  },[])

  useEffect(()=>{
    if(timeValue!=null){
      clearInterval(timeValue)
    }
    var _timeValue =setInterval(dateUpdate, 3000);
    setTimeValue(_timeValue);
  },[parseTime,roundTime])

  const dateUpdate = ()=> {
    let now = Date.now()/1000;
    console.log(parseTime-now)
    if(parseTime<now){
      setTicketTime(0);
      setDrawTime(0);
      setSliderValue(100);
    }
    else {
      setTicketTime(parseTime-now);
      setDrawTime(roundTime-now);
      setSliderValue((duration -(roundTime-now))*100/duration);
    }

  }

  //winnumbers 
  useEffect(()=>{
    
    async function getData(){
      var _issueId = await LotteryContract.issueIndex();
      setIssueId(_issueId);
      console.log(_issueId);
      if(_issueId=="0"){
        setWinNumbers ( [0,0,0,0] );
      }
      else {
        //get winNumbers
        var _winnumbers = await LotteryContract.getHistoryNumbers((_issueId-1).toString());
          
        setWinNumbers(_winnumbers);
      }
    }
    getData();
  },[])


  return (
    <div>
   

      <div style={{backgroundImage:'url(/image/n1.png)', backgroundSize:'cover'}}>
        <Header />
        <Grid container  >
              <Grid item xs = {2} sm = {2} md = {2}></Grid>
              <Grid item xs = {8} sm = {8} md = {8}>
                <Grid container spacing = {1}>
                  <Grid item xs = {12} sm = {12} md = {12} className = "section1">
                    <div className="small_head">New Crypto Game</div>
                    <div className = "lottery_Name1">Atari Lottery</div>
                    <TicketButton >BUY TICKET1</TicketButton>
                  </Grid>
                
                </Grid>
              </Grid>
              <Grid item xs = {2} sm = {2} md = {2}></Grid>
          </Grid> 
        </div>
          {/* section2 */}
      <div style={{backgroundImage:'url(/image/n2.png)', backgroundSize:'cover'}}>
          <Grid container  className = "section2" alignItems="center" justify="center" >
              <Grid item xs = {12} sm = {12} md = {2} lg={2}></Grid>
              <Grid item xs = {12} sm = {12} md = {4} lg={4} className="first">
                <Grid container 
                  alignItems="center"
                  justify="center">
                    <Grid item xs = {12} sm = {12} md = {9} className = "texts" style={{display:'block'}}>
                        <div style={{color:"#d13737", fontSize:14, textTransform:'uppercase' }}>Buy tickets with ATARI</div>
                        <div style={{color:"white", fontSize:22,marginTop:10}}>Win if 2, 3, or 4 of your ticket numbers match!</div>
                    </Grid>
                </Grid>
              </Grid>
              
              <Grid item xs = {12} sm = {12} md = {4} lg={4}>
                <div>
                  <span className = "ticketTime">{styledTicketTime} </span>
                  <span className = "x-font3-white"> Until ticket sale </span>
                  </div>
                <Slider
                  defaultValue={100}
                  value = {sliderValue}
                  valueLabelDisplay="off"
                  disabled={true}
                />
                <div>
                  <span className = "x-font3-white">
                    {styledDrawTime} Until Lottery draw
                  </span>
                </div>
              </Grid>
              <Grid item xs = {12} sm = {12} md = {2} lg={2}></Grid>
            
            </Grid>
      {/*section3 */}
      <Card>
        <RoundPotCard />
      </Card>
      {/* section4 */}
      <Card>
        <WorkFlowCard />
      </Card>
      {/* section5 */}
      <Card>
        <UnLockWalletCard />
      </Card>
      
      {/* section6 */}
      <div className="section6_div" style={{backgroundImage:'url('+section6Image+')'}}>
        <Card>
          <div className = "x-font2-red title" >Latest Winning Numbers</div>
          <LatestWinNumbercard numbers = {winNumbers}/>
        </Card>
      </div>

      <Footer />
    </div>
    </div>
  )
}
