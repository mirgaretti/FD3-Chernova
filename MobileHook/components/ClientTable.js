import React, { useEffect, useState } from "react";
import ClientRow from "./ClientRow";
import events from "../events";

const ClientTable = (props) => {
    const [clients, setClients] = useState(props.clients);
    const [filter, setFilter] = useState(null);

    const addClient = () => {
        const client = {
            id: Date.now(),
            surname: '',
            name: '',
            father: '',
            balance: 0,
        };
        setClients([...clients, client]);
    }

    useEffect(() => {
        events.on('updateClient', (client) => {
            setClients(clients.map((updatedClient) => updatedClient.id === client.id ? client : updatedClient));
        });
        events.on('deleteClient', (id) => {
            setClients((clients) => clients.filter((client) => client.id !== id));
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
                    {clients.filter((client) => !filter || filter === (client.balance > 0 ? 'active' : 'blocked')).map((client) => <ClientRow key={client.id} client={client} />)}
                </tbody>
            </table>
            <button onClick={addClient}>Добавить клиента</button>
        </div>
    );
}

export default ClientTable;