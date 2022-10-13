import React, {useState, useEffect} from 'react';
import { Button  } from 'react-bootstrap';
import { useWallet, UseWalletProvider } from 'use-wallet'
import {Grid} from '@material-ui/core';
import { ListView, ListViewHeader } from "@progress/kendo-react-listview";
import { Pager } from "@progress/kendo-react-data-tools";
import '@progress/kendo-theme-default/dist/all.css';
import { Calendar } from '@progress/kendo-react-dateinputs'
import {LotteryContract,TicketContract,CoinContract,CoinDecimals,MultiContract} from "../../contract"
import {ethers} from "ethers";

const CardHeader = () => {
  return (
    <ListViewHeader
      className="pl-4 pb-2 pt-2"
      >
      <Grid container className="text-center">
        <Grid item xs={6} sm={6}  md={4} className = "x-font3-red">
          Draw Number
        </Grid>
        <Grid item xs={6} sm={6}  md={4} className = "x-font3-yellow">
          Lucky Numbers
        </Grid>
        <Grid item xs={6} sm={6}  md={4} className = "x-font3-yellow">
          Jackpot Amount
        </Grid>
      </Grid>
      <div className = "space-line"></div>
    </ListViewHeader>
  );
};

const CardItem = (props)=>{
  let item = props.dataItem;
  return (
    <Grid container className = "text-center">
        <Grid item xs={6} sm={6}  md={4}  className = "x-font4-white">
          {item[0]}
        </Grid>
        <Grid item xs={6} sm={6}  md={4}  className = "x-font4-white">
        {typeof(item[1])!="undefined"?
          `${item[1][0]},${item[1][1]},${item[1][2]},${item[1][3]}`
          :"0,0,0,0"}
        </Grid>
        <Grid item xs={6} sm={6}  md={4}  className = "x-font4-yellow">
          {ethers.utils.formatUnits(typeof(item[2])!="undefined"?(item[2][0]):"0",CoinDecimals)} Gloto
        </Grid>
    </Grid>
  )
}

const HistoryInfoCard =(props)=>{
  const {data} = props;
  console.log("HistoryInfoCarddata",data)

  const [page, setPage] = React.useState({
    skip: 0,
    take: 5,
  });
  const { skip, take } = page;

  const handlePageChange = (e) => {
    setPage({
      skip: e.skip,
      take: e.take,
    });
  };

    return (
      <div className="RoundInfoCard">
        <ListView
          data={data.slice(skip, skip + take)}
          item={CardItem}
          style={{
            width: "100%",
          }}
          header={CardHeader}
        />
        <Pager
          skip={skip}
          take={take}
          onPageChange={handlePageChange}
          total={data.length}
        />
      </div>
    )
}

export {HistoryInfoCard};