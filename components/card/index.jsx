import {Grid } from '@material-ui/core';
const Card = ({children})=>{
    return (
        <Grid container className = "main-card">
            <Grid item xs = {1} sm = {2} md = {2}></Grid>
            <Grid item xs = {10} sm = {8} md = {8}>
                {children}
            </Grid>
            <Grid item xs = {1} sm = {2} md = {2}></Grid>
        </Grid> 
        )  
}

export {Card};