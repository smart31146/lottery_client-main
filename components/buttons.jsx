
import styled from 'styled-components'
import { Button  } from 'react-bootstrap';
import {useRouter} from 'next/router';
import Modal from 'react-modal';
import React, {useState,useEffect} from 'react';
import ReactDOM from "react-dom";
import TextField from '@material-ui/core/TextField';
import PinInput from "react-pin-input";
import {Grid} from '@material-ui/core';
import {LotteryContract,TicketContract,CoinContract,CoinDecimals} from "../contract"
import { useWallet, UseWalletProvider } from 'use-wallet'

import {ethers} from "ethers";

const Lockbutton = styled(Button)`
    background-color: transparent;
    border:2px solid rgb(253,153,45);
    color:rgb(253,153,45);
    font-size: 14px;
    border-radius: 20px;
    padding:10px;
    width:150px;
    float: right;
    transition: 0.5s;
    :hover {
        cursor: pointer;
        background-color:rgb(253,153,45) ;
        color:white;
    }
`
const TicketStyledButton = styled(Button)`
    background-color: black;
    border:none;
    color:white;
    font-size: 14px;
    font-weight: bold;
    border-radius: 30px;
    padding:10px;
    width:150px;
    height:40px;
    transition: 0.2s;
    :hover {
        cursor: pointer;
        background-color:black ;
        color:white;
    }
`
const TicketStyledButton1 = styled(Button)`
    background-color: #d13737;
    border:none;
    color:white;
    font-size: 14px;
    font-weight: bold;
    border-radius: 30px;
    padding:10px;
    width:150px;
    height:40px;
    transition: 0.2s;
    margin-bottom:200px;
    margin-top:20px;
    :hover {
        cursor: pointer;
        background-color:black ;
        color:white;
    }
`
const TicketStyledButton3 = styled(Button)`
    background-color: #d13737;
    border:none;
    color:white;
    font-size: 14px;
    font-weight: bold;
    border-radius: 30px;
    padding:10px;
    width:150px;
    height:40px;
    transition: 0.2s;
    margin-top:20px;
    :hover {
        cursor: pointer;
        background-color:black ;
        color:white;
    }
`

const TicketButton = ({children})=>{
    const wallet = useWallet();
    const [isOpen, setIsOpen] = React.useState(false);
    const [number1,setNumber1] = useState("1");
    const [number2,setNumber2] = useState("1");
    const [number3,setNumber3] = useState("1");
    const [number4,setNumber4] = useState("1");
    const [ticketAmount ,setTicketAmount] = useState("1");
    const [price, setPrice] = useState("1");

    useEffect(() => {
        async function getPrice(){
            var _price=await LotteryContract.minPrice();
            setPrice(ethers.utils.formatUnits(_price,CoinDecimals));
            console.log(_price);
        }
        getPrice();
        console.log(price);
    },[number4]);

    function openModal() {
        setIsOpen(true);
      } 
    function closeModal() {
        setIsOpen(false);
    }

    const handleAmount = (e)=>{
        setTicketAmount(e.target.value);
    }

    const handleNumber= async (e,v)=>{
        console.log(Number(e.target.value));
        if(e.target.value<=20&&e.target.value>=0&&Number.isInteger(Number(e.target.value)) )
        if(v=="1"){
            setNumber1(Number(e.target.value))
        }
        else if(v=="2"){
            setNumber2(Number(e.target.value))
        }
        else if(v=="3"){
            setNumber3(Number(e.target.value))
        }
        else {
            setNumber4(Number(e.target.value))
        }
    }

    const handleBuy= async ()=> {
        if(ticketAmount>0&&wallet.status === 'connected')
        {
            const provider = new ethers.providers.Web3Provider(wallet.ethereum);
            var signer = provider.getSigner();
            var Lottery = LotteryContract.connect(signer);
            //get price apprive
            var ticketPrice = (price * ticketAmount).toFixed(16);
            console.log(typeof(price),ticketPrice);
            var coin = CoinContract.connect(signer);

            if(await coin.allowance(await signer.getAddress(),Lottery.address)<ethers.utils.parseUnits(ticketPrice.toString(),CoinDecimals))
            {
                var tx=await coin.approve(Lottery.address,ethers.utils.parseUnits(ticketPrice.toString(),CoinDecimals))
                .catch((err)=>{
                    console.log(err)
                });
                if(tx==null) return;
                await tx.wait();
                
                console.log(tx.hash);
            }
            //buy tickets
            if(ticketAmount==1){
                var ticketNumbers=[number1,number2,number3,number4];
                var tx =await Lottery.buy(ethers.utils.parseUnits(price.toString(),CoinDecimals),ticketNumbers)
                .catch((err)=>{
                    console.log(err)
                });
                if(tx!=null)
                    await tx.wait()
            }
            else {
                var ticketNumbers=[];
                for(var i=0;i<ticketAmount;i++){
                    ticketNumbers.push([number1,number2,number3,number4])
                }
                var tx =await Lottery.multiBuy(ethers.utils.parseUnits(price.toString(),CoinDecimals),ticketNumbers)
                .catch((err)=>{
                    console.log(err)
                });
                
                if(tx!=null)
                    await tx.wait()
            }
            console.log(ticketNumbers)
            
        }
    }
    
    const router = useRouter();
    return (
        <div>
            {children==="BUY TICKET1" ? (
                 <TicketStyledButton1 className = "ticketStyledButton1" onClick={openModal}>
                    BUY TICKET
                 </TicketStyledButton1>
            ):
            (
                <TicketStyledButton className = "ticketStyledButton" onClick={openModal}>
                    BUY TICKET
                </TicketStyledButton> 
            )
            }
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className = "modal-card1">
                    <TextField variant="outlined" label="ticket amount" className = "round-input" value={ticketAmount} onChange={handleAmount}/>
                    <div className = "lucky-title x-font3-yellow">Select Lucky numbers(1-20)</div>
                    <Grid container className = "ticket-number">
                        <Grid item xs = {3} sm = {3} md={3}>
                            <TextField variant="outlined" value={number1} onChange={(e)=>{handleNumber(e,"1")}}></TextField>
                        </Grid>
                        <Grid item xs = {3} sm = {3} md={3}>
                            <TextField variant="outlined" value={number2} onChange={(e)=>{handleNumber(e,"2")}}></TextField>
                        </Grid>
                        <Grid item xs = {3} sm = {3} md={3}>
                            <TextField variant="outlined" value={number3} onChange={(e)=>{handleNumber(e,"3")}}></TextField>
                        </Grid>
                        <Grid item xs = {3} sm = {3} md={3}>
                            <TextField variant="outlined" value={number4} onChange={(e)=>{handleNumber(e,"4")}}></TextField>
                        </Grid>
                    </Grid>
                    <TicketStyledButton3 className = "ticketStyledButton" onClick={handleBuy} >
                        Buy Ticket
                    </TicketStyledButton3>
                </div>
            </Modal>
        </div>
        )
}
export {Lockbutton,TicketButton};