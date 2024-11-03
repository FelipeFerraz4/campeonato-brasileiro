import { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
// import { teams } from '../../../../mocks/mockData'; // Comentado para usar dados da API
import { getAllTeams } from '../../../../services/footballService.js'; // Importe a função para buscar times da API
import './style.css';

const calculatePoints = (vitorias, empates) => {
  return vitorias * 3 + empates;
};

const Standings = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await getAllTeams();
        setTeams(data);
      } catch (error) {
        console.error("Erro ao buscar times:", error);
      }
    };

    fetchTeams();
  }, []);

  return (
    <Container>
      <h2 className="text-center mb-3">Classificação</h2>
      <Table striped bordered hover className="standings-table">
        <thead>
          <tr>
            <th>Posição</th>
            <th>Time</th>
            <th>Pontos</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr key={team.id}>
              <td>{index + 1}</td>
              <td>{team.nome}</td>
              <td>{calculatePoints(team.vitorias, team.empates)}</td>
            </tr>
          ))}
          {/* Dados mockados para referência
          {teams.map((team, index) => (
            <tr key={team.id}>
              <td>{index + 1}</td>
              <td>{team.nome}</td>
              <td>{calculatePoints(team.vitorias, team.empates)}</td>
            </tr>
          ))}
          */}
        </tbody>
      </Table>
    </Container>
  );
};

export default Standings;
