import React from "react";
import ClientRow from "./ClientRow";
import events from "../events";

class ClientTable extends React.PureComponent {
    state = {
        clients: this.props.clients,
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
                    {this.state.clients.map((client) => <ClientRow key={client.id} client={client} />)}
                </tbody>
            </table>
        );
    }
}

export default ClientTable;