import React, { useEffect, useState } from "react";
import ClientRow from "./ClientRow";
import events from "../events";
import { useDispatch, useSelector } from "react-redux";
import { addClient, updateClient, removeClient } from "../redux/clientSlice";
import { loadClients } from "../redux/loadClients";

const ClientTable = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadClients());
    }, []);
    const storeClients = useSelector( state => state.clients );
    const [filter, setFilter] = useState(null);
    
    const onAddClick = () => {
        const client = {
            id: Date.now(),
            surname: '',
            name: '',
            father: '',
            balance: 0,
        };
        dispatch(addClient(client));
    }

    useEffect(() => {
        events.on('updateClient', (client) => {
            dispatch(updateClient(client));
        });
        events.on('deleteClient', (id) => {
            dispatch(removeClient(id));
        });
    }, []);

    return (
        <div>
            <button onClick={() => setFilter('active')}>Активные</button>
            <button onClick={() => setFilter('blocked')}>Заблокированные</button>
            <button onClick={() => setFilter(null)}>Все</button>
            <table>
                <thead>
                    <tr>
                        <th>Фамилия</th>
                        <th>Имя</th>
                        <th>Отчество</th>
                        <th>Баланс</th>
                        <th>Статус</th>
                        <th>Редактировать</th>
                        <th>Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    {storeClients.filter((client) => !filter || filter === (client.balance > 0 ? 'active' : 'blocked')).map((client) => <ClientRow key={client.id} client={client} />)}
                </tbody>
            </table>
            <button onClick={onAddClick}>Добавить клиента</button>
        </div>
    );
}

export default ClientTable;