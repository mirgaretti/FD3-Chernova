import React, { useState, useRef, memo } from "react";
import events from "../events";
import './ClientRow.css';

const ClientRow = (props) => {
    const [isEdit, setIsEdit] = useState(false);
    const fam = useRef(null);
    const im = useRef(null);
    const otch = useRef(null);
    const balance = useRef(null);

    const handleSave = () => {
        const { client } = props;

        const updatedClient = {
            ...client,
            fam: fam.current?.value,
            im: im.current?.value,
            otch: otch.current?.value,
            balance: Number(balance.current?.value), 
        };

        setIsEdit(false);
        events.emit('updateClient', updatedClient);
    }

    console.log(props.client.id, 'render');
    return (
        <tr>
            <td>{isEdit ? <input ref={fam} type="text" defaultValue={props.client.fam} /> : props.client.fam}</td>
            <td>{isEdit ? <input ref={im} type="text" defaultValue={props.client.im} /> : props.client.im}</td>
            <td>{isEdit ? <input ref={otch} type="text" defaultValue={props.client.otch} /> : props.client.otch}</td>
            <td>{isEdit ? <input ref={balance} type="text" defaultValue={props.client.balance} /> : props.client.balance}</td>
            <td className={props.client.balance > 0 ? "active" : "blocked"}>{props.client.balance > 0 ? "active" : "blocked"}</td>
            <td>{isEdit ?
                <button onClick={handleSave}>Сохранить</button>
                : <button onClick={() => setIsEdit(true)}>Редактировать</button>
            }</td>
            <td><button onClick={() => events.emit('deleteClient', props.client.id)}>Удалить</button></td>
        </tr>
    );
}

export default memo(ClientRow);