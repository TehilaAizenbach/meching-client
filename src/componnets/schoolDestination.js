import React from 'react';
import { Card } from 'antd';
import { Progress } from 'antd';

const SchoolDestination=()=>{
    return<Card>
        <h3>יעד התיכון</h3>
        <Progress status={"normal"} percent={50}></Progress>
        <div><span>9,450</span> מתוך <span>18,900</span></div>
    </Card>
}
export default SchoolDestination;