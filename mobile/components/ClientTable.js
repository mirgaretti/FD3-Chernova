import React from "react";
import ClientRow from "./ClientRow";
import events from "../events";

class ClientTable extends React.PureComponent {
    state = {
        clients: this.props.clients,
        filter: null,
    }

    addClient() {
        const client = {
            id: Date.now(),
            surname: '',
            name: '',
            father: '',
            balance: 0,
        };
        this.setState({ clients: [...this.state.clients, client] });
    }

    componentDidMount() {
        events.on('updateClient', (client) => {
            this.setState({ clients: this.state.clients.map((updatedClient) => updatedClient.id === client.id ? client : updatedClient) });
        });
        events.on('deleteClient', (id) => {
            this.setState({ clients: this.state.clients.filter((client) => client.id !== id) });
        });
    }
    render() {
        return (
            <div>
                <button onClick={() => this.setState({ filter: 'active' })}>Активные</button>
                <button onClick={() => this.setState({ filter: 'blocked' })}>Заблокированные</button>
                <button onClick={() => this.setState({ filter: null })}>Все</button>
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
                        {this.state.clients.filter((client) => !this.state.filter || this.state.filter === (client.balance > 0 ? 'active' : 'blocked')).map((client) => <ClientRow key={client.id} client={client} />)}
                    </tbody>
                </table>
                <button onClick={() => this.addClient()}>Добавить клиента</button>
            </div>
        );
    }
}

export default ClientTable;