import React, { useState } from "react";
import {Result,Button,Modal} from 'antd'

const ResultMesseage =({messege})=>{

    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = (target) => {
        setIsModalOpen(target)
    }
    <Modal
        open={isModalOpen}
        onOk={() => toggleModal(false)}
        onCancel={() => toggleModal(false)}
        width={800}
    >
        <Result
            status= {messege.status}
            title=  {messege.title}
            subTitle={messege.subTitle}
            extra={[
                <Button type="primary" key="console">
                    Go Console
                </Button>,
                <Button key="buy">Buy Again</Button>,
            ]}
        />
  </Modal>
}
export default ResultMesseage;