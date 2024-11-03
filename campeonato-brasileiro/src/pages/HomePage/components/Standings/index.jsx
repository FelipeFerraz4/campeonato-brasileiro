import { Container, Table } from 'react-bootstrap';
import { teams } from '../../../../mocks/mockData';
import './style.css';

const calculatePoints = (vitorias, empates) => {
  return vitorias * 3 + empates;
};

const Standings = () => {
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
        </tbody>
      </Table>
    </Container>
  );
};

export default Standings;
