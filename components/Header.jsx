import React, {useState, useEffect} from 'react';
import Head from 'next/head'
import styled from 'styled-components'
import {Navbar, Nav} from 'react-bootstrap';
import Image from 'next/image'
import logo from '../public/image/atari-logo.png'
import { Button  } from 'react-bootstrap';
import { useWallet, UseWalletProvider } from 'use-wallet'
import {Grid} from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';

import {useRouter} from 'next/router';
import {ethers} from 'ethers';
const Lockbutton = styled(Button)`
    background-color: #d13737;
    border:none;
    color:white;
    font-size: 12px;
    border-radius: 20px;
    padding:10px;
    margin:5px;
    width:120px;
    float: right;
    transition: 0.5s;
    :hover {
        cursor: pointer;
        background-color:rgb(253,153,45) ;
        color:white;
      }
`
const Lockbutton1 = styled(Button)`
    background-color: transparent;
    border:none;
    color:white;
    font-size: 12px;
    border-radius: 20px;
    padding:10px;
    margin:5px;
    width:120px;
    float: right;
    transition: 0.5s;
    :hover {
        cursor: pointer;
        color:#d13737;
      }
`
const LogoImage = styled(Image)`
    float: left;
    width:150px!important;  
    height:30px!important;
    min-width:20%!important;
    min-height:20%!important;
    margin-left:30px;    
`
const NabBar = styled.div`
    padding-left: 8%;
    padding-right:8%;
    background-color: rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: space-between;
`


const Header = (props) => {
    
    const router = useRouter();
    const wallet = useWallet();
    var styledAddress =wallet.account? wallet.account.slice(0,4)+".."+wallet.account.slice(-4):"";

    const handleConnect =async ()=>{
        console.log(wallet.status)
        wallet.connect().then(()=>{
          if(wallet.status=="error"){
            alert("Plase choose right chain-Ethereum mainnet")
          }
        });
        
        localStorage.setItem('connect', wallet.status);
    }
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    function handleChanged(accounts) {
        if (accounts.length === 0) {
          // MetaMask is locked or the user has not connected any accounts
          console.log('Please connect to MetaMask.');
        } 
        window.location.reload();
      }

    useEffect(()=>{
        async function check(){
            
           const provider = new ethers.providers.Web3Provider(window.ethereum);
           const accounts = await provider.listAccounts();
           const chainId = await window.ethereum.request({ method: 'eth_chainId' });
           if(accounts.length!=0){
                wallet.connect();
           }

        }
        check();
    },[])

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
        <NabBar >
        <Grid container className = "Navbar">
            <Grid item xs = {6} sm = {6} md={3}>
                <span className = "logo" >
                    <LogoImage src={logo} id="logo_image" alt = "logo"  onClick={(e)=>{router.push("/")}}></LogoImage>
                    <Button 
                        aria-controls="simple-menu" 
                        aria-haspopup="true" 
                        className = "menu-button" 
                        onClick={handleClick}>
                        <MenuIcon />
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem 
                        onClick= {(e)=>{
                        router.push("/jackpot");
                        }}>
                        My tickets
                      </MenuItem>
                      
                      <MenuItem 
                        onClick= {(e)=>{
                        router.push("/buyticket");
                        }}>
                        History
                      </MenuItem>
                    </Menu>
                </span>
            </Grid>
            
            <Grid item xs = {6} sm = {6} md={6} className = "navitems">
                <Lockbutton1 
                    onClick= {(e)=>{
                    router.push("/buyticket");
                    }}
                >
                    History
                </Lockbutton1>
                <Lockbutton1 
                    onClick= {(e)=>{
                    router.push("/jackpot");
                    }}
                >
                    My tickets
                </Lockbutton1>
            </Grid>
            
            <Grid item xs = {6} sm = {6} md={3}>
            <Lockbutton onClick= {handleConnect}>{wallet.status === 'connected' ?(<span>{styledAddress}</span>):"CONNECT"}</Lockbutton>
            </Grid>
        </Grid>
        </NabBar>
    )
}

export default Header;