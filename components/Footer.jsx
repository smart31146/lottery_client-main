import React, {useState, useEffect} from 'react';
import Head from 'next/head'
import styled from 'styled-components'
import Image from 'next/image'
import logo from '../public/image/atari-logo.png'
import { Button  } from 'react-bootstrap';
import { useWallet, UseWalletProvider } from 'use-wallet'
import {useRouter} from 'next/router';

const NabBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const LogoImage = styled(Image)`
    float: left;
    width:50px!important;  
    height:50px!important;
    min-width:10%!important;
    min-height:10%!important;
    margin-left:8%;    
`

const FooterLink = styled.div`
    display: inline-block;
    color:white;
    font-size: 14px;
    border-radius: 20px;
    padding:10px;
    width:150px;
    float: right;
    
    :hover {
        cursor: pointer;
        color:white;
      }
`

const Footer = (props) => { 
    const router = useRouter(); 
    return(
        <NabBar className = "footer">
            <span className = "logo"  onClick={(e)=>{router.push("/")}}>
                <LogoImage src={logo} id="logo_image" alt = "logo"></LogoImage>
            </span>
            <FooterLink  onClick={(e)=>{router.push("/")}}>
                ATARI.COM
            </FooterLink>
        </NabBar>
    )
}

export default Footer;