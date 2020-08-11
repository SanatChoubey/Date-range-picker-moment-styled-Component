import React, { useEffect, useState } from 'react';
import moment, { months } from 'moment';
import styled from 'styled-components';
const week = ['M','T','W','T','F','S','S'];
const GridArea =  styled.div`
  width: 63 0px;
  height: 400px;
  background-color: #090916;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Divider = styled.div`
  width:300px;
  height: 400px;
  
`
const HeaderYear = styled.div`
  width: 300px;
  height: 50px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;

`
const WeekHeader =  styled.div`
  width: 100%;
  height: 50px;
  /* background-color:blue; */
  color: gray;
  display: flex;
  flex-direction: row;
`
const WeekChip = styled.div`
  width: 42px;
  height: 40px;
  /* background-color:pink; */
  display: flex;
  justify-content: center;
  align-items: center;
`
const DaysChip = styled.div`
  width: 42px;
  height: 40px;
  background-color:${({color})=>color?color:'#090916'};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top:5px;
`
// '#090916'
const DaysDivider = styled.div`
  width: 100%;
  height:  70%;
  /* background-color:orange; */
  color: white;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* justify-content: flex-start;
  align-items:stretch; */
  
  align-content:flex-start;
  
  /* justify-content:space-evenly; */
  /* margin-top:0px; */
`
function App() {
  const [monthDays, setMonthDays] = useState([])
  const [monthDaysleft, setMonthDaysleft] = useState([])
  const [monthDaysRight, setMonthDaysRight] = useState([])
  const [month,setMonth] = useState(0);
  const [startFrom, setStartFrom]  = useState(undefined);
  const [endTo, sentEndTo ] = useState(undefined)
  // const [indices, setIndices] = useState(null)
  const [leftMonth, setLeftMonth] = useState({
    day:moment(),
    show: moment().format('MMMM YYYY')
  })
  const [rightMonth, setRightMonth] = useState({
    day:moment().add(1,'M'),
    show: moment().add(1,'M').format('MMMM YYYY')
  })
  useEffect(()=>{
    // monthCountleft()
    incrementmonthDays()
  },[])
  useEffect(()=>{
    
    monthCountleft()
    monthCountRight()
  },[leftMonth])

  const monthCountleft= ()=>{
    
    const count =  leftMonth.day.daysInMonth();
    
    for(let i  = 0; i<=count; i++){
      console.log(i)
      monthDaysleft.push(i)
    }
    monthDaysleft.shift()
    const addNull = leftMonth.day.startOf("month").weekday()
    let firstDay = leftMonth.day.startOf('M')
    const devdata = [...monthDaysleft]
    const arrr = devdata.map((d,i)=> ( moment(moment(firstDay).add(i,'d')).unix()))
    // console.log('yoyu',arrr)
    if(addNull===0){
      for(let i = 0 ; i<6; i++){
        arrr.unshift(null)
      }
    }else{
      for(let i = 0 ; i<addNull-1; i++){
        arrr.unshift(null)
      }
    }
    
    // setMonthDaysleft([...monthDaysleft])
    setMonthDaysleft([...arrr])
  }
  const monthCountRight = ()=>{
    const count =  rightMonth.day.daysInMonth();
    // console.log('Rihh####################', count)
    for(let i  = 0; i<=count; i++){
      console.log(i)
      monthDaysRight.push(i)
    }
    monthDaysRight.shift()
    const addNull = rightMonth.day.startOf("month").weekday()
    // console.log('Rihh####################', count, addNull, monthDaysRight)
    let firstDay = rightMonth.day.startOf('M')
    const devdata = [...monthDaysRight]
    const arrr = devdata.map((d,i)=> ( moment(moment(firstDay).add(i,'d')).unix()))
    // console.log('yoyuleft',arrr)
    if(addNull===0){
      for(let i = 0 ; i<6; i++){
        arrr.unshift(null)
      }
    }else{
      for(let i = 0 ; i<addNull-1; i++){
        arrr.unshift(null)
      }
    }
    
    setMonthDaysRight([...arrr])
  }
  const incrementmonthDays = ()=>{
    const count =  moment().daysInMonth()
    setMonth(moment().format("MMMM YYYY"))

    for(let i  = 0; i<=count; i++){
      console.log(i)
      monthDays.push(i)
    }
    monthDays.shift()
    const addNull = moment().startOf("month").weekday()
    for(let i = 0 ; i<addNull; i++){
      monthDays.unshift(null)
    }
    setMonthDays([...monthDays])
  }
  // console.log('rerenders')

  return (
    <div style={{width:'100%',height:'1000px', backgroundColor:'red'}}>
      <input type='text'/>
      <input type='text'/>
      <input type="date" value="2017-06-01"/>
      <button onClick={()=>{
        setStartFrom(undefined)
        sentEndTo(undefined)
      }}>
        Reset
      </button>
       <div  style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
      <div  style={{width:'36px',height:'36px',border: 'solid 1.5px #34374a', display:'flex', justifyContent:'center', alignItems:'center',marginRight:'10px'}}onClick={()=>{
        setMonthDaysleft([])
        setMonthDaysRight([])
        const data = {
          day: leftMonth.day.subtract(1,'M'),
          show: leftMonth.day.format('MMMM YYYY')
        }
        const dataR = {
          day: rightMonth.day.subtract(1,'M'),
          show: rightMonth.day.format('MMMM YYYY')
        }
        setLeftMonth(data)
        setRightMonth(dataR)
      }}>
        <img src={require('./images/left-arrow.svg')}/>
      </div>
      <GridArea>
        <Divider>
          <HeaderYear>
            {
              leftMonth.show
            }
          </HeaderYear>
          <WeekHeader>
              {
                week.map(data=><WeekChip>{data}</WeekChip>)
              }
          </WeekHeader>
              <DaysDivider>
                {
                  monthDaysleft.map((data,i)=>{
                    if(data){
                      console.log('%%%%%%%', startFrom,)
                      if(data == startFrom||(data >= startFrom&&data <=endTo)){
                        return<DaysChip color="#00dbff">
                          {data? moment.unix(data).date():null}
                        </DaysChip>
                      }
                    }
                  
                  return<DaysChip  onClick={()=>{
                  
                   if(!startFrom){
                     console.log('set ho gya ', data.day)
                    setStartFrom(data)
                    console.log('set ho gya ',startFrom )
                   }else{

                      sentEndTo(data)
                      console.log('set ho gya ',endTo )
                   }
                    
                  }}>
                    {data? moment.unix(data).date():null}
                </DaysChip>})
                }
              </DaysDivider>
        </Divider>
        <Divider>
          {/* rigth side */}
          <HeaderYear>
            {
              rightMonth.show
            }
          </HeaderYear>
          <WeekHeader>
              {
                week.map(data=><WeekChip>{data}</WeekChip>)
              }
          </WeekHeader>
              <DaysDivider>
                {
                  monthDaysRight.map((data,i)=>{
                    if(data){
                      if(data == startFrom||(data >= startFrom && data <= endTo)){
                        return<DaysChip color="#00dbff">
                          {data? moment.unix(data).date():null}
                        </DaysChip>
                      }
                    }
                  
                  return<DaysChip  onClick={()=>{
                  
                  // console.log('item', data, rightMonth.day.month(), rightMonth.day.year())
                    if(startFrom){
                      sentEndTo(data)
                    }else{
                      setStartFrom(data)
                    }
                  }}>
                    {data? moment.unix(data).date():null}
                </DaysChip>})
                }
              </DaysDivider>
        </Divider>
      </GridArea>
      <div style={{width:'36px',height:'36px',border: 'solid 1.5px #34374a', display:'flex', justifyContent:'center', alignItems:'center',marginLeft:'10px'}} onClick={()=>{
        console.log(leftMonth)
        
        setMonthDaysleft([])
        setMonthDaysRight([])
        const data = {
          day: leftMonth.day.add(1,'M'),
          show: leftMonth.day.format('MMMM YYYY')
        }
        const dataR = {
          day: rightMonth.day.add(1,'M'),
          show: rightMonth.day.format('MMMM YYYY')
        }
        setLeftMonth(data)
        setRightMonth(dataR)
      }}>
        <img src={require('./images/right-arrow.svg')}/>
      </div>
    </div>
    </div>
   
  );
}

export default App;
