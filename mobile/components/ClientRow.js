import React from "react";
import events from "../events";
import './ClientRow.css';
const { surname, name, father, balance } = this.refs
class ClientRow extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.surname = React.createRef();
        this.name = React.createRef();
        this.father = React.createRef();
        this.balance = React.createRef();
    }
    state = {
        isEdit: false,
    };



    handleSave() {
        const client = { ...this.props.client };
        client.surname = this.surname && this.surname.current && this.surname.current.value;
        client.name = this.name && this.name.current && this.name.current.value;
        client.father = this.father && this.father.current && this.father.current.value;
        client.balance = this.balance && this.balance.current && this.balance.current.value;
        this.setState({ isEdit: false });
        events.emit('updateClient', client);
    }
    render() {
        console.log(this.props.client.id, 'render');
        return (
            <tr>
                <td>{this.state.isEdit ? <input ref={this.surname} type="text" defaultValue={this.props.client.surname} /> : this.props.client.surname}</td>
                <td>{this.state.isEdit ? <input ref={this.name} type="text" defaultValue={this.props.client.name} /> : this.props.client.name}</td>
                <td>{this.state.isEdit ? <input ref={this.father} type="text" defaultValue={this.props.client.father} /> : this.props.client.father}</td>
                <td>{this.state.isEdit ? <input ref={this.balance} type="text" defaultValue={this.props.client.balance} /> : this.props.client.balance}</td>
                <td className={this.props.client.balance > 0 ? "active" : "blocked"}>{this.props.client.balance > 0 ? "active" : "blocked"}</td>
                <td>{this.state.isEdit ?
                    <button onClick={this.handleSave}>Сохранить</button>
                    : <button onClick={() => this.setState({ isEdit: true })}>Редактировать</button>
                }</td>
                <td><button onClick={() => events.emit('deleteClient', this.props.client.id)}>Удалить</button></td>
            </tr>
        );
    }
}

export default ClientRow;