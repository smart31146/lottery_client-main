
import Header from '../components/Header'
import Footer from '../components/Footer'
import {Radio, Grid, Slider} from '@material-ui/core';
import {TicketButton} from '../components/buttons'
import {useState,useEffect} from "react"
import {Card} from "../components/card"
import {UnLockWalletCard} from "../components/unlockWallet"
import {LatestWinNumbercard} from "../components/latestWinNumber"
import {RoundInfoCard} from "../components/roundInfoCard"
import {useRouter} from 'next/router';
import {HistoryInfoCard} from '../components/historyInfoCard';
import TextField from '@material-ui/core/TextField';
import {LotteryContract,TicketContract,CoinContract,CoinDecimals,MultiContract} from "../contract"

import {ethers} from "ethers";

export default function BuyTicket() {

  const router = useRouter();
  const [winAmount, setWinAmount] = useState(10000);
  const [winNumbers, setWinNumbers] = useState([12,1,3,2])
  const [round, setRound] = useState(0);
  const [issueId, setIssueId] = useState("0");
  const [winAmounts,setWinAmounts] = useState([12,1,3,2])
  const [styledRoundsData ,setStyledRoundsData] = useState([[]]);
  const [searchText, setSearchText] = useState("");

  //date update
  useEffect(()=>{
    async function getData(){
      var _issueId = await LotteryContract.issueIndex();
      setIssueId(_issueId);
      // console.log(_issueId);
      if(_issueId.toString()=="0"){
        setWinNumbers ( [0,0,0,0] );
        setWinAmounts ( [0,0,0,0] );
      }
      else {
        setRound(_issueId.toString()-1)
        var roundIDs=[]
        for(var i=0;i<_issueId;i++)
          roundIDs.push(i);
        //get round infos
        var _RoundDatas = await MultiContract.historyDatas(roundIDs);
        
        var _styledRoundsData = [];
        if(roundIDs.length>0&&typeof(_RoundDatas[0])!="undefined")
        {
          roundIDs.map((data,index) => {
            console.log("ssss",_RoundDatas[1][index]);
            _styledRoundsData.push([index,_RoundDatas[0][index],_RoundDatas[1][index]])
          })
          setStyledRoundsData(_styledRoundsData);
        
          setWinNumbers(_RoundDatas[0]);
          setWinAmounts(_RoundDatas[1]);
        } 
      }
    }
    getData();
  },[])

  const handleSearch = (e)=>{
    setSearchText(e.target.value);
  };

  const handleSearchClick = ()=>{
    if(searchText<issueId){
      setRound(searchText);
    }
  }

  return (
    <div style={{backgroundImage:'url(/image/n1.png)', backgroundSize:'cover'}}>
      <Header />

      <Card>
        <div className = "win-info-card">
            <div className = "x-font2-yellow">
                SELECT ANY 4 LUCKY NUMBERS
            </div>
            <div className = "x-font3-white ">
                You can select numbers from 1 to 20
            </div>
        </div>
      </Card>
      <Card>
        <UnLockWalletCard />
      </Card>
      <Card>
        <div className = "x-font2-red text-center space-3">
            Round #{round}
        </div>
        <Card>
          <TextField variant="outlined" label="Select Round Id " className = "round-input" onChange = {handleSearch}/>
          <button className = "search-button" onClick = {handleSearchClick}>Search</button>
        </Card>
        <RoundInfoCard round = {round} />
      </Card>
      <Card>
        <HistoryInfoCard data = {styledRoundsData} />
      </Card>
      <div className = "space">
      </div>
      <Footer />
    </div>
  )
}
