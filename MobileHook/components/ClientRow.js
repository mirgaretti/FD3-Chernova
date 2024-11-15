import React, { useState, useRef, memo } from "react";
import events from "../events";
import './ClientRow.css';

const ClientRow = (props) => {
    const [isEdit, setIsEdit] = useState(false);
    const surname = useRef(null);
    const name = useRef(null);
    const father = useRef(null);
    const balance = useRef(null);

    const handleSave = () => {
        const { client } = props;
        client.surname = surname && surname.current && surname.current.value;
        client.name = name && name.current && name.current.value;
        client.father = father && father.current && father.current.value;
        client.balance = balance && balance.current && balance.current.value;
        setIsEdit(false);
        events.emit('updateClient', client);
    }
    console.log(props.client.id, 'render');
    return (
        <tr>
            <td>{isEdit ? <input ref={surname} type="text" defaultValue={props.client.surname} /> : props.client.surname}</td>
            <td>{isEdit ? <input ref={name} type="text" defaultValue={props.client.name} /> : props.client.name}</td>
            <td>{isEdit ? <input ref={father} type="text" defaultValue={props.client.father} /> : props.client.father}</td>
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