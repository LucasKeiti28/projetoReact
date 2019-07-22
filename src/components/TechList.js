import React, { Component } from "react";
import TechItem from "./TechItem";

// Utilizando Classes, se baseando em Component
class TechList extends Component {
  state = {
    newTech: "",
    techs: []
  };

  // Executando assim que o componente aparece na tela.
  componentDidMount() {
    const techs = localStorage.getItem("tecnologias");
    if (techs) {
      this.setState({ techs: JSON.parse(techs) });
    }
  }

  // Executando sempre que houver alteracao na props ou estado.
  componentDidUpdate(_, prevState) {
    if (prevState.techs !== this.state.techs) {
      localStorage.setItem("tecnologias", JSON.stringify(this.state.techs));
    }
  }

  // Executando quando o componente deixar de existir.
  componentWillUnmount() {}

  // Metodo para a criacao de um novo input.
  handleInputChange = event => {
    this.setState({ newTech: event.target.value });
  };

  // Medoto para incluir o novo input criado.
  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      techs: [...this.state.techs, this.state.newTech],
      newTech: ""
    });
  };

  handleDelete = tech => {
    this.setState({ techs: this.state.techs.filter(t => t !== tech) });
  };

  // Metodo render (sempre utilizado), para renderizar as infos para o usuario.
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ul>
          {this.state.techs.map(tech => (
            <TechItem
              key={tech}
              tech={tech}
              onDelete={() => this.handleDelete(tech)}
            />
          ))}
        </ul>
        <input
          type="text"
          onChange={this.handleInputChange}
          value={this.state.newTech}
        />
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default TechList;
